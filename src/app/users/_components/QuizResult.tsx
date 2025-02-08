"use client";

import useUserStore from '@/store/useUserStore';
import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function QuizResult({ userId }: { userId: number }) {
    const { fetchUserData, loading, error, quizResults } = useUserStore();

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        }
    }, [userId, fetchUserData]);

    console.log("Quiz Results:", quizResults);

    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8">
                Quiz Performance
            </h1>

            {loading && <p className="text-center text-gray-500">Loading quiz results...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {quizResults.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table className="w-full border border-gray-300 shadow-lg rounded-lg">
                        <TableHeader className="text-white">
                            <TableRow>
                                <TableHead className="px-4 py-2 text-left">Quiz Title</TableHead>
                                <TableHead className="px-4 py-2 text-center">Score</TableHead>
                                <TableHead className="px-4 py-2 text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quizResults.map((result, index) => (
                                <TableRow key={index} className="border-b hover:bg-gray-100">
                                    <TableCell className="px-4 py-2">{result?.quiz?.title || "Untitled Quiz"}</TableCell>
                                    <TableCell className="px-4 py-2 text-center font-semibold">{result?.score}</TableCell>
                                    <TableCell className="px-4 py-2 text-center">{result?.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center text-gray-600 mt-4">Participate in a quiz to see your results!</p>
            )}
        </div>
    );
}

export default QuizResult;
