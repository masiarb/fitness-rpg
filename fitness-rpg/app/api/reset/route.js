import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import DailyLog from "@/models/DailyLog";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const token =
      req.cookies.get("fitnessrpg-token")?.value;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    user.level = 1;
    user.xp = 0;

    await user.save();

    await DailyLog.deleteMany({
      userId: user._id,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Reset failed",
      },
      {
        status: 500,
      }
    );
  }
}