import styles from "./IncomeCard.module.scss";

interface IncomeCardProps {
  total: number;
  year: number;
}

export function IncomeCard({ total, year }: IncomeCardProps) {
  const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

  return (
    <div className={styles.card}>
      <div className={styles.label}>Общий доход за {year} год</div>
      <div className={styles.amount}>{formattedTotal} ₽</div>
    </div>
  );
}
