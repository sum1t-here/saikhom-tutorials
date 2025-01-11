import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";


export const config = {
  api: { bodyParser: false },
};



export async function POST(req: NextRequest) {
  try {
    const courseId = req.nextUrl.pathname.split("/")[3];
    // console.log(courseId);
    if (!courseId) {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }
    
    const {title, videoUrl} = await req.json();

    if(!title || !videoUrl){
      return NextResponse.json({message: "Please fill all the fields"}, {status: 400});
    }

  const studyMaterial = await prisma?.studyMaterial?.create({
    data:{
      title,
      type: "VIDEO",
      url: videoUrl,
      course: { connect: { id: parseInt(courseId) } },
    }
  })

    return NextResponse.json(studyMaterial, { status: 201 });
  } catch (error) {
    console.error("Error adding study material:", error);
    return NextResponse.json(
      { error: "Failed to add study material." },
      { status: 500 }
    );
  }
}
