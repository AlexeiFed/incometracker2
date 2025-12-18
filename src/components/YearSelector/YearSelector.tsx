"use client";

import { useMemo } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import styles from "./YearSelector.module.scss";

export function YearSelector() {
  const { selectedYear, setSelectedYear, incomes } = useIncomeStore();

  const availableYears = useMemo(() => {
    const yearsSet = new Set<number>();
    incomes.forEach((income) => {
      const year = new Date(income.date).getFullYear();
      yearsSet.add(year);
    });
    
    // Если нет доходов, показываем текущий год
    if (yearsSet.size === 0) {
      yearsSet.add(new Date().getFullYear());
    }
    
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [incomes]);

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

