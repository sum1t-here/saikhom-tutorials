import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const quizId = req.nextUrl.pathname.split("/")[3];
        const {question, options, answer} = await req.json();

        if(!question || !options || !answer){
            return NextResponse.json({message: "Please fill all the fields"}, {status: 400});
        }

        await prisma.question.create({
            data:{
                quizId: parseInt(quizId),
                text: question,
                options,
                answer,
            }
        })
        return NextResponse.json({message: "Created succesfully !!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}