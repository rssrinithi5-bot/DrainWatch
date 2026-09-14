export async function fetchDashboardData() {
  const response = await fetch('/api/sensors');
  if (!response.ok) throw new Error('Unable to reach DrainWatch API');
  return response.json();
}

export async function resetSimulation() {
  const response = await fetch('/api/simulation/reset', { method: 'POST' });
  if (!response.ok) throw new Error('Unable to reset simulation');
  return response.json();
}
