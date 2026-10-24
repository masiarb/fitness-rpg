"use client";

import { useState } from "react";

export default function CheckinForm() {
  const [data, setData] =
    useState({
      proteinMet: false,
      caloriesMet: false,
      workoutCompleted: false,
      stepsMet: false,
      waterMet: false,
    });

  async function submit() {
    const response = await fetch(
      "/api/checkin",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          userId: "USER_ID",
          ...data,
        }),
      }
    );

    const result =
      await response.json();

    alert(
      `+${result.earnedXp} XP earned!`
    );
  }

  return (
    <div className="space-y-3">
      {Object.keys(data).map((field) => (
        <label
          key={field}
          className="block"
        >
          <input
            type="checkbox"
            checked={data[field]}
            onChange={(e) =>
              setData({
                ...data,
                e.target.checked,
              })
            }
          />

          {" "}
          {field}
        </label>
      ))}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Claim XP
      </button>
    </div>
  );
}