import { headers } from "next/headers";
import React from "react";
import prisma from "@/db";

async function Profile() {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="text-blue-200 mt-2">
              View and manage your profile details
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Username
                </h2>
                <p className="text-lg font-medium text-gray-900">
                  {user.username}
                </p>
              </div>

              {/* Name */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Name
                </h2>
                <p className="text-lg font-medium text-gray-900">{user.name}</p>
              </div>

              {/* Email */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Email
                </h2>
                <p className="text-lg font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Phone
                </h2>
                <p className="text-lg font-medium text-gray-900">
                  {user.phone}
                </p>
              </div>

              {/* Role */}
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Role
                </h2>
                <p className="text-lg font-medium text-gray-900">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
