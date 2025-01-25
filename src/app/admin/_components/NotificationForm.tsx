"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import useNotificationStore from '@/store/useNotificationStore';

function NotificationForm() {
    const [message, setMessage] = useState("");
    const {addNotification,loading} = useNotificationStore();
   

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addNotification(message);
        setMessage("");
    }

  return (
    <div className="flex flex-col gap-2 p-4">
        <form onSubmit={handleSend} className="flex flex-col gap-2">
        <Textarea placeholder="Message" value={message} 
        onChange={(e) => setMessage(e.target.value)} 
        className="w-full" />
        <div className="flex justify-end">
            <Button type="submit" disabled={loading}>{loading ? "Sending..." : "Send"}</Button>
        </div>
        </form>
    </div>
  )
}

export default NotificationForm;
