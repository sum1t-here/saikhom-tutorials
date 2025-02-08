import {create} from "zustand";

interface QuizResult {
    score: number;
    status: string;
    quiz?: {title: string};
}

interface UserState {
    userId : number | null;
    hasPaidOrder: boolean;
    quizResults: QuizResult[];
    loading: boolean;
    error: string | null;
    fetchUserData: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    userId: null,
    hasPaidOrder: false,
    quizResults: [],
    loading: false,
    error:  null,

    fetchUserData: async(userId) => {
        set({loading:true, error:null});

        try {
            const orderRes = await fetch(`/api/user/${userId}/paymentStatus`);
            const orderData = await orderRes.json();
            const hasPaidOrder = orderData.hasPaidOrder || false;


            const quizRes = await fetch(`/api/user/${userId}/quizResult`);
            const quizData = await quizRes.json();
            const quizResults = quizData.quizResults || [];

            set({
                userId,
                hasPaidOrder,
                quizResults,
                loading: false,
              });        
        } catch (error) {
            console.error("Error fetching user data:", error);
            set({ error: "Failed to fetch user data", loading: false });
        }
    }
}))

export default useUserStore;