import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db";

export async function DELETE(req: NextRequest) {
  // "/admin/api/courseId/delete-lecture/lectureId"
  const courseId = req.nextUrl.pathname.split("/")[3];
  const lectureId = req.nextUrl.pathname.split("/")[5];

  if (!courseId || !lectureId) {
    return NextResponse.json(
      { message: "Invalid course or lecture ID" },
      { status: 400 }
    );
  }

  try {
    console.log("Attempting to delete lecture with ID:", lectureId);
    const lecture = await prisma.studyMaterial.delete({
      where: {
        id: parseInt(lectureId),
        courseId: parseInt(courseId),
      },
    });

    return NextResponse.json({
      message: "Lecture deleted successfully",
      lecture,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete lecture",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
