"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLectureForm() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const courseId = useParams().courseId;

  const handleAddLecture = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/admin/api/${courseId}/add-lecture`, { title, videoUrl });
      if (response.status === 201) {
        toast({
          title: "Lecture added successfully",
        });
      }
      setIsLoading(false);
      router.push(`/admin/courses/${courseId}`);
    } catch (error) {
      setIsLoading(false);
      if(error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        })
      }
      toast({
        title: "Failed to add lecture",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Add Lecture</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          <Input
            type="text"
            placeholder="Video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full"
          />
          <Button disabled={isLoading} onClick={handleAddLecture} className="w-full">
            {isLoading ? "Adding Lecture..." : "Add Lecture"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}