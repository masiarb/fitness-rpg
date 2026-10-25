export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

import User from "@/models/User";
import DailyLog from "@/models/DailyLog";
import jwt from "jsonwebtoken";
import { addXp } from "@/lib/xp";


import { connectDB } from "@/lib/mongodb";
import { getCurrentGameDay } from "@/lib/reset";
import { missions } from "@/lib/missions";

export async function POST(req) {
  await connectDB();

  const { missionId } =
    await req.json();


const token =
  req.cookies.get("fitnessrpg-token")?.value;

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

const userId = decoded.userId;

  const mission = missions.find(
    m => m.id === missionId
  );

  if (!mission) {
    return NextResponse.json(
      { error: "Mission not found" },
      { status: 404 }
    );
  }

  const gameDay = getCurrentGameDay();

  const existing =
    await DailyLog.findOne({
      userId,
      mission: missionId,
      gameDay,
    });

  if (existing) {
    return NextResponse.json(
      { error: "Already completed" },
      { status: 400 }
    );
  }

  const user = await User.findById(userId);

    const result = addXp(
    user.level,
    user.xp,
    mission.xp
    );

    user.level = result.level;
    user.xp = result.xp;

    await user.save();

  await DailyLog.create({
    userId,
    mission: missionId,
    gameDay,
    xpEarned: mission.xp,
  });

  return NextResponse.json({
    success: true,
    xp: mission.xp,
  });
}