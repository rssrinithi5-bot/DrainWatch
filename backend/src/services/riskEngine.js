export function analyzeSensors(sensor) {
  const waterScore = Math.min(100, (sensor.waterLevel / 90) * 100);
  const rainScore = Math.min(100, (sensor.rainfall / 100) * 100);
  const flowScore = sensor.flowRate < 15 ? 85 : Math.min(100, sensor.flowRate);
  const blockageScore = sensor.blockage ? 100 : 0;

  const score = Math.round(
    waterScore * 0.45 + rainScore * 0.25 + flowScore * 0.1 + blockageScore * 0.2
  );

  let level = 'Low';
  if (score >= 75) level = 'Critical';
  else if (score >= 55) level = 'High';
  else if (score >= 35) level = 'Moderate';

  const alert = level === 'High' || level === 'Critical';
  const reasons = [];
  if (sensor.waterLevel >= 70) reasons.push('High water level');
  if (sensor.rainfall >= 65) reasons.push('Heavy rainfall');
  if (sensor.flowRate < 15) reasons.push('Reduced flow');
  if (sensor.blockage) reasons.push('Possible blockage detected');

  return {
    riskScore: score,
    riskLevel: level,
    alert,
    reasons: reasons.length ? reasons : ['Conditions are currently stable']
  };
}
