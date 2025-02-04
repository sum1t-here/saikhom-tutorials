import { Card, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import useQuizQuestionStore from "@/store/useQuizQuestionStore";

function QuizQuestionForm({ quizId }: { quizId: string }) {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]); // Default 4 options
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const {addQuestion, loading, error: questionError} = useQuizQuestionStore();

  // Handle option input change
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!question || options.some((opt) => !opt) || !answer) {
        setError("Please fill all fields.");
        return;
    }

    try {
        await addQuestion( { quizId: Number(quizId), text: question, options, answer }, Number(quizId));
        if(!questionError){
            toast({
                title: "Success",
                description: "Question added successfully.",
            })
        }
        else {
            toast({
                title: "Error",
                description: questionError,
                variant: "destructive",
            })
        }
    } catch (error) {
        toast({
            title: "Error",
            description: (error as Error).message,
            variant: "destructive",
        })
        setError(questionError);
    } finally {
        setError(null);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-6 shadow-lg">
        <CardHeader className="text-xl font-semibold">Add a Question</CardHeader>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="question">Question</Label>
            <Input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the quiz question"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            {options.map((opt, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="answer">Correct Answer</Label>
            <Input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the correct answer"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Adding..." : "Add Question"}</Button>
        </form>
      </Card>
    </div>
  );
}

export default QuizQuestionForm;
