import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.courses.findMany({
      orderBy: {
        category: "asc",
      },
    });

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}