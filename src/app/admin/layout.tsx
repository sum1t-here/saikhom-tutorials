import { Nav, Navlink } from "@/components/NavBar";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Nav>
        <Navlink href="/admin">Dashboard</Navlink>
        <Navlink href="/admin/courses">Courses</Navlink>
        <Navlink href="/admin/users">Users</Navlink>
        <Navlink href="/admin/orders">Orders</Navlink>
        <Navlink href="/admin/analytics">Analytics</Navlink>
        <Navlink href="/admin/quizzes">Quizzes and Assesments</Navlink>
        <Navlink href="/admin/notifications">Notifications</Navlink>
      </Nav>
      <div className="flex justify-center">
        <div className="container mt-8">{children}</div>
      </div>
    </div>
  );
}
