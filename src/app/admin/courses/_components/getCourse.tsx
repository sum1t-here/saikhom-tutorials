"use client";

import { useEffect } from "react";
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
import Link from "next/link";
import { Loader } from "lucide-react";

export default function GetCourses() {
  const { courses, fetchCourses, deleteCourses, loading, error } =
    useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" /></div>;
  }

  if (error) {
    return <>{error}</>;
  }

  const handleDelete = (id: string) => {
    deleteCourses(id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {courses.map((course) => (
        <Card
          key={course.id}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              {course.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {course.category}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={`${course.title} thumbnail`}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                  No Thumbnail Available
                </div>
              )}
            </div>
            <p className="text-gray-700 mb-4">{course.description}</p>
            <p className="text-lg font-bold text-gray-900 mb-4">
              Price: ₹{course.price}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href={`/admin/courses/${course.id}`} className="flex-1">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  View
                </Button>
              </Link>
              <Button
                onClick={() => handleDelete(course.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
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
