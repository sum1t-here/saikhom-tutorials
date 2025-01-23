"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCourseStore from "@/store/useCourseStore";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminTable() {
  const { courses, fetchCourses } = useCourseStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCourses(); // Fetch courses
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to fetch courses. Please try again later."); // Handle errors
        console.error(err);
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    loadData();
  }, [fetchCourses]);

  return (
    <div className="m-3">
      <div className="flex items-center justify-between shadow-md p-3 rounded-sm">
        <span className="sm:text-lg">Courses overview</span>
        <Link href={"/admin/courses/create-course"}>
          <Button className="bg-green-500 hover:bg-green-800">
            Create Course
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-5">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses.length > 0 && courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  {course.users?.map((user) => user.username).join(", ") || "No users"}
                </TableCell>
                <TableCell>{course.orders?.length || 0}</TableCell>
                <TableCell>{course.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}