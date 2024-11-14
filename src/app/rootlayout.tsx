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

export default function Rootlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* for larger screens */}
      <div className="hidden lg:flex lg:flex-col">
        <Nav className="justify-between flex items-center h-20">
          <div>
            <span>Saikhom Tutors</span>
          </div>
          <div>
            <Navlink href="/all-courses">All Courses</Navlink>
          </div>
          <div className="flex gap-4">
            <Button>Login</Button>
            <Button>Register</Button>
          </div>
        </Nav>
      </div>
      {/* for smaller and medium screens */}
      <div className="lg:hidden flex items-center">
        <DropdownMenu>
          <div className="flex flex-row justify-center items-center gap-4">
            <div>
              <DropdownMenuTrigger>
                <HiMenu className="ml-2 mt-3 w-8 h-12" />
              </DropdownMenuTrigger>
            </div>
            <div className="flex flex-row justify-center items-center gap-4">
              <span>Saikhom Tutors</span>
              <div className="flex gap-4">
                <Button>Login</Button>
                <Button>Register</Button>
              </div>
            </div>
          </div>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Navlink href="/all-courses">All Courses</Navlink>
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
