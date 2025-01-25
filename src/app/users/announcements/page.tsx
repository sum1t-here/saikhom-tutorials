"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from 'lucide-react';
import useNotificationStore from '@/store/useNotificationStore';

function Notifications() {
  const { notifications, fetchNotification, loading, error } = useNotificationStore();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotification();

    const intervalId = setInterval(fetchNotification, 60000);

    return () => clearInterval(intervalId);
  }, [fetchNotification]);

  // Display error message if there's an error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="my-6" />
        <ScrollArea className="h-[400px] rounded-md border p-4">
          {loading ? (
            // Show skeleton loader while loading
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : notifications.length > 0 ? (
            // Show notifications if they exist
            <div className="space-y-4">
              {notifications.map((notification) => (
                <Alert key={notification.id}>
                  <AlertDescription>{notification.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          ) : (
            // Show empty state if no notifications are found
            <p className="text-center text-muted-foreground">No notifications found.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default Notifications;