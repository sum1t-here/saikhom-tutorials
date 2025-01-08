import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({ error: "User ID not found" }, { status: 401 });
  }

  const purchasedCourses = await prisma.order.findMany({
    where: {
      userId: parseInt(userId),
      orderStatus: "PAID",
    },
    include: {
      course: true,
    },
  });

  return NextResponse.json(purchasedCourses);
}
