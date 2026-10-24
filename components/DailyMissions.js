const missions = [
  ["Protein Goal", 25],
  ["Calories Goal", 25],
  ["Workout", 50],
  ["10k Steps", 20],
  ["3L Water", 15],
];

export default function DailyMissions() {
  return (
    <div className="space-y-3">
      {missions.map(([title, xp]) => (
        <div
          key={title}
          className="border rounded p-4 flex justify-between"
        >
          <span>{title}</span>

          <span>
            +{xp} XP
          </span>
        </div>
      ))}
    </div>
  );
}