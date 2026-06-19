// Maps an aircraft type/name to one of the fleet photos in /public/fleet,
// so the broker/operator screens can show the same imagery as the traveller side.
export function aircraftImage(type: string): string {
  const t = type.toLowerCase();
  if (t.includes("7500")) return "/fleet/ultra-long-range.jpg";
  if (t.includes("g650")) return "/fleet/vip-airliner.jpg";
  if (t.includes("8x") || t.includes("falcon")) return "/fleet/heavy.jpg";
  if (t.includes("6000") || t.includes("g550")) return "/fleet/super-midsize.jpg";
  if (t.includes("praetor") || t.includes("legacy") || t.includes("mid"))
    return "/fleet/midsize.jpg";
  return "/fleet/heavy.jpg";
}
