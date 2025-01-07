import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, fullname, email, phone, password } = await req.json();

    if (!username || !fullname || !email || !phone || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate phone number (must contain only digits)
    if (!/^\d+$/.test(phone)) {
      return NextResponse.json(
        { message: "Phone number must contain only digits" },
        { status: 400 }
      );
    }

    // Check for duplicate email, username, or phone
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { phone }],
      },
    });

    if (existingUser) {
      let message = "User already registered with ";
      if (existingUser.email === email) message += "this email.";
      else if (existingUser.username === username) message += "this username.";
      else if (existingUser.phone === phone) message += "this phone number.";

      return NextResponse.json({ message }, { status: 400 });
    }

    // Hash the password asynchronously
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with hashed password
    const user = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { user, message: "User created succesfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to create user", error: error.message },
        { status: 500 }
      );
    }
  }
}
