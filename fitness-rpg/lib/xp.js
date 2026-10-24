export function xpForNextLevel(level) {
  return Math.floor(
    100 * Math.pow(1.5, level - 1)
  );
}

export function addXp(
  currentLevel,
  currentXp,
  earnedXp
) {
  let level = currentLevel;
  let xp = currentXp + earnedXp;

  while (xp >= xpForNextLevel(level)) {
    xp -= xpForNextLevel(level);
    level++;
  }

  return {
    level,
    xp,
  };
}