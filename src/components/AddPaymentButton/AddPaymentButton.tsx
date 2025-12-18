"use client";

import Link from "next/link";
import styles from "./AddPaymentButton.module.scss";

export function AddPaymentButton() {
  return (
    <Link href="/add-payment" className={styles.button}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span>Добавить платеж</span>
    </Link>
  );
}
