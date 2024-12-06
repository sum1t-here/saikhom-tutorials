import { NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "Invalid course ID" }, { status: 400 });
  }

  try {
    const course = await prisma.courses.delete({
      where: { id: parseInt(id, 10) },
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
