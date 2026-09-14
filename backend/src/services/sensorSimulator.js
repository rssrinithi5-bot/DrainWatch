const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

let state = {
  waterLevel: 54,
  flowRate: 38,
  rainfall: 22,
  blockage: false,
  updatedAt: new Date().toISOString()
};

const randomWalk = (value, step, min, max) =>
  Number(clamp(value + (Math.random() * 2 - 1) * step, min, max).toFixed(1));

export function readSensors() {
  state.waterLevel = randomWalk(state.waterLevel, 5.5, 8, 96);
  state.rainfall = randomWalk(state.rainfall, 9, 0, 120);

  const blockageChance = state.waterLevel > 72 ? 0.16 : 0.07;
  state.blockage = Math.random() < blockageChance ? !state.blockage : state.blockage;

  const targetFlow = state.blockage ? 18 : 42;
  state.flowRate = randomWalk((state.flowRate + targetFlow) / 2, 7, 4, 100);
  state.updatedAt = new Date().toISOString();

  return { ...state };
}

export function resetSimulation() {
  state = {
    waterLevel: 54,
    flowRate: 38,
    rainfall: 22,
    blockage: false,
    updatedAt: new Date().toISOString()
  };
  return { ...state };
}

export function getCurrentSensors() {
  return { ...state };
}
