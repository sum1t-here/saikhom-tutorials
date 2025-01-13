"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

function NotificationForm() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("/admin/api/notifications", {
            message: message
        }).then((res) => {
            if (res.status === 200) {
                toast({
                    title: "Notification sent",
                    description: "Notification sent successfully",
                    variant: "default",
                });
            } else {
                toast({
                    title: "Notification not sent",
                    description: "Notification not sent",
                    variant: "destructive",
                });
            }
        }).catch((err) => {
            console.log(err);
        }); 
        setMessage("");
        setLoading(false);
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
