"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { useIncomeStore } from "@/stores/incomeStore";
import { updateIncome } from "@/lib/firebaseService";
import styles from "./page.module.scss";

export const dynamicParams = true;

export default function EditPaymentPage() {
  const params = useParams();
  const router = useRouter();
  const incomeId = params.id as string;
  const { incomes, loadIncomes } = useIncomeStore();

  const income = incomes.find((i) => i.id === incomeId);

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (income) {
      setAmount(income.amount.toString());
      setDate(income.date);
      setComment(income.comment || "");
    }
  }, [income]);

  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  if (!income) {
    return (
      <div className={styles.container}>
        <PageHeader title="Платеж не найден" />
        <div className={styles.error}>Платеж не найден</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Введите корректную сумму";
    }

    if (!date) {
      newErrors.date = "Выберите дату";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await updateIncome(incomeId, {
        amount: Number(amount),
        date,
        comment: comment.trim() || undefined,
      });

      await loadIncomes();
      router.back();
    } catch (error) {
      console.error("Failed to update payment:", error);
      setErrors({ submit: "Не удалось обновить платеж" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title="Редактировать платеж" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField label="Клиент">
          <Input type="text" value={income.clientName} disabled />
        </FormField>

        <FormField label="Сумма" required>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Сумма"
            error={errors.amount}
            min="1"
            step="0.01"
          />
        </FormField>

        <FormField label="Дата" required>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
          />
        </FormField>

        <FormField label="Комментарий (необязательно)">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Комментарий (необязательно)"
            rows={4}
          />
        </FormField>

        {errors.submit && (
          <div className={styles.error}>{errors.submit}</div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : "Сохранить"}
        </button>
      </form>
    </div>
  );
}

