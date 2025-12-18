"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { ClientCard } from "@/components/ClientCard";
import { useClientStore } from "@/stores/clientStore";
import { useIncomeStore } from "@/stores/incomeStore";
import { archiveClient } from "@/lib/firebaseService";
import styles from "./page.module.scss";

export default function ClientsPage() {
  const router = useRouter();
  const { clients, loadClients, isLoading, removeClient } = useClientStore();
  const { incomes, loadIncomes, removeClientIncomes } = useIncomeStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadClients(), loadIncomes()]);
    };
    loadData();
  }, [loadClients, loadIncomes]);

  const clientsWithTotals = useMemo(() => {
    return clients.map((client) => {
      const clientIncomes = incomes.filter(
        (income) => income.clientName === client.name
      );
      const total = clientIncomes.reduce(
        (sum, income) => sum + income.amount,
        0
      );
      return {
        ...client,
        totalPayments: total,
      };
    });
  }, [clients, incomes]);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) {
      return clientsWithTotals;
    }
    const query = searchQuery.toLowerCase();
    return clientsWithTotals.filter((client) =>
      client.name?.toLowerCase().includes(query)
    );
  }, [clientsWithTotals, searchQuery]);

  const handleEdit = (id: string) => {
    router.push(`/edit-client/${id}`);
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Вы уверены, что хотите переместить клиента "${name}" в архив? Платежи клиента останутся для статистики.`
      )
    ) {
      return;
    }

    try {
      // Сразу удаляем из состояния для мгновенного обновления UI
      removeClient(id);
      // Архивируем клиента (платежи остаются)
      await archiveClient(id);
      // Обновляем данные в фоне
      await loadClients();
    } catch (error) {
      console.error("Failed to archive client:", error);
      // В случае ошибки перезагружаем данные
      await loadClients();
      alert("Не удалось переместить клиента в архив");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <PageHeader title="Клиенты" />
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader title="Клиенты" />
      <div className={styles.content}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск клиентов"
        />
        <div className={styles.list}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                totalPayments={client.totalPayments}
                onEdit={() => handleEdit(client.id)}
                onDelete={() => handleDelete(client.id, client.name)}
              />
            ))
          ) : (
            <div className={styles.empty}>
              {searchQuery ? "Клиенты не найдены" : "Нет клиентов"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
