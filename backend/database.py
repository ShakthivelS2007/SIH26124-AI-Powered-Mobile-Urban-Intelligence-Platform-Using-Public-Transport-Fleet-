"""
database.py
------------
This file is responsible for ONE thing: connecting to PostgreSQL.

It creates:
  - engine        -> the actual connection pool to Postgres
  - SessionLocal   -> a factory that gives us a new "conversation" (session)
                      with the database each time we need one
  - Base           -> the parent class our table models (models.py) inherit from
  - get_db()       -> a FastAPI dependency that hands a session to each
                      request and always closes it afterwards

You should not need to edit this file often once it works.
"""

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load variables from a local ".env" file (if present) into the environment.
# This keeps passwords out of your source code / GitHub repo.
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set. Copy .env.example to .env and fill in your "
        "real database connection string."
    )

# The engine manages the actual pool of connections to Postgres.
# pool_pre_ping=True makes it check a connection is alive before using it,
# which avoids annoying "connection closed" errors after periods of idleness
# (this matters a lot on free-tier hosts like Render/Railway).
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# SessionLocal is a factory: calling SessionLocal() gives us a new DB session.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# All models in models.py will inherit from this Base class.
Base = declarative_base()


def get_db():
    """
    FastAPI dependency.

    Usage in main.py:

        @app.get("/api/detections")
        def list_detections(db: Session = Depends(get_db)):
            ...

    FastAPI calls this once per request, gives your route function the
    yielded session, and then (thanks to the try/finally) always closes it
    afterwards -- even if your route raises an error.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
