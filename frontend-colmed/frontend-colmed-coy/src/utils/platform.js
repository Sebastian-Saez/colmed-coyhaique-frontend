export function isRunningOnCapacitor() {
  return process.env.MODE === "capacitor";
}

export function getPlatform() {
  if (!isRunningOnCapacitor()) {
    return "web";
  }
  return Capacitor.getPlatform();
  // Devuelve 'ios' | 'android' | 'web' | ...
}
