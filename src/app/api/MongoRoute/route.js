import { NextResponse } from "next/server";
import connectDB from "@/connectDB/connect";
import Order from "@/connectDB/Order";

export async function POST(req) {
  try {
    await connectDB();

    const { cartlist, totalPrice } = await req.json();

    if (!cartlist || cartlist.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart is empty" },
        { status: 400 }
      );
    }

    await Order.create({
      items: cartlist,
      totalPrice,
    });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully ✅",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
