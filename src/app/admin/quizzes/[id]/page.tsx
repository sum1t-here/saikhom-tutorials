"use client";

import React from 'react'
import { useParams } from 'next/navigation';
import QuizQuestionForm from '../../_components/QuizQuestionForm';
import QuestionsFetch from '../../_components/QuestionsFetch';

function QuizPage() {
    const params = useParams();
    const id = params.id;
    
    if (!id || Array.isArray(id)) {
        return <div className="h-screen flex items-center justify-center">Invalid Quiz ID</div>;
    }
    
    return (
        <div className="space-y-6">
            <QuizQuestionForm quizId={id}/>
            <QuestionsFetch quizId={id}/>
        </div>
    );
}

export default QuizPage
