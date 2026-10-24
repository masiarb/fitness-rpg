import XpBar from "@/components/XpBar";
import DailyMissions from "@/components/DailyMissions";
import { redirect } from "next/navigation";

export function Home() {
  redirect("/dashboard");
}

export default function Dashboard() {
  const user = {
    level: 5,
    xp: 180,
    nextLevelXp: 300,
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">
        Fitness RPG
      </h1>

      <XpBar
        level={user.level}
        xp={user.xp}
        nextLevelXp={user.nextLevelXp}
      />

      <DailyMissions />

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          🔥 Workout Streak: 5
        </div>

        <div className="border rounded p-4">
          💧 Hydration Streak: 12
        </div>
      </div>
    </main>
  );
}