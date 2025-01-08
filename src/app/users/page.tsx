import { headers } from "next/headers";
import prisma from "@/db";
import MyCourseCard from "./courses/_components/MyCourseCard";
export default async function UserDashboard() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600">
            Unauthorized Access
          </h1>
          <p className="mt-2 text-gray-600">
            You are not authorized to access this page.
          </p>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">
              Welcome to Your Learning Dashboard
            </h1>
            <p className="text-lg text-gray-600">{user?.username}</p>
          </div>
        </header>
        <MyCourseCard userId={parseInt(userId)} />
      </div>
    </div>
  );
}
