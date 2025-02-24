"use client";

import { Nav, Navlink } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import React from "react";
import { HiMenu } from "react-icons/hi";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const handleLogout = async () => {
    // delete the token
    const response = await fetch("/api/logout-user", {
      method: "POST",
    });
    if (response.ok) {
      // redirect to home page
      router.push("/");
    }
  };
  return (
    <>
      {/* for larger screens */}
      <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center px-4">
        <div></div>
        <Nav>
          <Navlink href="/users">Dashboard</Navlink>
          <Navlink href="/users/courses">All Courses</Navlink>
          <Navlink href="/users/solve">Solve Doubts</Navlink>
          <Navlink href="/users/announcements">Announcements</Navlink>
          <Navlink href="/users/quiz">Quiz</Navlink>
          <Navlink href="/users/profile">My profile</Navlink>
        </Nav>
        <div>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {/* for smaller and medium screens */}
      <div className="lg:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HiMenu className="ml-2 mt-3 w-8 h-12" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col justify-center items-center">
              <DropdownMenuItem>
                <Navlink href="/users">Dashboard</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/users/courses">All Courses</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/users/solve">Solve Doubts</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/users/announcements">Announcements</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/users/profile">My profile</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/users/quiz">Quiz</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="destructive" onClick={handleLogout}>
                  Logout
                </Button>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center">
        <div className="container mt-8">{children}</div>
      </div>
    </>
  );
}
