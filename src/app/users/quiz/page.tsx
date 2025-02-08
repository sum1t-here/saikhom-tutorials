"use client";

import { Button } from '@/components/ui/button';
import useQuizStore from '@/store/useQuizStore';
import Link from 'next/link';
import React, { useEffect } from 'react'

function Quiz() {
    const {fetchQuizzes, loading, error, quizzes} = useQuizStore();

    useEffect( () => {
        async function fetchQuizData() {
            await fetchQuizzes();
        }
        fetchQuizData();
    }, [fetchQuizzes])

  return (
    <div className='max-[w-4xl]'>
        {quizzes.length === 0 && !loading && !error && (
            <p className="text-gray-500">No quizzes found</p>
        )}
        {quizzes.map((quiz, index) => (
        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-3">
          <div>
            <h3 className="font-medium">{quiz.title}</h3>
            <p className="text-sm text-gray-500">Status: {quiz.status}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/users/quiz/${quiz.id}`}>
            <Button
              
              className="px-4 py-2  hover:bg-green-500 rounded-md"
            >
              View Quiz
            </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Quiz;
