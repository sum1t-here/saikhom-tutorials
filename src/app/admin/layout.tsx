"use client";

import { Nav, Navlink } from "@/components/NavBar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { HiMenu } from "react-icons/hi";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      {/* for larger screens */}
      <div className="hidden lg:flex lg:flex-col">
        <Nav>
          <Navlink href="/admin">Dashboard</Navlink>
          <Navlink href="/admin/courses">Courses</Navlink>
          <Navlink href="/admin/users">Users</Navlink>
          <Navlink href="/admin/orders">Orders</Navlink>
          <Navlink href="/admin/analytics">Analytics</Navlink>
          <Navlink href="/admin/quizzes">Quizzes</Navlink>
          <Navlink href="/admin/notifications">Notifications</Navlink>
        </Nav>
      </div>
      {/* for smaller and medium screens */}
      <div className="lg:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HiMenu className="ml-2 mt-3 w-8 h-12" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
              <Navlink href="/admin/orders">Orders</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/admin/analytics">Analytics</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/admin/quizzes">Quizzes</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/admin/notifications">Notifications</Navlink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center">
        <div className="container mt-8">{children}</div>
      </div>
    </>
  );
}
