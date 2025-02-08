import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function GET(req: NextRequest) {
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

    const order = await prisma.order.findMany({
        where: {
            userId: parseInt(userId),
            isFree: false,
        }
    })

    return NextResponse.json({ hasPaidOrder: order.length > 0 });

   } catch (error) {
    return NextResponse.json({error: (error as Error).message}, {status: 500});
   }

}