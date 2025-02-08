import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest){
    try {
        const userId = req.nextUrl.pathname.split("/")[3];

    if(!userId){
        return NextResponse.json({error: "User Id not available"},{status: 400});
    }

    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(userId),
        }
    })

    if(!user){
        return NextResponse.json({error: "User not found"},{status: 400});
    }

    const quizResults = await prisma.userQuizResult.findMany({
        where: { userId: parseInt(userId) },
        include: {
            quiz: {
                select: { title: true }, // Fetch quiz title
            },
        },
        orderBy: { createdAt: "desc" }, // Sort by latest attempts
    });

    return NextResponse.json({ quizResults });


    } catch (error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500});
    }
}