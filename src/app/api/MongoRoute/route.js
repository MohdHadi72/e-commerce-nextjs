import { NextResponse } from "next/server";
import connectDB from "@/connectDB/connect";
import Order from "@/connectDB/Order";

export async function POST(req) {
  try {
    await connectDB();

    const { cartlist, totalPrice } = await req.json();
    if (!cartlist?.length)
      return NextResponse.json({
     success: false,
      message: "Cart is empty"
     }, 
     { status: 400 });

    await Order.create({
       items: cartlist, totalPrice 
      });

    return NextResponse.json({
       success: true,
        message: "Order placed successfully ✅"
       });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
