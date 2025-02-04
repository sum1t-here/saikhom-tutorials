import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest){
    try {
        const id = req.nextUrl.pathname.split("/")[3];

        const questions = await prisma.question.findMany({
            where: {
                quizId: parseInt(id)
            }
        })
        return NextResponse.json(questions, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message},{status:404});
    }
}