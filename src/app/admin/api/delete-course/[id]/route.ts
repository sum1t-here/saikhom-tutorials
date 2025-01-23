import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(req: NextRequest) {
  // "/admin/api/delete-course/id"
  const courseId = req.nextUrl.pathname.split("/")[4];

  if (!courseId) {
    return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
  }

  try {
    const course = await prisma.courses.delete({
      where: { id: parseInt(courseId, 10) },
    });

    return NextResponse.json(
      { message: "Course deleted successfully", course },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to delete course", details: (error as Error).message },
      { status: 500 }
    );
  }
}
