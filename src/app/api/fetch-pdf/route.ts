import { NextResponse } from "next/server";
import prisma from "@/db"

export async function GET() {
    try {
        const pdfs = await prisma.pDF.findMany();

        if(!pdfs) {
            return NextResponse.json({message : "No pdf found"}, {status: 400});
        }
        return NextResponse.json(pdfs, {status: 200});
    } catch (error) {
        if(error instanceof Error) return NextResponse.json({message : error.message}, {status: 400});

        return NextResponse.json({message : "An unknown error occured"}, {status : 403});
    }
}