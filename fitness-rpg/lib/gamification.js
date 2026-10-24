export function calculateXp(data) {
  let xp = 0;

  if (data.proteinMet) xp += 25;
  if (data.caloriesMet) xp += 25;
  if (data.workoutCompleted) xp += 50;
  if (data.stepsMet) xp += 20;
  if (data.waterMet) xp += 15;

  const perfectDay = [
    data.proteinMet,
    data.caloriesMet,
    data.workoutCompleted,
    data.stepsMet,
    data.waterMet,
  ].every(Boolean);

  if (perfectDay) xp += 50;

  return xp;
}