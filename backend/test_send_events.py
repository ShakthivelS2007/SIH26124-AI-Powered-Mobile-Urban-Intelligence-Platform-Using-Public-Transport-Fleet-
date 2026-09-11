"""
test_send_events.py
--------------------
A quick manual smoke test. It does NOT use pytest -- it just fires a few
requests at your running API so you can see the whole flow work end to end:

    AI/client sends detection -> API stores it -> API returns it back

HOW TO USE:
1. Start your API in one terminal:
       uvicorn main:app --reload
2. In another terminal, run:
       python test_send_events.py

It will:
  - POST a pothole detection
  - POST a second detection very close by (to demonstrate duplicate handling)
  - POST a congestion detection
  - GET the list of all detections
  - GET detections near a given point
  - GET dashboard statistics
"""

import requests

BASE_URL = "http://127.0.0.1:8000"


def pretty(label, response):
    print(f"\n--- {label} ---")
    print("Status:", response.status_code)
    try:
        print("Body:", response.json())
    except ValueError:
        print("Body (not JSON):", response.text)


def main():
    # 1. A pothole detection from Bus #27
    pothole = {
        "bus_id": "BUS027",
        "type": "pothole",
        "confidence": 0.94,
        "latitude": 12.845,
        "longitude": 80.226,
    }
    r1 = requests.post(f"{BASE_URL}/api/detections", json=pothole)
    pretty("Create pothole detection (Bus #27)", r1)

    # 2. The SAME pothole, reported again a few meters away by a different bus
    #    -- this should be recognized as a duplicate (within 25m, same type,
    #    within 24 hours) and NOT create a new row.
    pothole_again = {
        "bus_id": "BUS032",
        "type": "pothole",
        "confidence": 0.89,
        "latitude": 12.84501,   # ~1 meter away
        "longitude": 80.22601,
    }
    r2 = requests.post(f"{BASE_URL}/api/detections", json=pothole_again)
    pretty("Report same pothole again (should be deduped)", r2)

    # 3. A congestion event, unrelated location
    congestion = {
        "bus_id": "BUS014",
        "type": "congestion",
        "vehicle_count": 23,
        "latitude": 12.9,
        "longitude": 80.25,
    }
    r3 = requests.post(f"{BASE_URL}/api/detections", json=congestion)
    pretty("Create congestion detection", r3)

    # 4. List everything
    r4 = requests.get(f"{BASE_URL}/api/detections")
    pretty("List all detections", r4)

    # 5. Search near the pothole's location
    r5 = requests.get(
        f"{BASE_URL}/api/detections/nearby/search",
        params={"latitude": 12.845, "longitude": 80.226, "radius_m": 500},
    )
    pretty("Detections near (12.845, 80.226) within 500m", r5)

    # 6. Dashboard stats
    r6 = requests.get(f"{BASE_URL}/api/dashboard/statistics")
    pretty("Dashboard statistics", r6)


if __name__ == "__main__":
    main()
