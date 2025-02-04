"use client";

import React, { useEffect } from 'react'
import  useQuizQuestionStore  from '@/store/useQuizQuestionStore'
import { Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";

function QuestionsFetch({ quizId }: { quizId: string }) {
    const { questions, fetchQuestions, deleteQuestion, loading, error} = useQuizQuestionStore();
    useEffect(() => {
        fetchQuestions(Number(quizId));
    }, [quizId]);   
    console.log(questions);

    const handleDeleteQuestion = (id: number) => {
        deleteQuestion(id, Number(quizId));
    }
  return (
    <div>
        {loading && <div className="flex justify-center items-center"><Loader className="animate-spin" /></div>}
        {error && <div className="text-red-500 text-center p-4">{error}</div>}
        <div>
            {questions && questions.map((question, index) => (
                <div key={index} className="border p-4 mb-4">
                    <h3 className="text-lg font-semibold">{question.text}</h3>
                    <p>Options: {Array.isArray(question.options) ? question.options.join(", ") : "No options available"}</p>
                    <p>Answer: {question.answer}</p>
                    <Button onClick={() => handleDeleteQuestion(question.id)} variant={"destructive"} className="mt-4 hover:bg-red-500/80">Delete</Button>
                </div>
            ))}

            {!questions.length && <div className="text-center p-4">No questions found</div>}
        </div>
    </div>
  )
}

export default QuestionsFetch
