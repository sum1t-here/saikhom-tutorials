import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, fullname, email, phone, password } = await req.json();

    if (!username || !fullname || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const savedUser = await prisma.user.findUnique({ where: { email } });

    if (savedUser) {
      return NextResponse.json(
        { message: "User email already registered" },
        { status: 400 },
      );
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = await prisma.user.create({
      data: {
        username: username,
        fullname: fullname,
        email: email,
        phone: phone,
        password: hashedPassword,
      } as const,
    });

    return NextResponse.json(
      { user, message: "User created succesfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 404 },
    );
  }
}
