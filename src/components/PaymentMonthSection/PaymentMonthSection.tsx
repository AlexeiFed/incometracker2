"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Income } from "@/types";
import { deleteIncome, updateIncome } from "@/lib/firebaseService";
import { useIncomeStore } from "@/stores/incomeStore";
import { PaymentItem } from "@/components/PaymentItem";
import styles from "./PaymentMonthSection.module.scss";

interface PaymentMonthSectionProps {
  monthName: string;
  total: number;
  payments: Income[];
}

export function PaymentMonthSection({
  monthName,
  total,
  payments,
}: PaymentMonthSectionProps) {
  const router = useRouter();
  const { loadIncomes } = useIncomeStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этот платеж?")) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteIncome(id);
      await loadIncomes();
    } catch (error) {
      console.error("Failed to delete income:", error);
      alert("Не удалось удалить платеж");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (income: Income) => {
    router.push(`/edit-payment/${income.id}`);
  };

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <span className={styles.monthName}>{monthName}</span>
        <span className={styles.total}>Итого: {formattedTotal} ₽</span>
      </div>
      <div className={styles.payments}>
        {payments.map((payment) => (
          <PaymentItem
            key={payment.id}
            payment={payment}
            onEdit={() => handleEdit(payment)}
            onDelete={() => handleDelete(payment.id)}
            isDeleting={deletingId === payment.id}
          />
        ))}
      </div>
    </div>
  );
}

