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
                // Users with at least one order where isFree is true
                {
                    orders: {
                        some: {
                            isFree: true,
                        },
                    },
                },
            ],
        },
    });

    return NextResponse.json({ count });
}