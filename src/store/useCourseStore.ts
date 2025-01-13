import { create } from "zustand";
import axios from "axios";

interface Order {
  user: {
    id: string;
    username: string;
  }
}

type Course = {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  orders: Order[];
  users: { username: string }[];
};

type courseStore = {
  courses: Course[];
  fetchCourses: () => Promise<void>;
  deleteCourses: (id: string) => Promise<void>;
  addNewCourse: (formData: FormData) => Promise<void>;
  setError: (error: string | null) => void;
  error: string | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const useCourseStore = create<courseStore>((set) => ({
  courses: [],
  error: null,
  loading: false,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchCourses: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/admin/api/get-course");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const courses: Course[] = response.data.map((course: any) => ({
        id: course.id,
        category: course.category,
        title: course.title,
        thumbnail: course.thumbnail, // Ensure this field is being handled
        description: course.description,
        price: course.price,
        orders: course.orders || [],
        users: course.orders.map((order: Order) => order.user) || [],
      }));

      set({ courses, error: null });
    } catch (error) {
      set({ error: "Failed to fetch courses" });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  addNewCourse: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/admin/api/create-course", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the server recognizes the form data
        },
      });
      set((state) => ({
        courses: [...state.courses, response.data],
        error: null,
      }));
    } catch (error) {
      console.error("Error adding new course:", error);
      set({ error: "Failed to add course" });
    } finally {
      set({ loading: false });
    }
  },

  deleteCourses: async (id) => {
    try {
      await axios.delete(`/admin/api/delete-course/${id}`);
      set((state) => ({
        courses: state.courses.filter((course) => course.id !== id),
      }));
    } catch (error) {
      set({ error: "Failed to delete course" });
      console.error(error);
    }
  },
}));

export default useCourseStore;
