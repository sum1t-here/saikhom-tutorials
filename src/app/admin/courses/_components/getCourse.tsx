"use client";

import { useEffect } from "react";
import Loader from "../loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/store/useCourseStore";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GetCourses() {
  const { courses, fetchCourses, deleteCourses, loading, error } =
    useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error}</>;
  }

  const handleDelete = (id: string) => {
    deleteCourses(id);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap gap-3">
      {courses.map((course) => (
        <Card key={course.id} className="p-3">
          <CardHeader>
            <CardTitle>{course.category}</CardTitle>
            <CardDescription>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div>
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={`${course.title} thumbnail`}
                  width={300}
                  height={100}
                />
              ) : (
                <div>No Thumbnail Available</div> // You can render a custom message or leave it empty
              )}
            </div>
            <p>Price: ₹{course.price}</p>
            <div className="mt-3 flex justify-between items-center gap-5">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-base">
                Add Lectures
              </Button>
              <Button
                onClick={() => handleDelete(course.id)}
                className="w-full bg-destructive hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
