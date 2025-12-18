"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { PaymentMonthSection } from "@/components/PaymentMonthSection";
import { useClientStore } from "@/stores/clientStore";
import { useIncomeStore } from "@/stores/incomeStore";
import styles from "./page.module.scss";

export const dynamicParams = true;

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const { clients, loadClients } = useClientStore();
  const { incomes, loadIncomes } = useIncomeStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadClients(), loadIncomes()]);
      setIsLoading(false);
    };
    loadData();
  }, [loadClients, loadIncomes]);

  const client = useMemo(
    () => clients.find((c) => c.id === clientId),
    [clients, clientId]
  );

  const clientIncomes = useMemo(() => {
    if (!client) return [];
    return incomes.filter((income) => income.clientName === client.name);
  }, [incomes, client]);

  const paymentsByMonth = useMemo(() => {
    const grouped: Record<string, typeof clientIncomes> = {};

    clientIncomes.forEach((income) => {
      const date = new Date(income.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthName = date.toLocaleDateString("ru-RU", {
        month: "long",
        year: "numeric",
      });

      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(income);
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([key, payments]) => {
        const date = new Date(key + "-01");
        const monthName = date.toLocaleDateString("ru-RU", {
          month: "long",
          year: "numeric",
        });
        const total = payments.reduce((sum, p) => sum + p.amount, 0);
        return {
          key,
          monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
          payments: payments.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ),
          total,
        };
      });
  }, [clientIncomes]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <PageHeader title="Загрузка..." />
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className={styles.container}>
        <PageHeader title="Клиент не найден" />
        <div className={styles.error}>Клиент не найден</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader title={client.name} />
      <div className={styles.content}>
        {paymentsByMonth.length > 0 ? (
          paymentsByMonth.map((month) => (
            <PaymentMonthSection
              key={month.key}
              monthName={month.monthName}
              total={month.total}
              payments={month.payments}
            />
          ))
        ) : (
          <div className={styles.empty}>Нет платежей</div>
        )}
      </div>
    </div>
  );
}

