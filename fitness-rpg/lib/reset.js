export function getCurrentGameDay() {
  const now = new Date();

  const gameDay = new Date(now);

  if (now.getHours() < 5) {
    gameDay.setDate(gameDay.getDate() - 1);
  }

  return gameDay.toISOString().split("T")[0];
}