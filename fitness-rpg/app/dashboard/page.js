"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import XpBar from "@/components/XpBar";
import DailyMissions from "@/components/DailyMissions";
import Image from "next/image";
import {
  getBadge,
  getNextBadgeLevel,
} from "@/lib/badges";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  async function resetProgress() {
    const confirmed = window.confirm(
      "Reset all progress?"
    );

    if (!confirmed) return;

    const response = await fetch(
      "/api/reset",
      {
        method: "POST",
      }
    );

    if (response.ok) {
      window.location.reload();
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const response = await fetch("/api/dashboard");

    if (!response.ok) {
      console.error("Failed to load dashboard");
      return;
    }

    const data = await response.json();

    setUser(data);
  }

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        Loading...
      </main>
    );
  }

  const badge = getBadge(user.level);
  const nextLevel = getNextBadgeLevel(user.level);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold">
        Fitness RPG
      </h1>

      <div className="bg-slate-800 rounded-xl p-6 text-center border border-slate-700">
        <Image
          src={badge.image}
          alt={badge.name}
          width={200}
          height={200}
          className="mx-auto"
        />

        <h2 className="text-2xl font-bold mt-4">
          {badge.name}
        </h2>

        <p className="text-slate-400">
          Current Rank • Level {user.level}
        </p>
        <p className="text-green-400 mt-2">
          Next rank unlocks at Level {nextLevel}
        </p>
        <div className="mt-6 border-t border-slate-700 pt-4">
        <p className="text-slate-400">
          Next Unlock
        </p>

        <div className="text-5xl mt-2">
          ❓
        </div>

        <p className="text-green-400 mt-2">
          Reach Level {nextLevel}
        </p>
      </div>
      </div>

      <XpBar
        level={user.level}
        xp={user.xp}
        nextLevelXp={user.nextLevelXp}
      />

      <DailyMissions />

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-4">
          🔥 Workout Streak: {user.streaks?.workout || 0}
        </div>

        <div className="border rounded p-4">
          💧 Hydration Streak: {user.streaks?.hydration || 0}
        </div>
      </div>

      <div className="pt-8">
        <button
          onClick={resetProgress}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Reset Progress
        </button>
      </div>
    </main>
  );
}