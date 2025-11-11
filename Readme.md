# NightKnight - 2025 Taipei Government Codefest Hackathon

**Your Guardian on the Way Home**

![Demo](demo/init.gif)

## Overview

In response to increasing concerns about random street attacks, NightKnight is designed to protect citizens' safety through a comprehensive dual-approach system combining passive and active protection mechanisms.

## Core Features

### Passive Protection - "I Can Show You the World"
- Integrates multiple Taipei City open data sources: streetlights, police stations, MRT stations, CCTV cameras, and crime incident records
- Calculates real-time safety scores for streets in your vicinity
- Provides intelligent route recommendations based on safety metrics
- Visual color-coded safety indicators (Green/Yellow/Red) for easy assessment

### Active Protection - "Keep Watching"
- Real-time GPS location sharing between users
- Push notifications to trusted contacts
- Live route tracking on interactive maps
- Emergency alert system with one-tap police contact

## Technical Architecture

### Multi-Platform System
- **Flutter Mobile App** - Native iOS/Android application
- **React Web Frontend** - Progressive web application
- **Python Flask Backend** - RESTful API server
- **WebSocket Server** - Real-time communication hub

### Backend Stack (Python Flask)
- **Flask** - RESTful API framework
- **Flask-CORS** - Cross-origin request handling
- **Overpy** - OpenStreetMap Overpass API integration
- **Pandas + odfpy** - Police station data processing (ODS format)
- **Requests** - HTTP client for external APIs

### Frontend Stack (React + TypeScript)
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **React Leaflet** - Interactive map components
- **Leaflet Geosearch** - Location search and geocoding
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first styling

### Mobile App Stack (Flutter)
- **Flutter** - Cross-platform mobile framework
- **flutter_inappwebview** - WebView integration
- **geolocator** - GPS location services
- **flutter_local_notifications** - Push notification system
- **get** - State management

### Real-time Communication
- **WebSocket Server (Node.js)** - Bidirectional GPS synchronization
- **ws** library - WebSocket implementation

## Safety Scoring Algorithm

### Formula
```
Safety Score = 0.3×CCTV + 0.5×Streetlights + 0.8×Police + 0.7×MRT - 0.4×Theft - 0.5×Robbery
```

### Safety Levels
- 🟢 **Safe** (60-100 points) - Well-lit areas with high security presence
- 🟡 **Caution** (40-59 points) - Moderate safety, stay alert
- 🔴 **Dangerous** (0-39 points) - Avoid if possible, high risk

## Technical Highlights

### 1. Coordinate System Conversion
Implements TWD97 (Taiwan Datum 1997) to WGS84 (GPS standard) transformation algorithm for accurate geospatial calculations.

```python
def twd97_to_wgs84(x, y):
    # Complex ellipsoid projection transformation
    # Handles Taiwan-specific TM2 projection zone
```

### 2. Performance Optimization
- **Data Caching** - 30-minute API response cache to reduce redundant requests
- **Spatial Filtering** - Pre-filters 145,000+ streetlight records to search area
- **Smart Sampling** - Maximum 25 sampling points for long routes, balancing accuracy and speed
- **Exponential Backoff** - Automatic retry mechanism for Overpass API failures

### 3. Multi-Route Algorithm
Leverages OSRM (Open Source Routing Machine) to generate 2-3 alternative routes, analyzing safety metrics for each path.

```python
@app.route('/find_safe_routes', methods=['POST'])
# 1. Fetch alternative routes from OSRM
# 2. Analyze safety facilities around sampling points
# 3. Calculate overall safety score and recommend safest path
```

### 4. Haversine Distance Calculation
Implements spherical geometry for precise distance calculations on Earth's surface.

```python
def haversine(lat1, lon1, lat2, lon2):
    R = 6371000  # Earth radius in meters
    # Accounts for Earth's curvature
```

### 5. Normalized Scoring System
Uses clamp functions to normalize indicators to 0-1 range before applying weighted calculations.

```python
def calculate_safety_score(cctv_count, lamp_count, ...):
    C = clamp(cctv_count / cctv_max, 0.0, 1.0)
    L = clamp(lamp_count / lamp_max, 0.0, 1.0)
    # Weighted final score calculation
```

## Data Integration

### Taipei City Open Data Sources
- **CCTV Cameras** - 13,000+ surveillance camera locations
- **MRT Exits** - All metro station entrance/exit coordinates
- **Crime Records** - Historical robbery and theft incident data
- **Streetlights** - 145,000+ streetlight positions (Azure Blob Storage)
- **Police Stations** - Local ODS file with station coordinates

## API Endpoints

### Core APIs
- `GET /get_safety_data` - Query safety resources around a single point
- `GET /get_nearby_roads_safety` - Analyze road safety in an area
- `POST /find_safe_routes` - Intelligent route planning (primary feature)

## Frontend Features

- **Interactive Map** - Click to set destination
- **Route Visualization** - Color-coded safety levels for each segment
- **Multi-Route Comparison** - Switch between alternative paths
- **Detailed Statistics** - Distance, time, and safety facility counts
- **Responsive Design** - Optimized for mobile and desktop
- **Real-time GPS Sync** - Live location sharing between users

## Innovation Points

- **Safety-First Routing** - Prioritizes nighttime safety over shortest distance
- **Multi-Dimensional Assessment** - Integrates 5 positive factors + 2 negative factors
- **Intuitive Visualization** - Color coding for instant safety assessment
- **Practical Application** - Addresses real needs of Taipei's night commuters
- **Cross-Platform** - Seamless experience across mobile and web

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- Flutter SDK 3.8+

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python backend.py
```

### Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### WebSocket Server
```bash
cd websocket-server
npm install
npm start
```

### Mobile App
```bash
cd APP
flutter pub get
flutter run
```

## Project Structure
```
├── APP/                    # Flutter mobile application
├── Frontend/               # React web application (primary)
├── Frontend-2/             # React web application (GPS receiver)
├── backend/                # Python Flask API server
├── websocket-server/       # Node.js WebSocket server
├── GPS_SYNC_GUIDE.md      # GPS synchronization documentation
└── IMPLEMENTATION_SUMMARY.md  # Technical implementation details
```

## Team & Hackathon

Developed for the 2025 Taipei Government Codefest Hackathon, NightKnight demonstrates comprehensive full-stack development capabilities, integrating GIS technology, real-time communication, route planning algorithms, and data visualization to create a practical solution for urban safety.

### Team Members
- cuh02a08@gmail.com
- leejay3830821@gmail.com
- bebechen333@gmail.com
- steward3799@gmail.com