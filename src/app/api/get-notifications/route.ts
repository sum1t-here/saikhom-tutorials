import  db  from '@/db';
import { NextResponse } from 'next/server';

export async function GET() {
    const notifications = await db.notifications.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return NextResponse.json(notifications);
}