import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const quizId = req.nextUrl.pathname.split("/")[3];
        const {text, options, answer} = await req.json();

        if(!text || !options || !answer){
            return NextResponse.json({message: "Please fill all the fields"}, {status: 400});
        }

        await prisma.question.create({
            data:{
                quizId: parseInt(quizId),
                text,
                options,
                answer,
            }
        })
        return NextResponse.json({message: "Created succesfully !!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}