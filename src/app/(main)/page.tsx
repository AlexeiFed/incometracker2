"use client";

import { useEffect } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import { IncomeCard } from "@/components/IncomeCard";
import { YearSelector } from "@/components/YearSelector";
import { MonthlyIncomeTable } from "@/components/MonthlyIncomeTable";
import styles from "./page.module.scss";

export default function HomePage() {
  const { selectedYear, incomes, loadIncomes, isLoading } = useIncomeStore();

  useEffect(() => {
    loadIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const yearIncomes = incomes.filter((income) => {
    const incomeDate = new Date(income.date);
    return incomeDate.getFullYear() === selectedYear;
  });

  const totalIncome = yearIncomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.incomeCard}>
          <IncomeCard total={totalIncome} year={selectedYear} />
        </div>
        <div className={styles.yearSelector}>
          <YearSelector />
        </div>
      </div>
      <div className={styles.tableContainer}>
        <MonthlyIncomeTable incomes={incomes} year={selectedYear} />
      </div>
    </div>
  );
}
