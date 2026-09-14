import { useEffect, useState } from 'react';
import { RefreshCw, Server, TriangleAlert } from 'lucide-react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import RiskBanner from './components/RiskBanner';
import SensorTable from './components/SensorTable';
import { fetchDashboardData, resetSimulation } from './api';

const initial = { sensors: { waterLevel: 0, flowRate: 0, rainfall: 0, blockage: false }, riskLevel: 'Low', riskScore: 0, alert: false, reasons: [] };

export default function App() {
  const [data, setData] = useState(initial);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const next = await fetchDashboardData();
      setData(next); setConnected(true); setError('');
    } catch (err) { setConnected(false); setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    load();
    const timer = setInterval(load, 3000);
    return () => clearInterval(timer);
  }, []);

  const reset = async () => { setLoading(true); try { setData(await resetSimulation()); setError(''); } catch (err) { setError(err.message); } finally { setLoading(false); } };
  const { sensors } = data;

  return (
    <div className="app-shell">
      <Header connected={connected} updatedAt={sensors.updatedAt} />
      <main>
        <section className="hero">
          <div><span className="eyebrow">SMART DRAINAGE CONTROL CENTER</span><h2>Know the water before it rises.</h2><p>Real-time-looking sensor intelligence for early flood awareness.</p></div>
          <button className="reset-btn" onClick={reset} disabled={loading}><RefreshCw size={16} className={loading ? 'spin' : ''} /> Reset simulation</button>
        </section>

        {error && <div className="error"><TriangleAlert size={18} /> {error}. Start the backend with <code>npm run backend</code>.</div>}

        <RiskBanner level={data.riskLevel} score={data.riskScore} alert={data.alert} reasons={data.reasons} />

        <section className="metrics-grid">
          <MetricCard type="water" title="Water Level" value={sensors.waterLevel.toFixed(1)} unit="%" detail="Ultrasonic sensor • 0–100%" />
          <MetricCard type="flow" title="Flow Rate" value={sensors.flowRate.toFixed(1)} unit=" L/min" detail="Flow sensor • live estimate" />
          <MetricCard type="rain" title="Rainfall" value={sensors.rainfall.toFixed(1)} unit=" mm/h" detail="Rain sensor • intensity" />
          <article className={`metric-card blockage ${sensors.blockage ? 'is-danger' : ''}`}><div className="blockage-gauge"><span>{sensors.blockage ? '!' : '✓'}</span></div><div className="metric-copy"><span>Blockage Status</span><strong>{sensors.blockage ? 'Detected' : 'Clear'}</strong><p>{sensors.blockage ? 'Inspect drainage path' : 'Flow path appears normal'}</p></div></article>
        </section>

        <div className="lower-grid">
          <SensorTable data={sensors} />
          <section className="panel insight"><div className="panel-heading"><div><span className="eyebrow">SYSTEM INSIGHT</span><h3>Why this matters</h3></div><Server size={20} /></div><div className="insight-list">{data.reasons.map((reason) => <div className="insight-row" key={reason}><span>•</span>{reason}</div>)}</div><div className="architecture-note"><strong>ESP32-ready architecture</strong><p>Swap the simulator service for Wi-Fi sensor readings without changing the dashboard.</p></div></section>
        </div>
        <footer>DrainWatch prototype • Sensor simulation updates every 3 seconds • For demonstration only</footer>
      </main>
    </div>
  );
}
