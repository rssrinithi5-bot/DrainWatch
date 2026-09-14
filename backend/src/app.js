import express from 'express';
import cors from 'cors';
import { analyzeSensors } from './services/riskEngine.js';
import { getCurrentSensors, readSensors, resetSimulation } from './services/sensorSimulator.js';

const app = express();
app.use(cors());
app.use(express.json());

const history = [];

function snapshot() {
  const sensors = readSensors();
  const analysis = analyzeSensors(sensors);
  const result = { sensors, ...analysis };
  history.unshift(result);
  if (history.length > 20) history.pop();
  return result;
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'DrainWatch API', timestamp: new Date().toISOString() });
});

app.get('/api/sensors', (_req, res) => {
  res.json(snapshot());
});

app.get('/api/history', (_req, res) => {
  res.json(history);
});

app.post('/api/simulation/reset', (_req, res) => {
  const sensors = resetSimulation();
  history.length = 0;
  res.json({ sensors, ...analyzeSensors(sensors) });
});

app.get('/api/sensors/current', (_req, res) => {
  const sensors = getCurrentSensors();
  res.json({ sensors, ...analyzeSensors(sensors) });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;
