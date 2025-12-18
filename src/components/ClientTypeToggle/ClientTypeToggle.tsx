"use client";

import styles from "./ClientTypeToggle.module.scss";

type ClientType = "existing" | "new";

interface ClientTypeToggleProps {
  value: ClientType;
  onChange: (type: ClientType) => void;
}

export function ClientTypeToggle({ value, onChange }: ClientTypeToggleProps) {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${value === "existing" ? styles.active : ""}`}
        onClick={() => onChange("existing")}
      >
        Существующий
      </button>
      <button
        type="button"
        className={`${styles.button} ${value === "new" ? styles.active : ""}`}
        onClick={() => onChange("new")}
      >
        Новый клиент
      </button>
    </div>
  );
}

