import { create } from "zustand";
import { Income } from "@/types";
import { getIncomes } from "@/lib/firebaseService";

interface IncomeState {
  selectedYear: number;
  incomes: Income[];
  isLoading: boolean;
  setSelectedYear: (year: number) => void;
  setIncomes: (incomes: Income[]) => void;
  loadIncomes: () => Promise<void>;
  refreshIncomes: () => Promise<void>;
  removeClientIncomes: (clientName: string) => void;
}

export const useIncomeStore = create<IncomeState>((set, get) => ({
  selectedYear: new Date().getFullYear(),
  incomes: [],
  isLoading: false,
  setSelectedYear: (year) => set({ selectedYear: year }),
  setIncomes: (incomes) => set({ incomes }),
  loadIncomes: async () => {
    // Если данные уже загружены, не показываем loading
    if (get().incomes.length > 0) {
      try {
        const incomes = await getIncomes();
        set({ incomes });
      } catch (error) {
        console.error("Failed to load incomes:", error);
      }
      return;
    }

    set({ isLoading: true });
    try {
      const incomes = await getIncomes();
      set({ incomes, isLoading: false });
    } catch (error) {
      console.error("Failed to load incomes:", error);
      set({ isLoading: false });
    }
  },
  refreshIncomes: async () => {
    const incomes = await getIncomes();
    set({ incomes });
  },
  removeClientIncomes: (clientName: string) => {
    set((state) => ({
      incomes: state.incomes.filter(
        (income) => income.clientName !== clientName
      ),
    }));
  },
}));

