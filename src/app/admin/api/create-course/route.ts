import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    // parse the form data
    const formData = await req.formData();
    const file = formData.get("thumbnail") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Thumbnail is required" },
        { status: 400 }
      );
    }

    // validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image file is allowed" },
        { status: 400 }
      );
    }

    // save file temporarily
    const tempPath = `public/uploads/${Date.now() + Math.random() * 100}-${
      file.name
    }`;
    await fs.mkdir("public/uploads", { recursive: true });
    await fs.writeFile(tempPath, Buffer.from(await file.arrayBuffer()));

    // upload to cloudinary
    const uploadedThumbnail = await cloudinary.uploader.upload(tempPath, {
      folder: "courses/thumbnails",
    });

    // clean up temporary path
    await fs.unlink(tempPath);

    // extract additional fields
    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const subject = formData.get("subject")?.toString() || "";
    const price = formData.get("price")?.toString() || "0";

    // Validate other fields
    if (!title || !description || !category || !subject || !price) {
      console.log(formData);
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Save course to the database
    const course = await prisma.courses.create({
      data: {
        title,
        description,
        thumbnail: uploadedThumbnail.secure_url, // Use Cloudinary URL
        category,
        subject,
        price: Number(price),
      },
    });

    return NextResponse.json(
      { course, message: "Course created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
