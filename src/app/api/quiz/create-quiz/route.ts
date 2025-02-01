import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const {title} = await req.json();

    if(!title){
        return NextResponse.json({message: "Please fill all the fields"}, {status: 400});
    }

    await prisma.quiz.create({
        data:{
            title,
        }
    })
    return NextResponse.json({message: "Created succesfully !!"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: (error as Error).message}, {status: 500});
    }
}   