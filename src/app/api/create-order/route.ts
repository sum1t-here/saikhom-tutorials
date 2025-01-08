import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/db";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(req: NextRequest) {
  const { amount, userId, courseId } = await req.json();
  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  if (order) {
    await prisma.order.create({
      data: {
        orderId: order.id,
        userId: parseInt(userId),
        courseId: parseInt(courseId),
      },
    });
  }

  return NextResponse.json(order);
}
