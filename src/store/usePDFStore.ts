import { create } from "zustand";
import axios from "axios";

export type PDF = {
  id: number;
  title: string;
  pdfFile: string;
  description: string;
};

type PdfStore = {
  pdf: PDF[];
  loading: boolean;
  error: string | null;
  fetchPdf: () => Promise<void>;
  deletePdf: (id: string) => Promise<void>;
  addPdf: (formData: FormData) => Promise<void>;
};

const usePdfStore = create<PdfStore>((set) => ({
  pdf: [],
  loading: false,
  error: null,

  addPdf: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/admin/api/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.data) {
        set({ error: "Failed to add pdf", loading: false });
        return;
      }

      // Fetch the updated list of PDFs
      await usePdfStore.getState().fetchPdf();

      set({ loading: false, error: null });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deletePdf: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/admin/api/delete-pdf/${id}`);

      // Update the state by filtering out the deleted PDF
      set((state) => ({
        pdf: state.pdf.filter((pdf) => pdf.id !== Number(id)),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchPdf: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("/admin/api/fetch-pdf");

      if (!response.data) {
        set({ error: "Failed to fetch data", loading: false });
        return;
      }

      const data: PDF[] = response.data;
      set({ pdf: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

export default usePdfStore;