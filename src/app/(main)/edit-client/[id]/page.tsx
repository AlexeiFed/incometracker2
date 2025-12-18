"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { useClientStore } from "@/stores/clientStore";
import { useIncomeStore } from "@/stores/incomeStore";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { updateIncomesClientName } from "@/lib/firebaseService";
import styles from "./page.module.scss";

export const dynamicParams = true;

export default function EditClientPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const { clients, loadClients } = useClientStore();
  const { loadIncomes } = useIncomeStore();

  const client = clients.find((c) => c.id === clientId);

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (client) {
      setName(client.name);
    }
  }, [client]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  if (!client) {
    return (
      <div className={styles.container}>
        <PageHeader title="Клиент не найден" />
        <div className={styles.error}>Клиент не найден</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Введите имя клиента");
      return;
    }

    setIsSubmitting(true);

    try {
      const oldName = client.name;
      const newName = name.trim();

      // Обновляем имя клиента
      await updateDoc(doc(db, "clients", clientId), {
        name: newName,
      });

      // Обновляем все доходы с этим именем клиента
      if (oldName !== newName) {
        await updateIncomesClientName(oldName, newName);
      }

      // Обновляем данные
      await Promise.all([loadClients(), loadIncomes()]);
      router.back();
    } catch (error) {
      console.error("Failed to update client:", error);
      setError("Не удалось обновить клиента");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title="Редактировать клиента" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <FormField label="Имя клиента" required>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя клиента"
            error={error}
            autoFocus
          />
        </FormField>

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

