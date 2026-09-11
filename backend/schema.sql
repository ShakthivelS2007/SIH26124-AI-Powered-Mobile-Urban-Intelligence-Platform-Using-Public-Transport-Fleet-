-- Run this once against your PostgreSQL database to set everything up.
-- e.g.: psql -U postgres -d your_db_name -f schema.sql

-- 1. Enable PostGIS (this is what lets us store/query GPS points efficiently)
CREATE EXTENSION IF NOT EXISTS postgis;

-- 2. The main table: every detection (pothole, congestion, etc.) is one row here
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,              -- 'pothole', 'congestion', etc.
    location GEOGRAPHY(POINT, 4326) NOT NULL, -- GPS point (longitude, latitude)
    confidence FLOAT,                        -- model confidence score (0-1)
    vehicle_count FLOAT,                     -- only used for congestion events, NULL otherwise
    condition TEXT[],                        -- only for sign events, e.g. damage flags
    image_base64 TEXT,                       -- cropped image of the defect, base64-encoded JPEG
    bus_id VARCHAR(50),                      -- which bus/source reported this
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 2b. If the table already existed from before image_base64 was added,
-- CREATE TABLE IF NOT EXISTS above is a no-op and won't add the column.
-- This makes re-running schema.sql safe/idempotent either way.
ALTER TABLE events ADD COLUMN IF NOT EXISTS image_base64 TEXT;

-- 3. A spatial index -- makes location-based queries (like clustering) fast
CREATE INDEX IF NOT EXISTS idx_events_location ON events USING GIST (location);
