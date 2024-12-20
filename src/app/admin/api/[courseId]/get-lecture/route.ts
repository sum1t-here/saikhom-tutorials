import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params;

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    const studyMaterials = await prisma.studyMaterial.findMany({
      where: { courseId: parseInt(courseId) },
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(studyMaterials, { status: 200 });
  } catch (error) {
    console.error("Error fetching study materials", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
