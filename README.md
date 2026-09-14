# DrainWatch 🌧️

AIoT-based smart drainage monitoring and flood early warning system.

## Problem
Urban drains can overflow because rising water, heavy rainfall, abnormal flow, and blockages are difficult to monitor continuously. DrainWatch provides a single dashboard for these signals and turns them into an understandable flood-risk alert.

## Solution
DrainWatch combines simulated ultrasonic water-level, water-flow, and rain sensors with a Node.js/Express API. The backend calculates flood risk and detects possible blockage conditions, while a responsive React dashboard presents live-looking readings and alerts.

## Features
- Water level monitoring
- Water flow-rate monitoring
- Rainfall monitoring
- Blockage detection
- Low / Moderate / High / Critical flood-risk classification
- Simulated changing sensor values
- REST API
- Responsive dashboard with recent readings
- Clear modular frontend/backend structure

## Architecture
```text
Sensor Simulator
   ├── Ultrasonic sensor
   ├── Flow sensor
   └── Rain sensor
          ↓
Node.js + Express API
   ├── Sensor state
   ├── Flood-risk calculation
   ├── Blockage detection
   └── Alert status
          ↓
React + Vite Dashboard
```

## Technologies
- React + Vite
- JavaScript
- CSS
- Node.js
- Express
- REST API

## Project Structure
```text
DrainWatch/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── riskEngine.js
│   │   │   └── sensorSimulator.js
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── RiskBanner.jsx
│   │   │   └── SensorTable.jsx
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── package.json
└── README.md
```

## How to Run
### 1. Install dependencies
From the repository root:
```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

### 2. Start the backend
```bash
npm run backend
```
The API runs at `http://localhost:5000`.

### 3. Start the frontend
Open another terminal:
```bash
npm run frontend
```
Then open the Vite URL shown in the terminal, normally `http://localhost:5173`.

### API endpoints
- `GET /api/health` - service health
- `GET /api/sensors` - current simulated sensor readings and analysis
- `GET /api/history` - recent simulated readings
- `POST /api/simulation/reset` - reset the simulator

## Flood-Risk Logic
The prototype combines water level, rainfall, flow behavior, and blockage indicators into a transparent weighted score. The result is classified as Low, Moderate, High, or Critical. This is a prototype rule engine, not a production flood prediction model.

## Future ESP32 Integration
The simulator is intentionally isolated behind the sensor service. In a hardware deployment, ESP32 firmware can publish ultrasonic, flow, and rain readings over Wi-Fi using HTTP or MQTT. The backend can then validate those readings, store historical data, and feed the same risk engine. Future versions can add real sensors, GPS/GIS maps, cloud storage, SMS/WhatsApp alerts, and ML-based forecasting.

## License
This project is a student prototype for learning, demonstration, and ideation.
