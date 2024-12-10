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
import Link from "next/link";
import { useEffect } from "react";

export default function AdminTable() {
  const { courses, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="m-3 ">
      <div className="flex items-center justify-between shadow-md p-3 rounded-sm">
        <span className="sm:text-lg">Courses overview</span>
        <Link href={"/admin/courses/create-course"}>
          <Button className="bg-green-500 hover:bg-green-800">
            Create Course
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.category}</TableCell>
              <TableCell>{course.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
