"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ClientTypeToggle } from "@/components/ClientTypeToggle";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Textarea } from "@/components/Textarea";
import { useClientStore } from "@/stores/clientStore";
import { useIncomeStore } from "@/stores/incomeStore";
import { addIncome } from "@/lib/firebaseService";
import styles from "./page.module.scss";

type ClientType = "existing" | "new";

function AddPaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clients, loadClients, createClient } = useClientStore();
  const { loadIncomes } = useIncomeStore();

  const clientIdFromQuery = searchParams.get("clientId");
  const returnTo = searchParams.get("returnTo");

  const [clientType, setClientType] = useState<ClientType>("existing");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");

  useEffect(() => {
    if (clientIdFromQuery) {
      setSelectedClientId(clientIdFromQuery);
      setClientType("existing");
    }
  }, [clientIdFromQuery]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const parseDateFromInput = (dateString: string) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (clientType === "existing") {
      if (!selectedClientId) {
        newErrors.client = "Выберите клиента";
      }
    } else {
      if (!newClientName.trim()) {
        newErrors.newClient = "Введите имя клиента";
      }
    }

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
      let clientName = "";

      if (clientType === "existing") {
        const client = clients.find((c) => c.id === selectedClientId);
        clientName = client?.name || "";
      } else {
        const clientId = await createClient(newClientName.trim());
        const newClient = clients.find((c) => c.id === clientId);
        clientName = newClientName.trim();
        await loadClients();
      }

      const dateFormatted = date.includes("-")
        ? date
        : parseDateFromInput(date);

      const incomeData: {
        amount: number;
        clientName: string;
        date: string;
        comment?: string;
      } = {
        amount: Number(amount),
        clientName,
        date: dateFormatted,
      };

      if (comment.trim()) {
        incomeData.comment = comment.trim();
      }

      await addIncome(incomeData);

      await loadIncomes();
      
      // Определяем, куда вернуться
      if (clientIdFromQuery && returnTo === "client") {
        // Возвращаемся на страницу клиента, заменяя историю
        router.replace(`/clients/${clientIdFromQuery}`);
      } else if (returnTo === "clients") {
        // Возвращаемся на страницу списка клиентов
        router.replace("/clients");
      } else if (clientIdFromQuery) {
        // Если clientId есть, но returnTo не указан, возвращаемся на страницу клиента
        router.replace(`/clients/${clientIdFromQuery}`);
      } else {
        // По умолчанию возвращаемся на главную
        router.replace("/");
      }
    } catch (error) {
      console.error("Failed to add payment:", error);
      setErrors({ submit: "Не удалось добавить платеж" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title="Добавить платеж" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <ClientTypeToggle value={clientType} onChange={setClientType} />

        {clientType === "existing" ? (
          <FormField label="Выберите клиента" required>
            <Select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              options={clients.map((client) => ({
                value: client.id,
                label: client.name,
              }))}
              error={errors.client}
            />
          </FormField>
        ) : (
          <FormField label="Имя клиента" required>
            <Input
              type="text"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              placeholder="Введите имя клиента"
              error={errors.newClient}
            />
          </FormField>
        )}

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
          <div className={styles.dateContainer}>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
            />
          </div>
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
          {isSubmitting ? "Сохранение..." : "Добавить платеж"}
        </button>
      </form>
    </div>
  );
}

export default function AddPaymentPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AddPaymentForm />
    </Suspense>
  );
}
