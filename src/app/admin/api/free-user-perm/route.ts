import db from "@/db";
import { NextResponse } from "next/server";

interface UserPerMonth {
    month: string; // Format: "YYYY-MM"
    count: number;
}

export async function GET() {
    try {
        // Fetch users grouped by month
        const usersPerMonth = await db.user.groupBy({
            by: ['createdAt'], // Group by createdAt
            where: {
                role: "STUDENT",
                OR: [
                    // Users with no orders
                    { orders: { none: {} } },
                    // Users with at least one order where isFree is true
                    { orders: { some: { isFree: true } } },
                ],
            },
            _count: {
                id: true, // Count the number of users in each group
            },
            orderBy: {
                createdAt: 'asc', // Order by createdAt
            },
        });

        // Format the results to group by month
                const formattedResults = usersPerMonth.reduce<Record<string, number>>((acc, group) => {
                    const month = group.createdAt.toISOString().slice(0, 7); // Extract year and month (e.g., "2023-10")
                    acc[month] = (acc[month] || 0) + group._count.id; // Sum the counts for the same month
                    return acc;
                }, {});

                // Convert the formatted results into an array
                const resultArray: UserPerMonth[] = Object.entries(formattedResults).map(([month, count]) => ({
                    month,
                    count,
                }));

                return NextResponse.json({ usersPerMonth: resultArray });
            } catch (error) {
                console.error("Error fetching users per month:", error);
                return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
            }
}
