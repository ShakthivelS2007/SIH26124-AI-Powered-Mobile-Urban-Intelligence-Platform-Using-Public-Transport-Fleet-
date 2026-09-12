"""
main.py
-------
The FastAPI app itself: defines the API routes.

Run it locally with:
    uvicorn main:app --reload

Then open http://127.0.0.1:8000/docs for interactive API testing.
"""

from datetime import datetime, timedelta
from typing import Optional, List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func, cast
from geoalchemy2 import Geography
from geoalchemy2.elements import WKTElement
from geoalchemy2.shape import to_shape
from pydantic import BaseModel, Field

from database import get_db, engine, Base
import models

# Automatically creates tables if they do not exist.
# NOTE: this does NOT add new columns to an already-existing table. If your
# `events` table was created before image_base64 existed, you must either
# drop + recreate it (loses existing rows) or run manually:
#     ALTER TABLE events ADD COLUMN image_base64 TEXT;
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SIH26124 Road Issue Detection Backend")

# ---------------------------------------------------------------------------
# CORS Configuration (Fixes 405 Method Not Allowed on OPTIONS preflight)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Pydantic schemas
# ---------------------------------------------------------------------------

class EventIn(BaseModel):
    """What the AI/client must send us when reporting a detection."""
    bus_id: str
    type: str = Field(..., description="e.g. 'pothole', 'congestion', 'sign', 'zebra_crossing'")
    confidence: Optional[float] = Field(None, ge=0, le=1)
    vehicle_count: Optional[float] = None
    condition: Optional[List[str]] = None  # sign damage flags
    image_base64: Optional[str] = None     # cropped defect image, base64-encoded JPEG
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    timestamp: Optional[datetime] = None


class EventOut(BaseModel):
    """What we send back to the frontend/dashboard."""
    id: int
    bus_id: Optional[str]
    type: str
    confidence: Optional[float]
    vehicle_count: Optional[float]
    condition: Optional[List[str]] = None
    image_base64: Optional[str] = None
    latitude: float
    longitude: float
    created_at: datetime

    class Config:
        from_attributes = True


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def event_to_out(db: Session, event: models.Event) -> EventOut:
    """
    Decodes the PostGIS GEOGRAPHY column in-memory using shapely,
    preventing an N+1 database query bottleneck.
    """
    point = to_shape(event.location)
    return EventOut(
        id=event.id,
        bus_id=event.bus_id,
        type=event.type,
        confidence=event.confidence,
        vehicle_count=event.vehicle_count,
        condition=event.condition,
        image_base64=event.image_base64,
        latitude=point.y,
        longitude=point.x,
        created_at=event.created_at,
    )


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/")
def root():
    return {"status": "ok", "message": "SIH26124 backend is running"}


@app.post("/api/detections", response_model=EventOut)
def create_detection(payload: EventIn, db: Session = Depends(get_db)):
    """
    Receives one detection from the AI model (via the bus/edge device)
    and stores it.

    Duplicate handling: if a detection of the SAME type already exists
    within 25 meters in the last 24 hours, returns the existing row.
    """
    point = WKTElement(f"POINT({payload.longitude} {payload.latitude})", srid=4326)

    cutoff = datetime.utcnow() - timedelta(hours=24)

    existing = (
        db.query(models.Event)
        .filter(models.Event.type == payload.type)
        .filter(models.Event.created_at >= cutoff)
        .filter(
            func.ST_DWithin(
                models.Event.location,
                cast(point, Geography),
                25,  # meters
            )
        )
        .order_by(models.Event.created_at.desc())
        .first()
    )

    if existing:
        return event_to_out(db, existing)

    new_event = models.Event(
        bus_id=payload.bus_id,
        type=payload.type,
        confidence=payload.confidence,
        vehicle_count=payload.vehicle_count,
        condition=payload.condition,
        image_base64=payload.image_base64,
        location=point,
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return event_to_out(db, new_event)


@app.get("/api/detections", response_model=List[EventOut])
def list_detections(
    type: Optional[str] = None,
    limit: int = 100,
    after_id: Optional[int] = None,
    db: Session = Depends(get_db),
):
    """
    Returns recent detections, optionally filtered by type (e.g. ?type=pothole).

    Pass after_id=<id> to only get detections with a higher id than the
    given one - i.e. only what's new since the last poll. Without it,
    behaves exactly as before (returns the most recent `limit` rows).
    """
    query = db.query(models.Event)
    if type:
        query = query.filter(models.Event.type == type)
    if after_id is not None:
        query = query.filter(models.Event.id > after_id)
    events = query.order_by(models.Event.created_at.desc()).limit(limit).all()
    return [event_to_out(db, e) for e in events]


@app.get("/api/detections/{event_id}", response_model=EventOut)
def get_detection(event_id: int, db: Session = Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Detection not found")
    return event_to_out(db, event)


@app.delete("/api/detections/{event_id}")
def delete_detection(event_id: int, db: Session = Depends(get_db)):
    event = db.query(models.Event).filter(models.Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Detection not found")
    db.delete(event)
    db.commit()
    return {"status": "success", "message": f"Detection {event_id} deleted"}


@app.get("/api/detections/nearby/search", response_model=List[EventOut])
def nearby_detections(
    latitude: float,
    longitude: float,
    radius_m: float = 1000,
    db: Session = Depends(get_db),
):
    """
    Returns detections within radius_m meters of the given point.
    """
    point = WKTElement(f"POINT({longitude} {latitude})", srid=4326)
    events = (
        db.query(models.Event)
        .filter(func.ST_DWithin(models.Event.location, cast(point, Geography), radius_m))
        .order_by(models.Event.created_at.desc())
        .all()
    )
    return [event_to_out(db, e) for e in events]


@app.get("/api/dashboard/statistics")
def dashboard_statistics(db: Session = Depends(get_db)):
    """Simple counts by type, e.g. for the summary cards on the dashboard."""
    rows = (
        db.query(models.Event.type, func.count(models.Event.id))
        .group_by(models.Event.type)
        .all()
    )
    return {t: count for t, count in rows}
