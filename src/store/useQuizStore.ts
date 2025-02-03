import { create } from "zustand";
import axios from "axios";

type Quiz = {
    id: number;
    title: string;
    status: string;
};

type QuizStore = {
    quizzes: Quiz[];
    fetchQuizzes: () => Promise<void>;
    addQuiz: (quiz: Omit<Quiz, "id" | "status">) => Promise<void>; // Accept quiz without ID since the backend will generate it
    deleteQuiz: (id: number) => Promise<void>;
    loading: boolean;
    error: string | null;
};

const useQuizStore = create<QuizStore>((set, get) => ({
    quizzes: [],
    loading: false,
    error: null,

    fetchQuizzes: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get<Quiz[]>("/api/quiz/get-quiz"); // Explicitly define response type
            set({ quizzes: response.data });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    addQuiz: async (quiz) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post<Quiz>("/api/quiz/create-quiz", quiz);
            set((state) => ({ quizzes: [...state.quizzes, response.data] }));
            // Fetch quizzes after adding a new quiz
            await get().fetchQuizzes(); 
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    deleteQuiz: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/quiz/${id}/delete-quiz`);
            set((state) => ({
                quizzes: state.quizzes.filter((quiz) => quiz.id !== id),
            }));
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useQuizStore;
