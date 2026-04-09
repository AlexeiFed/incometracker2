import Link from "next/link";
import styles from "./ClientCard.module.scss";

interface ClientCardProps {
  id: string;
  name: string;
  totalPayments: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onRestore?: () => void;
  isArchived?: boolean;
}

export function ClientCard({
  id,
  name,
  totalPayments,
  onEdit,
  onDelete,
  onRestore,
  isArchived = false,
}: ClientCardProps) {
  const formattedTotal = new Intl.NumberFormat("ru-RU").format(totalPayments);

  return (
    <Link
      href={isArchived ? "#" : `/clients/${id}`}
      className={styles.card}
      onClick={isArchived ? (e) => e.preventDefault() : undefined}
    >
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.total}>
          Всего оплат: {formattedTotal} ₽
        </div>
      </div>
      <div className={styles.actions}>
        {isArchived && onRestore && (
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRestore();
            }}
            aria-label="Восстановить из архива"
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16667 8.33333V4.16667H8.33333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33333 12.5C4.16667 14.5833 6.25 16.25 8.75 16.25C12.0833 16.25 14.7917 13.5417 14.7917 10.2083C14.7917 6.875 12.0833 4.16667 8.75 4.16667C6.45833 4.16667 4.5 5.45833 3.54167 7.29167"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {!isArchived && (
          <button
            className={styles.actionButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEdit?.();
            }}
            aria-label="Редактировать"
            type="button"
          >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.05 3.00002L4.20831 10.2417C3.94998 10.5167 3.69998 11.0584 3.64998 11.4334L3.34165 14.1334C3.23331 15.1084 3.93331 15.775 4.89998 15.6084L7.58331 15.175C7.95831 15.1084 8.48331 14.8084 8.74165 14.525L15.5833 7.28335C16.7666 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2333 1.75002 11.05 3.00002Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.5 18.3333H17.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          </button>
        )}
        <button
          className={styles.actionButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete?.();
          }}
          aria-label={isArchived ? "Удалить навсегда" : "Удалить"}
          type="button"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5.00002C15 5.00002 12.9917 4.75835 10.8333 4.75835C8.675 4.75835 6.66667 5.00002 6.66667 5.00002M8.33333 3.33335H11.6667M13.3333 7.50002V14.1667C13.3333 15.8334 12.5 17.5 9.16667 17.5H10.8333C14.1667 17.5 13.3333 15.8334 13.3333 14.1667V7.50002Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 9.16669L7.5 14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9.16669V14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.5 9.16669V14.1667"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </Link>
  );
}

