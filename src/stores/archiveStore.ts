import { create } from "zustand";
import { Client } from "@/types";
import { getArchivedClients } from "@/lib/firebaseService";

interface ArchiveState {
  archivedClients: Client[];
  isLoading: boolean;
  setArchivedClients: (clients: Client[]) => void;
  loadArchivedClients: () => Promise<void>;
  removeArchivedClient: (id: string) => void;
}

export const useArchiveStore = create<ArchiveState>((set, get) => ({
  archivedClients: [],
  isLoading: false,
  setArchivedClients: (clients) => set({ archivedClients: clients }),
  loadArchivedClients: async () => {
    // Если данные уже загружены, не показываем loading
    if (get().archivedClients.length > 0) {
      try {
        const clients = await getArchivedClients();
        set({ archivedClients: clients });
      } catch (error) {
        console.error("Failed to load archived clients:", error);
      }
      return;
    }

    set({ isLoading: true });
    try {
      const clients = await getArchivedClients();
      set({ archivedClients: clients, isLoading: false });
    } catch (error) {
      console.error("Failed to load archived clients:", error);
      set({ isLoading: false });
    }
  },
  removeArchivedClient: (id: string) => {
    set((state) => ({
      archivedClients: state.archivedClients.filter(
        (client) => client.id !== id
      ),
    }));
  },
}));
