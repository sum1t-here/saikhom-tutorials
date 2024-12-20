import { create } from "zustand";
import axios from "axios";

type StudyMaterial = {
  id: number;
  title: string;
  type: "VIDEO";
  url: string;
  courseId: string;
};

type lectureStore = {
  studyMaterials: StudyMaterial[];
  loading: boolean;
  error: string | null;
  fetchStudyMaterials: (courseId: number) => Promise<void>;
  deleteStudyMaterial: (courseId: number, lectureId: number) => Promise<void>;
  addStudyMaterial: (courseId: number, formData: FormData) => Promise<void>;
};

const useLectureStore = create<lectureStore>((set) => ({
  studyMaterials: [],
  loading: false,
  error: null,
  addStudyMaterial: async (courseId: number, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        `/admin/api/${courseId}/add-lecture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data) {
        throw new Error("Failed to add study material");
      }

      // Fetch updated study materials after adding a new one
      await useLectureStore.getState().fetchStudyMaterials(courseId);

      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchStudyMaterials: async (courseId: number) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`/admin/api/${courseId}/get-lecture`);
      if (!response.data) {
        throw new Error(
          `Failed to fetch study materials for course ID: ${courseId}`
        );
      }
      const data: StudyMaterial[] = await response.data;
      set({ studyMaterials: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  deleteStudyMaterial: async (courseId: number, lectureId: number) => {
    set({ loading: true, error: null });

    try {
      await axios.delete(`/admin/api/${courseId}/delete-lecture/${lectureId}`);

      set((state) => ({
        studyMaterials: state.studyMaterials.filter(
          (lecture) => lecture.id !== lectureId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default useLectureStore;
