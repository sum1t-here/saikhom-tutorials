import {create} from "zustand";
import axios from "axios";

export type Notification = {
    id: number,
    message: string
}

type notificationStore = {
    notifications : Notification[];
    loading: boolean;
    error: null | string;
    fetchNotification: () => Promise<void>;
    deleteNotification: (id: number) => Promise<void>;
    addNotification: (message: string) => Promise<void>;
}

const useNotificationStore = create<notificationStore>((set) => ({
    notifications: [],
    loading: false,
    error: null,

    fetchNotification: async() => {
        set({loading: true, error:null});
        try {
            const response = await axios.get("/api/get-notifications");
            set({notifications: response.data, loading: false})
        } catch (error) {
            set({error: (error as Error).message});
        }
    },

    deleteNotification: async(id:number) => {
        set({loading: true, error: null});
        try {
            await axios.delete(`/api/delete-notification/${id}`);
            set((state) => ({
                notifications: state.notifications.filter((notification) => notification.id !== id),
                loading: false
            }))
        } catch (error) {
            set({error : (error as Error).message})
        }
    },

    addNotification: async(message: string) => {
        set({loading: true, error: null});
        try {
            const response = await axios.post("/api/add-notifications", {message});
            set((state) => ({
                notifications: [response.data.notification, ...state.notifications],
                loading: false,
            }))
        } catch (error) {
            set({error : (error as Error).message})
        }
    }
}))

export default useNotificationStore;