"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from 'lucide-react';
import NotificationForm from '../_components/NotificationForm';
import useNotificationStore from '@/store/useNotificationStore';
import { Button } from '@/components/ui/button';

function Notifications() {
  const { notifications, fetchNotification, loading, error, deleteNotification } = useNotificationStore();

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotification();
  }, [fetchNotification]);
  
  const handleDelete = (id: number) => {
    deleteNotification(id);
  };

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
        <NotificationForm />
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
           
              notifications?.map((notification) => (
                <Alert key={notification?.id} className='mb-4 flex flex-row justify-between items-center'>
                  <AlertDescription>{notification?.message}</AlertDescription>
                  <Button onClick={() => handleDelete(notification.id) } variant="destructive">Delete</Button>
                </Alert>
              ))
         
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