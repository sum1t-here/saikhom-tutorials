import { NextResponse } from "next/server";
import  db from "@/db";

export async function GET() {
    const users = await db.user.findMany({
        include: {
            orders: {
                where:{
                    orderStatus: "PAID"
                },
                include: {
                    course: true
                }
            }
        },
        where: {
            role: "STUDENT",
        },
        orderBy: {
            id: "asc",
        }
    });

    return NextResponse.json(users);
}
