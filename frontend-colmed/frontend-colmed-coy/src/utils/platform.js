export function isRunningOnCapacitor() {
  return process.env.MODE === "capacitor";
}
