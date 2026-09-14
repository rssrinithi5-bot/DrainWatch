import { Activity, Droplets, Radio } from 'lucide-react';

export default function Header({ connected, updatedAt }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon"><Droplets size={22} /></div>
        <div>
          <h1>DrainWatch</h1>
          <p>AIoT Flood Early Warning</p>
        </div>
      </div>
      <div className="live-status">
        <span className={`status-dot ${connected ? 'online' : ''}`} />
        <Radio size={16} />
        {connected ? 'Live simulation' : 'Connecting...'}
        <span className="updated">{updatedAt ? new Date(updatedAt).toLocaleTimeString() : '--'}</span>
      </div>
    </header>
  );
}
