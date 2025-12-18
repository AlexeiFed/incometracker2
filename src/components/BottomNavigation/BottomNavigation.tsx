"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNavigation.module.scss";

export function BottomNavigation() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isClientsActive = pathname === "/clients";
  const isArchiveActive = pathname === "/archive";

  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        className={styles.link}
        aria-current={isHomeActive ? "page" : undefined}
      >
        <div className={styles.icon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="8" width="4" height="12" fill="currentColor" />
            <rect x="10" y="4" width="4" height="16" fill="currentColor" />
            <rect x="16" y="6" width="4" height="14" fill="currentColor" />
          </svg>
        </div>
        <span className={styles.label}>Главная</span>
      </Link>
      <Link
        href="/clients"
        className={styles.link}
        aria-current={isClientsActive ? "page" : undefined}
      >
        <div className={styles.icon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              fill="currentColor"
            />
            <path
              d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
              fill="currentColor"
            />
            <path
              d="M20 9C20 10.1046 19.1046 11 18 11C16.8954 11 16 10.1046 16 9C16 7.89543 16.8954 7 18 7C19.1046 7 20 7.89543 20 9Z"
              fill="currentColor"
            />
            <path
              d="M18 13C15.7909 13 14 15.7909 14 18H22C22 15.7909 20.2091 13 18 13Z"
              fill="currentColor"
            />
            <path
              d="M8 9C8 10.1046 7.10457 11 6 11C4.89543 11 4 10.1046 4 9C4 7.89543 4.89543 7 6 7C7.10457 7 8 7.89543 8 9Z"
              fill="currentColor"
            />
            <path
              d="M6 13C8.20914 13 10 15.7909 10 18H2C2 15.7909 3.79086 13 6 13Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <span className={styles.label}>Клиенты</span>
      </Link>
      <Link
        href="/archive"
        className={styles.link}
        aria-current={isArchiveActive ? "page" : undefined}
      >
        <div className={styles.icon}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 7H20L19 19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19L4 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 11V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 11V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className={styles.label}>Архив</span>
      </Link>
    </nav>
  );
}
