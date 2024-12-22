"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useLectureStore from "@/store/useLectureStore";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactPlayer from "react-player";

const CourseDetailsPage = () => {
  const { courseId } = useParams(); // Extract courseId from route
  const router = useRouter();

  const courseIdStr = Array.isArray(courseId) ? courseId[0] : courseId;

  const {
    studyMaterials,
    loading,
    error,
    fetchStudyMaterials,
    deleteStudyMaterial,
  } = useLectureStore();

  useEffect(() => {
    if (courseIdStr) {
      fetchStudyMaterials(parseInt(courseIdStr));
    }
  }, [courseIdStr, fetchStudyMaterials]);

  const handleDelete = (courseId: number, lectureId: number) => {
    if (courseId) {
      deleteStudyMaterial(courseId, lectureId);
    }
  };

  const handleAddLecture = () => {
    router.push(`/admin/courses/${courseIdStr}/add-lecture`);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Course Materials</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleAddLecture}
        >
          Add Lecture
        </Button>
      </div>

      {loading && (
        <p className="text-center text-gray-500">Loading study materials...</p>
      )}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {!loading && !error && studyMaterials.length === 0 && (
        <p className="text-center text-gray-700">
          No study materials available for this course.
        </p>
      )}

      {!loading && studyMaterials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {studyMaterials.map((material) => (
            <Card
              key={material.id}
              className="shadow-lg border border-gray-200"
            >
              <CardContent>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {material.title}
                  </h2>
                </div>
                <div className="relative w-full aspect-video group">
                  {/* Video Player */}
                  <ReactPlayer
                    url={material.url}
                    controls
                    width="100%"
                    height="100%"
                    config={{
                      file: { attributes: { controlsList: "nodownload" } },
                    }}
                    onContextMenu={(e: React.MouseEvent) => e.preventDefault()} // Disable right-click
                    className="rounded-md"
                  />
                </div>
                <Button
                  onClick={() =>
                    courseIdStr &&
                    handleDelete(parseInt(courseIdStr), material.id)
                  }
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
