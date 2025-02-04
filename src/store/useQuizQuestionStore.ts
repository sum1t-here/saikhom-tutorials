import {create} from "zustand";
import axios from "axios";

type QuizQuestion = {
    id: number;
    quizId: number;
    text: string;
    options: string[];
    answer: string;
};

type QuizQuestionStore = {
    questions: QuizQuestion[];
    addQuestion: (question: Omit<QuizQuestion, "id">, quizId: number, ) => Promise<void>;
    fetchQuestions: (quizId: number) => Promise<void>;
    deleteQuestion: (id: number, quizId: number) => Promise<void>;
    loading: boolean;
    error: string | null;
};

const useQuizQuestionStore = create<QuizQuestionStore>((set, get) => ({
    questions: [],
    loading: false,
    error: null,
    
    fetchQuestions: async (quizId: number) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/quiz/${quizId}/fetch-questions`);
            set({ questions: response.data });
            set({ loading: false });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    addQuestion: async (question: Omit<QuizQuestion, "id">, quizId: number) => {
        try {
            set({ loading: true });
            set({ error: null });
            const response = await axios.post(`/api/quiz/${quizId}/add-questions`, question);

            if (!response.data) {
                throw new Error("Failed to add question.");
            }

            set((state) => ({ questions: [...state.questions, response.data] }));

            await get().fetchQuestions(quizId);

            set({ loading: false });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },

    deleteQuestion: async (id: number, quizId: number) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`/api/quiz/${quizId}/delete-questions/${id}`);
            set((state) => ({ questions: state.questions.filter((question) => question.id !== id) }));
            get().fetchQuestions(quizId);
            set({ loading: false });
        } catch (error) {
            set({ error: (error as Error).message });
        } finally {
            set({ loading: false });
        }
    },
}))

export default useQuizQuestionStore;