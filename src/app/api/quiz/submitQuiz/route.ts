import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        // console.log("Received Request Body:", req.body); // Debugging

        const body = await req.json();
        // console.log("Parsed Body:", body); // Debugging

        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Invalid or missing JSON payload" }, { status: 400 });
        }

        const { userId, quizId, answers } = body;

        const parsedUserId = Number(userId);
        const parsedQuizId = Number(quizId);

        if (isNaN(parsedUserId) || isNaN(parsedQuizId)) {
            return NextResponse.json({ error: "Invalid userId or quizId" }, { status: 400 });
        }

        const existingResult = await prisma.userQuizResult.findFirst({
            where: { userId: parsedUserId, quizId: parsedQuizId },
        });

        if (existingResult) {
            return NextResponse.json({ error: "You have already participated in the quiz" }, { status: 400 });
        }

        // Fetch quiz and calculate score
        const quiz = await prisma.quiz.findUnique({
            where: { id: parsedQuizId },
            include: { questions: true },
        });

        if (!quiz || !quiz.questions || quiz.questions.length === 0) {
            return NextResponse.json({ error: "Quiz Not Found or has no questions" }, { status: 404 });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            const userAnswer = answers[index]?.trim()?.toLowerCase() || "";
            const correctAnswer = question.answer?.trim()?.toLowerCase() || "";

            if (userAnswer && userAnswer === correctAnswer) {
                score++;
            }
            // console.log("Checking:", { index, userAnswer, correctAnswer });
        });

        const submission = await prisma.userQuizResult.create({
            data: {
                userId: parsedUserId,
                quizId: parsedQuizId,
                score,
                status: "PARTICIPATED",
            },
        });

        return NextResponse.json({ message: "Quiz submitted successfully", submission }, { status: 201 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
