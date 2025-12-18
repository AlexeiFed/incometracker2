"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import styles from "./FAB.module.scss";

interface FABProps {
  href: string;
  icon: React.ReactNode;
  label?: string;
}

export function FAB({ href, icon, label }: FABProps) {
  const pathname = usePathname();
  const params = useParams();

  const shouldShow =
    (pathname === "/" ||
      pathname === "/clients" ||
      pathname.startsWith("/clients/")) &&
    pathname !== "/archive";

  if (!shouldShow) return null;

  const isAddClient = href === "/add-client";
  const isClientDetailPage = pathname.startsWith("/clients/") && params.id;

  // На странице детального просмотра клиента показываем только кнопку добавления платежа
  if (isClientDetailPage && isAddClient) {
    return null;
  }

  // Формируем правильную ссылку с параметрами возврата
  let finalHref = href;
  
  if (href === "/add-payment") {
    if (isClientDetailPage) {
      // Со страницы детального просмотра клиента
      finalHref = `/add-payment?clientId=${params.id}&returnTo=client`;
    } else if (pathname === "/clients") {
      // Со страницы списка клиентов
      finalHref = `/add-payment?returnTo=clients`;
    }
  }

  return (
    <Link
      href={finalHref}
      className={`${styles.fab} ${isAddClient ? styles.client : ""}`}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

