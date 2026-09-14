import { Activity, CloudRain, Droplets, Waves } from 'lucide-react';

export default function SensorTable({ data }) {
  const rows = [
    ['Ultrasonic', 'Water-level sensor', `${data.waterLevel.toFixed(1)} %`, <Waves size={17} />],
    ['Flow', 'Water-flow sensor', `${data.flowRate.toFixed(1)} L/min`, <Activity size={17} />],
    ['Rain', 'Rain sensor', `${data.rainfall.toFixed(1)} mm/h`, <CloudRain size={17} />],
    ['Blockage', 'Flow anomaly check', data.blockage ? 'Detected' : 'Clear', <Droplets size={17} />]
  ];
  return (
    <section className="panel">
      <div className="panel-heading"><div><span className="eyebrow">SENSOR NETWORK</span><h3>Live diagnostics</h3></div><span className="pulse-label">● 4 monitored signals</span></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Sensor</th><th>Purpose</th><th>Reading</th><th>Status</th></tr></thead>
          <tbody>{rows.map(([name, purpose, reading, icon]) => <tr key={name}>
            <td><span className="sensor-name">{icon}{name}</span></td><td>{purpose}</td><td className="reading">{reading}</td>
            <td><span className={`chip ${name === 'Blockage' && data.blockage ? 'danger' : 'good'}`}>{name === 'Blockage' ? (data.blockage ? 'Attention' : 'Normal') : 'Active'}</span></td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
