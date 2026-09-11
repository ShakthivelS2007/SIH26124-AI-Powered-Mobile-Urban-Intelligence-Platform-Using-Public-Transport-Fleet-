"""
models.py
---------
Python classes that mirror your database tables.
Each class = one table. Each attribute = one column.
This MUST stay in sync with schema.sql -- if you add a column there,
add it here too (and vice versa).
"""
from sqlalchemy import Column, Integer, String, Float, TIMESTAMP, ARRAY, Text, func
from geoalchemy2 import Geography
from database import Base


class Event(Base):
    """
    Mirrors the `events` table created in schema.sql:
        id            SERIAL PRIMARY KEY
        type          VARCHAR(50)              -- 'pothole', 'congestion', etc.
        location      GEOGRAPHY(POINT, 4326)   -- GPS point
        confidence    FLOAT                    -- AI confidence score
        vehicle_count FLOAT                    -- only for congestion events
        condition     TEXT[]                   -- only for sign events, e.g. damage flags
        image_base64  TEXT                     -- cropped image of the defect, base64-encoded JPEG
        bus_id        VARCHAR(50)
        created_at    TIMESTAMP DEFAULT NOW()
    """
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False)
    # SRID 4326 = standard GPS lat/lon coordinate system (what GPS devices use).
    # geoalchemy2 stores this as a PostGIS GEOGRAPHY(POINT, 4326) column,
    # exactly matching schema.sql.
    location = Column(Geography(geometry_type="POINT", srid=4326), nullable=False)
    confidence = Column(Float, nullable=True)
    vehicle_count = Column(Float, nullable=True)
    condition = Column(ARRAY(String), nullable=True)
    # Text (not String/VARCHAR) since base64-encoded JPEGs comfortably exceed
    # typical VARCHAR length limits -- Postgres TEXT has no length cap.
    image_base64 = Column(Text, nullable=True)
    bus_id = Column(String(50), nullable=True)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)
