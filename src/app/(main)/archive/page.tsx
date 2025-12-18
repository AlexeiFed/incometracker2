"use client";

import { useState, useEffect, useMemo } from "react";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { ClientCard } from "@/components/ClientCard";
import { useArchiveStore } from "@/stores/archiveStore";
import { useIncomeStore } from "@/stores/incomeStore";
import { permanentlyDeleteClient } from "@/lib/firebaseService";
import styles from "./page.module.scss";

export default function ArchivePage() {
  const {
    archivedClients,
    loadArchivedClients,
    isLoading,
    removeArchivedClient,
  } = useArchiveStore();
  const { incomes, loadIncomes, removeClientIncomes } = useIncomeStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([loadArchivedClients(), loadIncomes()]);
    };
    loadData();
  }, [loadArchivedClients, loadIncomes]);

  const clientsWithTotals = useMemo(() => {
    return archivedClients.map((client) => {
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
  }, [archivedClients, incomes]);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) {
      return clientsWithTotals;
    }
    const query = searchQuery.toLowerCase();
    return clientsWithTotals.filter((client) =>
      client.name?.toLowerCase().includes(query)
    );
  }, [clientsWithTotals, searchQuery]);

  const handlePermanentDelete = async (id: string, name: string) => {
    if (
      !confirm(
        `Вы уверены, что хотите полностью удалить клиента "${name}" и все его платежи? Это действие нельзя отменить.`
      )
    ) {
      return;
    }

    try {
      // Сразу удаляем из состояния для мгновенного обновления UI
      removeArchivedClient(id);
      removeClientIncomes(name);
      // Полностью удаляем клиента и все его платежи
      await permanentlyDeleteClient(id, name);
      // Обновляем данные в фоне
      await Promise.all([loadArchivedClients(), loadIncomes()]);
    } catch (error) {
      console.error("Failed to permanently delete client:", error);
      // В случае ошибки перезагружаем данные
      await Promise.all([loadArchivedClients(), loadIncomes()]);
      alert("Не удалось удалить клиента");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <PageHeader title="Архив" />
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <PageHeader title="Архив" />
      <div className={styles.content}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск в архиве"
        />
        <div className={styles.list}>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                totalPayments={client.totalPayments}
                onDelete={() => handlePermanentDelete(client.id, client.name)}
                isArchived
              />
            ))
          ) : (
            <div className={styles.empty}>
              {searchQuery ? "Клиенты не найдены" : "Архив пуст"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

