import React from "react";
import CourseCard from "./_components/CourseCard";
import { headers } from "next/headers";

async function Course() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) {
    return (
      <div className="p-4">
        <p>Unauthorized access</p>
      </div>
    );
  }

  return (
    <div>
      <CourseCard userId={parseInt(userId)} />
    </div>
  );
}

export default Course;
