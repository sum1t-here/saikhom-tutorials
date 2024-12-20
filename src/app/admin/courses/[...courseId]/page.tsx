"use client";

import { Button } from "@/components/ui/button";
import useLectureStore from "@/store/useLectureStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CourseDetailsPage = () => {
  const { courseId } = useParams(); // Extract courseId from route

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

  return (
    <div>
      <h1>Course Details</h1>
      <p>Course ID: {courseIdStr}</p>

      {loading && <p>Loading study materials....</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && studyMaterials.length === 0 && (
        <p>No study materials available for this course.</p>
      )}
      {!loading && studyMaterials.length > 0 && (
        <ul>
          {studyMaterials.map((material) => (
            <li key={material.id}>
              <strong>{material.title}</strong> ({material.type}) -{" "}
              <a href={material.url} target="_blank" rel="noopener noreferrer">
                View
              </a>
              <Button
                onClick={() =>
                  courseIdStr &&
                  handleDelete(parseInt(courseIdStr), material.id)
                }
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseDetailsPage;
