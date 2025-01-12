import styles from "./PopupTransactionPage.module.css";
import { Popup, Button } from "antd-mobile";
import React, { useState } from "react";
import { IAllTransaction } from "@/entities/transactionR";

type Props = {
  transaction: IAllTransaction;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PopupTransactionPage({
  transaction,
  setVisible,
  visible,
}: Props) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  // const [newPhotoUrl, setNewPhotoUrl] = useState("");

  return (
    <div>
      <Popup
        closeOnSwipe={true}
        visible={visible}
        onMaskClick={() => setVisible(false)}
        position="bottom"
        bodyStyle={{ height: "66vh" }}
      >
        <div className={styles.popupContent}>
          <div className={styles.header}>
            <div className={styles.title}>{transaction.description}</div>
            <Button
              className={styles.closeButton}
              onClick={() => setVisible(false)}
            >
              Закрыть
            </Button>
          </div>

          <div className={styles.content}>
            {transaction.type === "перевод" ? (
              <div className={styles.amount}>
                Сумма: {transaction.sumGoal} ₽
              </div>
            ) : (
              <div className={styles.amount}>Сумма: {transaction.sum} ₽</div>
            )}
            <div className={styles.amount}>
              Бюджет: {transaction.budgetName}{" "}
            </div>
            {transaction.goalTitle && (
              <div className={styles.amount}>
                На цель: {transaction.goalTitle}{" "}
              </div>
            )}
            <div className={styles.date}>
              Дата и время: {new Date(transaction.createdAt).toLocaleString()}
            </div>

            {transaction.TransactionComments &&
              transaction.TransactionComments.length > 0 && (
                <div className={styles.commentsSection}>
                  <div className={styles.sectionTitle}>Комментарии:</div>
                  {transaction.TransactionComments.map((el) => (
                    <div key={el.id} className={styles.commentItem}>
                      {editingCommentId === el.id ? (
                        <div>
                          <input
                            type="text"
                            value={newCommentText}
                            onChange={(e) => setNewCommentText(e.target.value)}
                          />
                          <button
                            onClick={() => {
                              setEditingCommentId(null);
                            }}
                          >
                            Сохранить
                          </button>
                          <button onClick={() => setEditingCommentId(null)}>
                            Отмена
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className={styles.commentsText}>{el.text}</div>
                          <button
                            onClick={() => {
                              setEditingCommentId(el.id);
                              setNewCommentText(el.text);
                            }}
                          >
                            Редактировать
                          </button>
                          <button>Удалить</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {transaction.TransactionRPhotos &&
              transaction.TransactionRPhotos.length > 0 && (
                <div className={styles.gallerySection}>
                  <div className={styles.sectionTitle}>Фотографии:</div>
                  <div className={styles.gallery}>
                    {transaction.TransactionRPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Focus_ubt.jpeg/350px-Focus_ubt.jpeg"
                        }
                        alt={`Фото ${index + 1}`}
                        className={styles.photo}
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </Popup>
    </div>
  );
}
