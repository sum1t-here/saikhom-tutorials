"use client";

import { Nav, Navlink } from "@/components/NavBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiMenu } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route

  // Determine if the header should be shown (only show on `/`)
  const showHeader = pathname === "/";

  return (
    <>
      {/* Conditional Header */}
      {showHeader && (
        <header>
          {/* Navbar for larger screens */}
          <div className="hidden lg:flex items-center justify-between h-20 px-8 bg-white shadow-md">
            <div className="text-xl font-bold">Saikhom Tutors</div>
            <nav>
              <Nav className="flex gap-6">
                <Navlink href="/users/courses">All Courses</Navlink>
              </Nav>
            </nav>
            <div>
              <Link href="/login-user">
                <Button>Login / Register</Button>
              </Link>
            </div>
          </div>

          {/* Navbar for smaller screens */}
          <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white shadow-md">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HiMenu className="w-8 h-8" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Navlink href="/users/courses">All Courses</Navlink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-xl font-bold">Saikhom Tutors</span>
            <Link href="/login-user">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>{children}</main>
    </>
  );
}
