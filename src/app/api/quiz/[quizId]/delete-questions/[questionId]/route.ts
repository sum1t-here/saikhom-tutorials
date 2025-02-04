import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(req: NextRequest) {
    try {
        const quizId = req.nextUrl.pathname.split("/")[3];
        const questionId = req.nextUrl.pathname.split("/")[5];

        if(!quizId || !questionId){
            return NextResponse.json({message: "Please provide a valid quiz ID and question ID"}, {status: 400});
        }

        await prisma.question.delete({
            where: {
                id: parseInt(questionId),
                quizId: parseInt(quizId)
            }
        })

        return NextResponse.json({message: "Deleted succesfully !!"}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}