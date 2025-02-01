import { create } from "zustand";
import axios from "axios";

type Quiz = {
    id: number;
    title: string;
    status: string;
}

type QuizStore = {
    quizzes: Quiz[];
    fetchQuizzes: () => Promise<void>;
    addQuiz: (quiz: Quiz) => Promise<void>;
    deleteQuiz: (id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const useQuizStore = create<QuizStore>((set) => ({
    quizzes: [],
    loading: false,
    error: null,

    fetchQuizzes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get("/api/get-quiz");
            set({ quizzes: response.data, loading: false });
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    addQuiz: async (quiz: Quiz) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post("/api/add-quiz", quiz);
            set((state) => ({ quizzes: [...state.quizzes, response.data], loading: false }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
    deleteQuiz: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/quiz/${id}`);
            set((state) => ({
                quizzes: state.quizzes.filter((quiz) => quiz.id !== id),
                loading: false
            }));
        } catch (error) {
            set({ error: (error as Error).message, loading: false });
        }
    },
}));

export default useQuizStore;