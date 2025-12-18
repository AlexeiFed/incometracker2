import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { Income, Client } from "@/types";

export const incomesCollection = collection(db, "incomes");
export const clientsCollection = collection(db, "clients");

export async function getIncomes(): Promise<Income[]> {
  try {
    const q = query(incomesCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Income[];
  } catch (error) {
    console.error("Error getting incomes:", error);
    return [];
  }
}

export async function getClients(): Promise<Client[]> {
  try {
    const querySnapshot = await getDocs(clientsCollection);
    const clients = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Client[];
    // Возвращаем только неархивированных клиентов
    return clients.filter((client) => !client.archived);
  } catch (error) {
    console.error("Error getting clients:", error);
    return [];
  }
}

export async function getArchivedClients(): Promise<Client[]> {
  try {
    const querySnapshot = await getDocs(clientsCollection);
    const clients = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Client[];
    // Возвращаем только архивированных клиентов
    return clients.filter((client) => client.archived === true);
  } catch (error) {
    console.error("Error getting archived clients:", error);
    return [];
  }
}

export async function addIncome(income: Omit<Income, "id">): Promise<string> {
  try {
    // Удаляем undefined поля перед отправкой в Firebase
    const incomeData: Record<string, unknown> = {
      amount: income.amount,
      clientName: income.clientName,
      date: income.date,
    };
    
    if (income.comment) {
      incomeData.comment = income.comment;
    }
    
    const docRef = await addDoc(incomesCollection, incomeData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding income:", error);
    throw error;
  }
}

export async function addClient(client: Omit<Client, "id">): Promise<string> {
  try {
    const docRef = await addDoc(clientsCollection, client);
    return docRef.id;
  } catch (error) {
    console.error("Error adding client:", error);
    throw error;
  }
}

export async function deleteIncome(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "incomes", id));
  } catch (error) {
    console.error("Error deleting income:", error);
    throw error;
  }
}

export async function getAllIncomes(): Promise<Income[]> {
  try {
    const q = query(incomesCollection, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Income[];
  } catch (error) {
    console.error("Error getting all incomes:", error);
    return [];
  }
}

export async function deleteClientIncomes(clientName: string): Promise<void> {
  try {
    // Получаем все доходы, включая архивированных клиентов
    const incomes = await getAllIncomes();
    const incomesToDelete = incomes.filter(
      (income) => income.clientName === clientName
    );

    const deletePromises = incomesToDelete.map((income) =>
      deleteDoc(doc(db, "incomes", income.id))
    );

    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting client incomes:", error);
    throw error;
  }
}

export async function archiveClient(id: string): Promise<void> {
  try {
    // Архивируем клиента вместо удаления
    await updateDoc(doc(db, "clients", id), {
      archived: true,
    });
  } catch (error) {
    console.error("Error archiving client:", error);
    throw error;
  }
}

export async function permanentlyDeleteClient(
  id: string,
  clientName: string
): Promise<void> {
  try {
    // Сначала удаляем все платежи клиента
    await deleteClientIncomes(clientName);
    // Затем удаляем самого клиента
    await deleteDoc(doc(db, "clients", id));
  } catch (error) {
    console.error("Error permanently deleting client:", error);
    throw error;
  }
}

export async function updateIncome(
  id: string,
  income: Partial<Omit<Income, "id">>
): Promise<void> {
  try {
    // Удаляем undefined поля перед отправкой в Firebase
    const updateData: Record<string, unknown> = {};
    
    if (income.amount !== undefined) updateData.amount = income.amount;
    if (income.clientName !== undefined) updateData.clientName = income.clientName;
    if (income.date !== undefined) updateData.date = income.date;
    if (income.comment !== undefined) {
      if (income.comment) {
        updateData.comment = income.comment;
      } else {
        // Если comment пустой, удаляем поле
        updateData.comment = null;
      }
    }
    
    await updateDoc(doc(db, "incomes", id), updateData);
  } catch (error) {
    console.error("Error updating income:", error);
    throw error;
  }
}

export async function updateIncomesClientName(
  oldName: string,
  newName: string
): Promise<void> {
  try {
    const incomes = await getIncomes();
    const incomesToUpdate = incomes.filter(
      (income) => income.clientName === oldName
    );

    const updatePromises = incomesToUpdate.map((income) =>
      updateDoc(doc(db, "incomes", income.id), { clientName: newName })
    );

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error updating client names in incomes:", error);
    throw error;
  }
}

