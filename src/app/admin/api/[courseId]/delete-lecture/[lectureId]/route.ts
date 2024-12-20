import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; lectureId: string } }
) {
  const { courseId, lectureId } = await params;

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
