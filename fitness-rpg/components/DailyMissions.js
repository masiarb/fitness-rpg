"use client";

import { useEffect, useState } from "react";

const missions = [
  {
    id: "protein",
    title: "Protein Goal",
    xp: 25,
  },
  {
    id: "calories",
    title: "Calories Goal",
    xp: 25,
  },
  {
    id: "workout",
    title: "Workout",
    xp: 50,
  },
  {
    id: "steps",
    title: "10k Steps",
    xp: 20,
  },
  {
    id: "water",
    title: "Water Goal",
    xp: 15,
  },
];

export default function DailyMissions() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    loadCompleted();
  }, []);

  async function loadCompleted() {
    try {
      const response = await fetch(
        "/api/missions/today"
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setCompleted(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function claimMission(id) {
    try {
      const response = await fetch(
        "/api/missions/claim",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId:
              "PUT_YOUR_REAL_USER_ID_HERE",
            missionId: id,
          }),
        }
      );

      if (response.ok) {
        setCompleted((prev) => [
          ...prev,
          id,
        ]);

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-3">
      {missions.map((mission) => {
        const isCompleted =
          completed.includes(
            mission.id
          );

        return (
          <button
            key={mission.id}
            disabled={isCompleted}
            onClick={() =>
              claimMission(
                mission.id
              )
            }
            className={`w-full p-4 rounded border flex justify-between ${
              isCompleted
                ? "bg-green-900 opacity-60 cursor-not-allowed"
                : "hover:bg-slate-700"
            }`}
          >
            <span>
              {isCompleted
                ? "✅ "
                : ""}
              {mission.title}
            </span>

            <span>
              +{mission.xp} XP
            </span>
          </button>
        );
      })}
    </div>
  );
}