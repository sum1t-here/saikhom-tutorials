import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const count = await db.user.count({
        where: {
            role: "STUDENT",
            OR: [
                // Users with no orders
                {
                    orders: {
                        none: {}, // No orders exist
                    },
                },
                // Users whose none other isFree: false
                {
                    orders: {
                        none: {
                            isFree: false,
                        },
                    },
                },
            ],
        },
    });

    return NextResponse.json({ count });
}