import { Income } from "@/types";
import styles from "./MonthlyIncomeTable.module.scss";

interface MonthlyIncomeTableProps {
  incomes: Income[];
  year: number;
}

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export function MonthlyIncomeTable({
  incomes,
  year,
}: MonthlyIncomeTableProps) {
  const monthlyTotals = months.map((_, monthIndex) => {
    const monthIncomes = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      return (
        incomeDate.getFullYear() === year &&
        incomeDate.getMonth() === monthIndex
      );
    });

    return {
      month: months[monthIndex],
      total: monthIncomes.reduce((sum, income) => sum + income.amount, 0),
    };
  });

  const filteredMonths = monthlyTotals.filter((item) => item.total > 0);

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <div className={styles.headerCell}>Месяц</div>
        <div className={styles.headerCell}>Сумма</div>
      </div>
      <div className={styles.body}>
        {filteredMonths.length > 0 ? (
          filteredMonths.map((item) => (
            <div key={item.month} className={styles.row}>
              <div className={styles.cell}>{item.month}</div>
              <div className={styles.cell}>
                {new Intl.NumberFormat("ru-RU").format(item.total)} ₽
              </div>
            </div>
          ))
        ) : (
          <div className={styles.empty}>Нет данных за выбранный год</div>
        )}
      </div>
    </div>
  );
}

