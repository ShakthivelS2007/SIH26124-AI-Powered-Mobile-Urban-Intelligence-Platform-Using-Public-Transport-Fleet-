<div align="center">

# 🚌 HelioWatch

### AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet

*Turning everyday bus routes into a live, city-wide road-health sensor network.*

![SIH 2026](https://img.shields.io/badge/SIH-2026-orange?style=for-the-badge)
![Problem Statement](https://img.shields.io/badge/PS-SIH26124-blue?style=for-the-badge)
![Team](https://img.shields.io/badge/Team-Arsene-black?style=for-the-badge)

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostGIS-4169E1?logo=postgresql&logoColor=white)
![YOLO28n](https://img.shields.io/badge/YOLO28n-00FFFF?logo=yolo&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)

</div>

---

## 💡 The Idea

Municipal buses already cover most of a city, every single day. **HelioWatch** mounts a dashcam on them and runs a computer-vision model to spot road defects as the bus drives. Each detection is stamped with GPS and sent to a live dashboard, so civic teams can see and prioritise repairs without a single dedicated survey vehicle.

## ✨ Features

- 🧠 **Multi-defect AI detection** using custom-trained YOLOv8n models:
  - 🕳️ Potholes
  - 🌊 Waterlogging
  - 🪧 Road signs (good / damaged condition)
  - 🚸 Zebra crossings
  - 🚶 Pedestrians at risk
  - 🚨 Hit-and-run incidents
- 📍 **Geo-tagged events** stored in PostGIS, with **25 m / 24 h de-duplication** so one pothole = one record
- 🗺️ **Live dashboard** with defect map, stat cards, and a searchable table sorted by bus
- 🔥 **Congestion heatmap** on the Reports page
- 🗣️ **Citizen complaint portal** with AI-verified complaints, Aadhaar-style login, accessibility bar, voice readout, and multilingual UI (EN / தமிழ் / हिन्दी)
- 🔊 **Auto-voice alerts** that read out new detections as they arrive

## 🏗️ How It Works

```mermaid
%%{init: {'flowchart': {'nodeSpacing': 50, 'rankSpacing': 80, 'curve': 'basis'}}}%%
flowchart LR
    A([🚌 Bus Dashcam]) --> B[🧠 YOLOv28n Model]
    F([🧑 Citizen]) --> G[📝 Complaint Portal]

    B -->|type, GPS, confidence, crop| C{{⚡ FastAPI}}
    G -->|photo + location| C
    C -->|verify complaint| B
    B -->|verified result| C

    C -->|store| D[(🐘 PostgreSQL + PostGIS)]
    D -->|query results| C
    C -->|polls every 3s| E[💻 React Dashboard]

    classDef source fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0f172a
    classDef ai fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#0f172a
    classDef core fill:#dcfce7,stroke:#16a34a,stroke-width:3px,color:#0f172a
    classDef store fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#0f172a

    class A,F source
    class B,G ai
    class C core
    class D,E store

    linkStyle default stroke:#64748b,stroke-width:2px
```

Citizen complaints take the same path as bus detections: the portal sends them to FastAPI, the model verifies the reported defect, and only verified results are stored and shown on the dashboard.


## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| **Frontend** | React, Vite, React Router, Leaflet, leaflet.heat |
| **Backend** | FastAPI, SQLAlchemy, GeoAlchemy2, Shapely |
| **Database** | PostgreSQL + PostGIS |
| **AI Model** | YOLOv28n (PyTorch `.pt` + ONNX export) |

## 📁 Project Structure

```
├── backend/    FastAPI app, DB models, schema.sql, smoke test
├── frontend/   React dashboard + citizen complaint portal
└── model/      Trained YOLOv8 weights (.pt + ONNX export)
```

## 🚀 Quick Start

**1. Database**
```bash
psql -U postgres -d your_db -f backend/schema.sql
```

**2. Backend**
```bash
cd backend
pip install -r requirements.txt
echo "DATABASE_URL=postgresql://user:pass@localhost:5432/your_db" > .env
uvicorn main:app --reload        # docs at http://127.0.0.1:8000/docs
python test_send_events.py       # optional: send sample detections
```

**3. Frontend**
```bash
cd frontend
npm install
npm run dev
```
> Point `API_BASE_URL` in `src/config.js` to your backend URL.

## 🔌 API at a Glance

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/detections` | Submit a detection from the bus |
| `GET` | `/api/detections` | List detections (`?type=`, `?after_id=`) |
| `GET` | `/api/detections/nearby/search` | Detections within a radius of a point |
| `GET` | `/api/dashboard/statistics` | Counts by defect type |

## 👥 Team Arsene

Built for **Smart India Hackathon 2026** · Problem Statement **SIH26124**
<div>
  <img src="assets/image.png" alt="Team Arsene logo" width="180"/>
</div>

---

