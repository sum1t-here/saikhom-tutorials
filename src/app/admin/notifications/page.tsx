"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from 'lucide-react';
import NotificationForm from '../_components/NotificationForm';

interface Notification {
  id: number;
  message: string;
}

function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/get-notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotifications();

      // Set up polling (e.g., every 5 seconds)
      const intervalId = setInterval(fetchNotifications, 5000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
  }, []); 

  return (
    <Card className="w-full max-w-3xl mx-auto min-h-screen">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <NotificationForm />
        <Separator className="my-6" />
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Alert key={notification.id}>
                  <AlertDescription>{notification.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No notifications found.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default Notifications;

