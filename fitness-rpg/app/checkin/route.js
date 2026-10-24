import { NextResponse } from "next/server";

import User from "@/models/User";
import DailyLog from "@/models/DailyLog";

import { connectDB } from "@/lib/mongodb";
import { calculateXp } from "@/lib/gamification";
import { addXp } from "@/lib/xp";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const user = await User.findById(
    body.userId
  );

  const earnedXp = calculateXp(body);

  const result = addXp(
    user.level,
    user.xp,
    earnedXp
  );

  user.level = result.level;
  user.xp = result.xp;

  await user.save();

  await DailyLog.create({
    userId: user._id,
    date: new Date()
      .toISOString()
      .split("T")[0],

    protein: body.protein,
    calories: body.calories,
    water: body.water,
    steps: body.steps,

    workoutCompleted:
      body.workoutCompleted,

    xpEarned: earnedXp,
  });

  return NextResponse.json({
    earnedXp,
    level: result.level,
    xp: result.xp,
  });
}