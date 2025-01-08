"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  //   CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MyCourseCardProps {
  userId: number;
}

interface Course {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
  };
}

function MyCourseCard({ userId }: MyCourseCardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const fetchCourses = async () => {
        const response = await axios.get("/api/get-purchased-course", {
          headers: {
            "x-user-id": userId,
          },
        });
        setCourses(response.data);
      };
      fetchCourses();
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message || "An error occurred");
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
    }
  }, [userId]);

  console.log(courses);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen sm:px-6 lg:px-8 w-full p-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
            My Purchased Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((item, index) => (
              <Card
                key={index}
                className="flex flex-col overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Image
                  src={item.course.thumbnail} // Access the course thumbnail
                  alt={item.course.title} // Access the course title
                  width={500}
                  height={500}
                  className="w-full h-40 object-cover"
                />
                <div className="h-2 bg-blue-600"></div>
                <CardHeader className="bg-white">
                  <CardTitle className="text-2xl font-bold text-blue-900">
                    {item.course.title}
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    {item.course.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="bg-white">
                  <Button
                    onClick={() => {
                      router.push(
                        `/users/courses/watch-lecture/${item.course.id}`
                      );
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Watch Lectures
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

export default MyCourseCard;
