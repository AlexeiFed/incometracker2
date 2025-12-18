import { BackButton } from "@/components/BackButton";
import styles from "./PageHeader.module.scss";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <BackButton />
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

