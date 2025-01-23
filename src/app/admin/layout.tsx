"use client";

import { Nav, Navlink } from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";
export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout-user", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/");
    }
  };
  return (
    <>
      {/* for larger screens */}
      <div className="hidden lg:flex lg:flex-row lg:justify-between lg:items-center lg:w-full">
        <div></div>
        <Nav>
          <Navlink href="/admin">Dashboard</Navlink>
          <Navlink href="/admin/courses">Courses</Navlink>
          <Navlink href="/admin/users">Users</Navlink>
          <Navlink href="/admin/quizzes">Quizzes</Navlink>
          <Navlink href="/admin/notifications">Notifications</Navlink>
          <Navlink href="/admin/pdf">PDF</Navlink>
        </Nav>
        <div>
          <Button onClick={handleLogout} variant="destructive" className="mx-3">
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
            <div className="flex flex-col items-center">
              <DropdownMenuItem>
                <Navlink href="/admin">Dashboard</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/admin/courses">Courses</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/admin/users">Users</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/admin/quizzes">Quizzes</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/admin/notifications">Notifications</Navlink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Navlink href="/admin/pdf">PDF</Navlink>              
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handleLogout} variant="destructive">
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
