"use client";

import { Nav, Navlink } from "@/components/NavBar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { HiMenu } from "react-icons/hi";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {/* for larger screens */}
      <div className="hidden lg:flex lg:flex-col">
        <Nav>
          <Navlink href="/users">Dashboard</Navlink>
          <Navlink href="/users/courses">My Courses</Navlink>
          <Navlink href="/users/announcements">Announcements</Navlink>
          <Navlink href="/users/profile">My profile</Navlink>
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
              <Navlink href="/users">Dashboard</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/users/courses">My Courses</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/users/announcements">Announcements</Navlink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Navlink href="/users/profile">My profile</Navlink>
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
