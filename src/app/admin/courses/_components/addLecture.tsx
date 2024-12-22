"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLectureStore from "@/store/useLectureStore";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AddLectureForm() {
  const router = useRouter();
  const { addStudyMaterial, loading, error } = useLectureStore();
  const [newLecture, setNewLecture] = useState({
    title: "",
    video: null as File | null,
  });

  const { courseId } = useParams();
  const courseIdStr = Array.isArray(courseId) ? courseId[0] : courseId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newLecture.title);
    if (newLecture.video) {
      formData.append("video", newLecture.video);
    }
    if (courseIdStr) {
      await addStudyMaterial(parseInt(courseIdStr), formData);
      alert("Lecture added successfully!");
      setNewLecture({
        title: "",
        video: null,
      });
    } else {
      alert("Course ID is missing.");
    }
    alert("Lecture added successfully!");
    setNewLecture({
      title: "",
      video: null,
    });

    router.push(`/admin/courses/${courseIdStr}`);
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader className="text-2xl font-semibold text-center mb-4">
          Add Lecture
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter lecture title"
              value={newLecture.title}
              onChange={(e) =>
                setNewLecture({ ...newLecture, title: e.target.value })
              }
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Video Input */}
          <div className="flex flex-col space-y-2">
            <Label
              htmlFor="video"
              className="text-sm font-medium text-gray-700"
            >
              Upload Video
            </Label>
            <Input
              id="video"
              type="file"
              accept="video/*"
              onChange={(e) =>
                setNewLecture({
                  ...newLecture,
                  video: e.target.files ? e.target.files[0] : null,
                })
              }
              className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Lecture"}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>
    </form>
  );
}
