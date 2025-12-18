import { Income } from "@/types";
import styles from "./PaymentItem.module.scss";

interface PaymentItemProps {
  payment: Income;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
}

export function PaymentItem({
  payment,
  onEdit,
  onDelete,
  isDeleting,
}: PaymentItemProps) {
  const formattedAmount = new Intl.NumberFormat("ru-RU").format(
    payment.amount
  );

  const formattedDate = new Date(payment.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className={styles.item}>
      <div className={styles.content}>
        <div className={styles.amount}>{formattedAmount} ₽</div>
        <div className={styles.date}>{formattedDate}</div>
        {payment.comment && (
          <div className={styles.comment}>{payment.comment}</div>
        )}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={onEdit}
          aria-label="Редактировать"
          disabled={isDeleting}
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
          </svg>
        </button>
        <button
          className={styles.actionButton}
          onClick={onDelete}
          aria-label="Удалить"
          disabled={isDeleting}
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
    </div>
  );
}

