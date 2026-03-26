function getBSFStage(ageDays) {
  if (ageDays <= 4) return "Egg";
  if (ageDays <= 10) return "Larvae";
  if (ageDays <= 18) return "Instar 1–3";
  if (ageDays <= 25) return "Instar 4–5";
  return "Pupae";
}

function predictHarvestDay(ageDays) {
  const HARVEST_DAY = 20; // optimal harvest
  return ageDays >= HARVEST_DAY
    ? "Ready / Overdue"
    : `${HARVEST_DAY - ageDays} days remaining`;
}

module.exports = {
  getBSFStage,
  predictHarvestDay,
};
