import db from "@/db";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const pdfFile = formData.get("file") as File;
    const description = formData.get("description") as string;

    if (!title || !pdfFile) {
      return NextResponse.json(
        { error: "Title and file are required" },
        { status: 400 }
      );
    }

    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Create a temporary file path
    const tempPath = `public/uploads/${pdfFile.name}-${Date.now() + Math.random() * 100}`;
    await fs.mkdir("public/uploads", { recursive: true });
    await fs.writeFile(tempPath, Buffer.from(await pdfFile.arrayBuffer()));

    // Upload the PDF as a raw file
    const uploadPdf = await cloudinary.uploader.upload(tempPath, {
      resource_type: "raw", // Specify the resource type as "raw"
      folder: "courses/pdf", // Optional: Organize files in a folder
    });

    // Delete the temporary file
    await fs.unlink(tempPath);

    // Save the PDF details to the database
    const pdf = await db.pDF.create({
      data: {
        title,
        pdfFile: uploadPdf.secure_url,
        description,
      },
    });

    return NextResponse.json(
      { pdf, message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { message: "Failed to upload, try again" },
      { status: 500 }
    );
  }
}