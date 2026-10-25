export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } =
      await req.json();

    const user =
      await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const isValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isValid) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set(
      "fitnessrpg-token",
      token,
      {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    console.log("Logged user:", user._id.toString());

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Login failed",
      },
      { status: 500 }
    );
  }
}