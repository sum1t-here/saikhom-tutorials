"use client";

import React, { useEffect } from 'react'
import  useQuizStore  from '@/store/useQuizStore';
import { Loader } from 'lucide-react';
import Link from 'next/link';
    
function QuizFetch() {
  const {fetchQuizzes, deleteQuiz, loading, error, quizzes} = useQuizStore();

  useEffect(() => {
    async function fetchData() {
      await fetchQuizzes();
    }
    fetchData();
  }, [fetchQuizzes]);

  if (loading) return <div className="flex justify-center items-center"><Loader className="animate-spin" /></div>;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {quizzes.map((quiz, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <div>
            <h3 className="font-medium">{quiz.title}</h3>
            <p className="text-sm text-gray-500">Status: {quiz.status}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/admin/quizzes/${quiz.id}`}>
            <button
              
              className="px-4 py-2  hover:bg-green-500 rounded-md"
            >
              Add Questions
            </button>
            </Link>
            <button
              onClick={() => deleteQuiz(quiz.id)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {quizzes.length === 0 && !loading && !error && (
        <p className="text-gray-500">No quizzes found</p>
      )}
    </div>
  )
}

export default QuizFetch; 
