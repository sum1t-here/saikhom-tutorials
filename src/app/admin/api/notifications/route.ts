import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {message} = await req.json();
  if (!message) {
    return NextResponse.json({ message: 'Notification not sent', status: 400 });
  }

  const notification = await db.notifications.create({
    data: {
      message: message,
    },
  });

  return NextResponse.json({ notification, message: 'Notification sent', status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, status: 500 });
    }
    return NextResponse.json({ message: 'Notification not sent', status: 500 });
  }
  
}