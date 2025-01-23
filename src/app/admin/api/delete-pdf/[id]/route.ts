import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(req: NextRequest) {
  // Extract the ID from the URL
  const id = req.nextUrl.pathname.split("/")[4];

  // Validate the ID
  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ message: "Invalid PDF ID" }, { status: 400 });
  }

  try {
    // Delete the PDF
    await prisma.pDF.delete({
      where: {
        id: parseInt(id),
      },
    });

    // Return success response
    return NextResponse.json({ message: "PDF deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting PDF:", error);

    // Handle specific Prisma errors
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json({ message: "PDF does not exist" }, { status: 404 });
    }

    // Return generic error response
    return NextResponse.json({ message: "Failed to delete PDF" }, { status: 500 });
  }
}