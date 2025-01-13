import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/db";
import { OrderStatus } from "@prisma/client";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } =
      await request.json();
    // console.log(orderId, razorpayPaymentId, razorpaySignature);

    const signature = generatedSignature(orderId, razorpayPaymentId);
    if (signature !== razorpaySignature) {
      return NextResponse.json(
        { message: "payment verification failed", isOk: false },
        { status: 400 }
      );
    }
    const order = await prisma.order.findUnique({
      where: {
        orderId: orderId,
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "order not found", isOk: false },
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { orderStatus: OrderStatus.PAID, isFree: false },
    });
    return NextResponse.json(
      { message: "payment verified successfully", isOk: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }
}
