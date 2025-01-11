"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { ChevronRight, PlayCircle } from "lucide-react";
import useLectureStore from "@/store/useLectureStore";
import { useParams } from "next/navigation";
import ReactPlayer from "react-player";
import { StudyMaterial } from "@/store/useLectureStore";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { studyMaterials, loading, error, fetchStudyMaterials } =
    useLectureStore();
  const [activeLesson, setActiveLesson] = useState<StudyMaterial | null>(null);

  // Fetch study materials when the component mounts or courseId changes
  useEffect(() => {
    if (courseId) {
      fetchStudyMaterials(parseInt(courseId as string));
    }
  }, [courseId, fetchStudyMaterials]);

  // Set the active lesson to the first study material when data is loaded
  useEffect(() => {
    if (studyMaterials.length > 0 && !activeLesson) {
      setActiveLesson(studyMaterials[0]);
    }
  }, [studyMaterials, activeLesson]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading study materials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!studyMaterials || studyMaterials.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        No study materials available for this course.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="aspect-w-16 aspect-h-9 bg-gray-800 min-h-[500px]">
                  {activeLesson && activeLesson.type === "VIDEO" ? (
                    <ReactPlayer
                      url={activeLesson.url}
                      controls
                      width="100%"
                      height="500px"
                      config={{
                        file: { attributes: { controlsList: "nodownload" } },
                      }}
                      onContextMenu={(e: React.MouseEvent) =>
                        e.preventDefault()
                      }
                      className="rounded-md"
                    />
                  ) : (
                    <div className="flex justify-center items-center h-full text-white">
                      No video available for this lesson.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-blue-900">
                  {activeLesson?.title || "No Lesson Selected"}
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Lesson{" "}
                  {activeLesson
                    ? studyMaterials.findIndex(
                        (material) => material.id === activeLesson.id
                      ) + 1
                    : "N/A"}{" "}
                  of {studyMaterials.length}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-blue-900">
                  Course Lessons
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Select a lesson to start learning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mt-6">
                  {studyMaterials.map((lesson) => (
                    <Button
                      key={lesson.id}
                      variant={
                        lesson.id === activeLesson?.id ? "secondary" : "ghost"
                      }
                      className="w-full justify-start text-left"
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      <span className="flex-grow">{lesson.title}</span>
                      {lesson.id === activeLesson?.id && (
                        <ChevronRight className="w-4 h-4 ml-2" />
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
