"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useCourseStore from "@/store/useCourseStore";
import { redirect } from "next/navigation";

import React, { useState } from "react";

export default function AddCourse() {
  const { addNewCourse, loading, error } = useCourseStore();
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    thumbnail: null as File | null, // Adjust type
    price: "",
    category: "",
    subject: "",
  });
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newCourse.title);
    formData.append("description", newCourse.description);
    if (newCourse.thumbnail) {
      formData.append("thumbnail", newCourse.thumbnail); // Add file
    }
    formData.append("price", newCourse.price.toString());
    formData.append("category", newCourse.category);
    formData.append("subject", newCourse.subject);

    await addNewCourse(formData); // Pass FormData
    toast({
      title: "Course added Successfully"
    })
    setNewCourse({
      title: "",
      description: "",
      thumbnail: null, // Reset to null
      price: "",
      category: "",
      subject: "",
    });

    // Clear the file input element
    const fileInput = document.querySelector(
      'input[name="thumbnail"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Clear the file input value
    }

    redirect("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <Card className="flex flex-col justify-center items-center">
        <CardHeader>Add New Course</CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Label>
            Title:
            <Input
              type="text"
              placeholder="Enter course title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
              required
            />
          </Label>

          <Label>
            Description:
            <Textarea
              placeholder="Enter course description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
              required
              rows={4}
            />
          </Label>

          <Label>
            Thumbnail:
            <Input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setNewCourse({ ...newCourse, thumbnail: e.target.files[0] }); // Assign File
                }
              }}
              required
            />
          </Label>

          <Label>
            Price:
            <Input
              type="number"
              placeholder="Enter course price"
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  price: e.target.value,
                })
              }
              required
            />
          </Label>

          <Label>
            Category:
            <Input
              type="text"
              placeholder="Enter category"
              value={newCourse.category}
              onChange={(e) =>
                setNewCourse({ ...newCourse, category: e.target.value })
              }
              required
            />
          </Label>

          <Label>
            Subject:
            <Input
              type="text"
              placeholder="Enter subject"
              value={newCourse.subject}
              onChange={(e) =>
                setNewCourse({ ...newCourse, subject: e.target.value })
              }
              required
            />
          </Label>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Course"}
          </Button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </CardContent>
      </Card>
    </form>
  );
}
