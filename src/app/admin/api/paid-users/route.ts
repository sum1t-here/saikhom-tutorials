import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const count = await db.user.count({
        where: {
            role: "STUDENT",
            orders: {
                some: {
                    isFree: false
                }
            }
        }
    })

    return NextResponse.json({ count });
}
