"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCourseStore from "@/store/useCourseStore";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

function Courses() {
  const { courses, fetchCourses, loading, error } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching courses</div>;
  }

  return (
    <div>
      <div className="min-h-screen sm:px-6 lg:px-8 w-full p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
            Discover Our Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="h-2 bg-blue-600"></div>
                <CardHeader className="bg-white">
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow bg-blue-50 p-6">
                  <p className="text-3xl font-bold text-blue-900">
                    ₹{course.price}
                  </p>
                </CardContent>
                <CardFooter className="bg-white">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
