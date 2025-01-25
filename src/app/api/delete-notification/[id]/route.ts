import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function DELETE(req: NextRequest) {
   try {
    const id = req.nextUrl.pathname.split("/")[3]
    await prisma.notifications.delete(
        {
            where: {
                id: Number(id)
            }
        }
    )
    return NextResponse.json({message: "Deleted succesfully !!"}, {status: 200});
   } catch (error) {
    return NextResponse.json({message : (error as Error).message}, {status: 400});
   }
}