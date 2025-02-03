"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import useQuizStore from "@/store/useQuizStore";
import { toast } from "@/hooks/use-toast";

function QuizForm() {
    const [title, setTitle] = useState<string|null>(null);
    const {addQuiz, loading, error} = useQuizStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleAddQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            toast({
                title: "Error",
                description: "Please enter a title",
                variant: "destructive",
            });
            return;
        }
        try {
            await addQuiz({
                title: title
            });
            toast({
                title: "Success",
                description: "Quiz created successfully",
            });
            setTitle("");
            if(inputRef.current) {
                inputRef.current.value = "";
            }
        } catch (error) {
            toast({
                title: "Error",
                description: (error as Error).message,
                variant: "destructive",
            });
        }
    }
  return (
    <div className="flex justify-center items-center  w-full px-4"> 
      <Card className="w-full max-w-2xl p-6 shadow-lg">
        <form className="flex flex-col gap-4" onSubmit={handleAddQuiz}>
          <CardHeader className="text-xl font-semibold">Create a quiz</CardHeader>
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="w-full" placeholder="Enter title" ref={inputRef} onChange={(e) => setTitle(e.target.value)}/>
          <Button type="submit" className="w-full">{loading ? "Creating..." : "Create"}</Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </Card>
    </div>
  );
}

export default QuizForm;
