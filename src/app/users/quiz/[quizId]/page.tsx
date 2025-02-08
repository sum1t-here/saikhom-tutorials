"use client";

import useQuizQuestionStore from '@/store/useQuizQuestionStore';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

function QuizPage() {
    const { fetchQuestions, questions, loading, error } = useQuizQuestionStore();
    const { toast } = useToast();
    const router = useRouter();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const params = useParams();
    const id = params.quizId;

    useEffect(() => {
        if (id && typeof id === 'string') {
            fetchQuestions(parseInt(id));
        }
    }, [id, fetchQuestions]);

    const handleOptionChange = (qindex: number, selectedText: string) => {
        setSelectedOptions((prev) => {
            const newSelections = [...prev];
            newSelections[qindex] = selectedText;
            return newSelections;
        });
    };

    const handleSubmit = async () => {
        
        

        if (!id) {
            toast({ variant: "destructive", title: "Quiz ID is missing" });
            return;
        }

        try {
            setLoadingSubmit(true);

            const authResponse = await axios.get("/api/user");

            if (!authResponse.data || !authResponse.data.userId) {
                toast({ variant: "destructive", title: "Failed to fetch valid user ID" });
                return;
            }

            const userId = parseInt(authResponse.data.userId, 10);
            if (isNaN(userId)) {
                toast({ variant: "destructive", title: "Invalid user ID received" });
                return;
            }

            const payload = {
                userId,
                quizId: id,
                answers: selectedOptions.filter(Boolean),
            };

            console.log("Sending Data", payload);

            await axios.post("/api/quiz/submitQuiz", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast({ title: "Quiz submitted successfully!"});

            setTimeout(() => {
                router.push("/users");
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
                toast({ variant: "destructive", title: "Error submitting quiz", description: error.response.data.error });
            } else {
                toast({ variant: "destructive", title: "Error submitting quiz", description: "Something went wrong" });
            }
        } finally {
            setLoadingSubmit(false);
        }
    };

    if(loading){
        return(<div className='flex justify-center items-center'><Loader className='animate-spin'/></div>);
    }

    if(error){
        return(<div className='flex justify-center items-center'><h1 className='text-red-500'>{error}</h1></div>);
    }

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                {questions.length > 0 && (
                    <ol>
                        {questions.map((question, qindex) => (
                            <li key={qindex}>
                                <h2>{question.text}</h2>
                                <ul>
                                    {question.options.map((option, oindex) => (
                                        <li key={oindex} className="block mb-2">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`question-${question.id}`}
                                                    value={option}
                                                    className="mr-2"
                                                    checked={selectedOptions[qindex] === option}
                                                    onChange={() => handleOptionChange(qindex, option)}
                                                />
                                                <span className="font-medium">
                                                    ({String.fromCharCode(97 + oindex)}) {option}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>
                )}
                <Button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded" disabled={loadingSubmit}>{loadingSubmit ? "Submitting..." : "Submit"}</Button>
            </form>
        </div>
    );
}

export default QuizPage;
