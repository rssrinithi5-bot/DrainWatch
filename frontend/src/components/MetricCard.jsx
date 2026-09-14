import { CloudRain, Gauge, Waves } from 'lucide-react';

const icons = { water: Waves, flow: Gauge, rain: CloudRain };

export default function MetricCard({ type, title, value, unit, detail }) {
  const Icon = icons[type];
  return (
    <article className="metric-card">
      <div className={`metric-icon ${type}`}><Icon size={22} /></div>
      <div className="metric-copy">
        <span>{title}</span>
        <strong>{value}<small>{unit}</small></strong>
        <p>{detail}</p>
      </div>
    </article>
  );
}
