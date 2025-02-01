import { NextResponse } from "next/server";
import prisma from "@/db";

export async function GET () {
    try {
        const quizzes = await prisma.quiz.findMany();
        return NextResponse.json(quizzes);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}