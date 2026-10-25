import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function GET(req) {
  try {
    await connectDB();

    const token =
      req.cookies.get("fitnessrpg-token")?.value;

    if (!token) {
      return NextResponse.json({
        authenticated: false,
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(
      decoded.userId
    );

    if (!user) {
      return NextResponse.json({
        authenticated: false,
      });
    }

    return NextResponse.json({
      authenticated: true,
      name: user.name,
      email: user.email,
      level: user.level,
    });
  } catch (error) {
    return NextResponse.json({
      authenticated: false,
    });
  }
}