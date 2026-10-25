export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { xpForNextLevel } from "@/lib/xp";

export async function GET(req) {
  try {
    await connectDB();

    const token =
      req.cookies.get("fitnessrpg-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      level: user.level,
      xp: user.xp,
      nextLevelXp: xpForNextLevel(
        user.level
      ),
      streaks: user.streaks || {},
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Dashboard error" },
      { status: 500 }
    );
  }
}