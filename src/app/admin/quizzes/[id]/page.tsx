"use client";

import React from 'react'
import { useParams } from 'next/navigation';

function QuizPage() {
    const params = useParams();
    const id = params.id;
  return (
    <div>
      hello {id} 
    </div>
  )
}

export default QuizPage
