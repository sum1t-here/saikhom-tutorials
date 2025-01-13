import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const count = await db.user.count({
        where: {
            orders: {
                some: {
                    isFree: false
                }
            }
        }
    })

    return NextResponse.json({ count });
}