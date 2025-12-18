"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/Input";
import { useClientStore } from "@/stores/clientStore";
import styles from "./page.module.scss";

export default function AddClientPage() {
  const router = useRouter();
  const { createClient } = useClientStore();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Введите имя клиента");
      return;
    }

    setIsSubmitting(true);

    try {
      await createClient(name.trim());
      router.back();
    } catch (error) {
      console.error("Failed to create client:", error);
      setError("Не удалось добавить клиента");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader title="Добавить клиента" />
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
          {isSubmitting ? "Сохранение..." : "Добавить клиента"}
        </button>
      </form>
    </div>
  );
}

