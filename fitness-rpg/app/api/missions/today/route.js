import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import DailyLog from "@/models/DailyLog";
import { connectDB } from "@/lib/mongodb";
import { getCurrentGameDay } from "@/lib/reset";

export async function GET(req) {
  await connectDB();

  const token =
    req.cookies.get("fitnessrpg-token")?.value;

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const gameDay = getCurrentGameDay();

  const logs = await DailyLog.find({
    userId: decoded.userId,
    gameDay,
  });

  return NextResponse.json(
    logs.map(log => log.mission)
  );
}