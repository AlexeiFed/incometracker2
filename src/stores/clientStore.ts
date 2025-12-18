import { create } from "zustand";
import { Client } from "@/types";
import { getClients, addClient } from "@/lib/firebaseService";

interface ClientState {
  clients: Client[];
  isLoading: boolean;
  setClients: (clients: Client[]) => void;
  loadClients: () => Promise<void>;
  createClient: (name: string) => Promise<string>;
  removeClient: (id: string) => void;
}

export const useClientStore = create<ClientState>((set, get) => ({
  clients: [],
  isLoading: false,
  setClients: (clients) => set({ clients }),
  loadClients: async () => {
    // Если данные уже загружены, не показываем loading
    if (get().clients.length > 0) {
      try {
        const clients = await getClients();
        set({ clients });
      } catch (error) {
        console.error("Failed to load clients:", error);
      }
      return;
    }

    set({ isLoading: true });
    try {
      const clients = await getClients();
      set({ clients, isLoading: false });
    } catch (error) {
      console.error("Failed to load clients:", error);
      set({ isLoading: false });
    }
  },
  createClient: async (name: string) => {
    try {
      const clientId = await addClient({
        name,
        createdAt: new Date().toISOString(),
      });
      await get().loadClients();
      return clientId;
    } catch (error) {
      console.error("Failed to create client:", error);
      throw error;
    }
  },
  removeClient: (id: string) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    }));
  },
  removeArchivedClient: (id: string) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    }));
  },
}));

