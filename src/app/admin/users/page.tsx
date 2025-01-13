"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Order {
    course: {
        id: string;
        title: string;
    }
}

interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    phone: string;
    orders: Order[];
}

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const componentRef = useRef(null);

    const reactToPrintContent = () => {
        return componentRef.current;
    }

    const handlePrint = useReactToPrint({
        documentTitle: "Users List",
    })
    

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get("/admin/api/fetch-user");
            setUsers(response.data);
            setLoading(false);
        }
        fetchUsers();
    }, [])

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader className="animate-spin" />
                </div>
            ) : (
                <div className="overflow-x-auto" ref={componentRef}>
                    <h1 className="text-2xl font-bold">List of Users</h1>
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Fullname</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Courses</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>
                                        {user.orders.map((order: Order) => order.course.title).join(", ")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={5} className="text-right">
                                    <Button onClick={() => handlePrint(reactToPrintContent)}>Print</Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default Users;