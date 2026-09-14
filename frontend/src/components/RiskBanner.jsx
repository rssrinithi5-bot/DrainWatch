import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function RiskBanner({ level, score, alert, reasons }) {
  const critical = level === 'Critical';
  return (
    <section className={`risk-banner risk-${level.toLowerCase()}`}>
      <div className="risk-icon">
        {critical ? <ShieldAlert size={28} /> : alert ? <AlertTriangle size={28} /> : <CheckCircle2 size={28} />}
      </div>
      <div className="risk-main">
        <span>FLOOD RISK</span>
        <h2>{level}</h2>
        <p>{reasons?.[0] || 'Monitoring normal conditions'}</p>
      </div>
      <div className="risk-score"><strong>{score}</strong><span>/ 100</span></div>
    </section>
  );
}
