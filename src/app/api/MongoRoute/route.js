import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionDB } from "@/ProductDB/connect";

export async function GET() {
  try {
    await mongoose.connect(ConnectionDB);

    return NextResponse.json({
      success: true,
      message: "API is working & MongoDB connected ✅",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed ❌",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
