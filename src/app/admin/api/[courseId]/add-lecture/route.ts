import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import prisma from "@/db";
import fs from "fs/promises";

export const config = {
  api: { bodyParser: false },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    const formData = await req.formData();
    const videoFile = formData.get("video") as File;

    if (!videoFile) {
      return NextResponse.json(
        {
          message: "Video file is required",
        },
        { status: 400 }
      );
    }

    if (!videoFile.type.startsWith("video/")) {
      return NextResponse.json(
        {
          message: "Only video files are allowed",
        },
        { status: 400 }
      );
    }

    const tempath = `public/uploads/${Date.now()}+${videoFile.name}`;
    await fs.mkdir("public/uploads", { recursive: true });
    await fs.writeFile(tempath, Buffer.from(await videoFile.arrayBuffer()));

    const uploadedVideo = await cloudinary.uploader.upload(tempath, {
      resource_type: "video",
      folder: "courses/videos",
    });

    await fs.unlink(tempath);

    const title = formData.get("title")?.toString() || "";
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const studyMaterial = await prisma?.studyMaterial?.create({
      data: {
        title,
        type: "VIDEO",
        url: uploadedVideo.secure_url,
        course: { connect: { id: parseInt(courseId) } },
      },
    });

    return NextResponse.json(studyMaterial, { status: 201 });
  } catch (error) {
    console.error("Error adding study material:", error);
    return NextResponse.json(
      { error: "Failed to add study material." },
      { status: 500 }
    );
  }
}
