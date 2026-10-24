export default function XpBar({
  level,
  xp,
  nextLevelXp,
}) {
  const percentage =
    (xp / nextLevelXp) * 100;

  return (
    <div className="space-y-2">
      <div className="font-bold">
        Level {level}
      </div>

      <div className="bg-zinc-200 rounded h-4">
        <div
          className="bg-green-500 h-4 rounded"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div>
        {xp} / {nextLevelXp} XP
      </div>
    </div>
  );
}