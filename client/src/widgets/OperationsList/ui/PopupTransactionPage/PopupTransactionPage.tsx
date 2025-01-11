import React, { useState } from "react";
import styles from './PopupTransactionPage.module.css'
import { IAllTransaction } from "@/entities/transactionR";
import { Popup,Button } from "antd-mobile";

type Props = {
  transaction: IAllTransaction;
  visible:boolean,
  setVisible:React.Dispatch<React.SetStateAction<boolean>>
};
export function PopupTransactionPage({transaction, setVisible,visible}:Props) {
  // const [visible, setVisible] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null); // ID редактируемого комментария
const [newCommentText, setNewCommentText] = useState(""); // Текст нового комментария
const [newPhotoUrl, setNewPhotoUrl] = useState(""); // URL новой фотографии

  return (
    <div>
      <Popup
      closeOnSwipe={true}
        visible={visible}
        onMaskClick={() => setVisible(false)}
        position="bottom"
        bodyStyle={{ height: "66vh" }} // 2/3 экрана
      >
        <div className={styles.popupContent}>
          {/* Заголовок и кнопка закрытия */}
          <div className={styles.header}>
            <div className={styles.title}>{transaction.description}</div>
            <Button color="primary" onClick={() => setVisible(false)}>
              Закрыть
            </Button>
          </div>

          <div className={styles.content}>
            <div className={styles.amount}>Сумма: {transaction.sum} ₽</div>

            <div className={styles.date}>
              Дата и время: {new Date(transaction.createdAt).toLocaleString()}
            </div>

            {
  transaction.TransactionComments && transaction.TransactionComments.length > 0 && (
    <div className={styles.commentsSection}>
      <div className={styles.sectionTitle}>Комментарии:</div>
      {transaction.TransactionComments.map((el) => (
        <div key={el.id} className={styles.commentItem}>
          {editingCommentId === el.id ? (
            // Редактирование комментария
            <div>
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              />
              <button
                onClick={() => {
                  // Логика сохранения изменений
                  // saveCommentChanges(el.id, newCommentText);
                  setEditingCommentId(null);
                }}
              >
                Сохранить
              </button>
              <button onClick={() => setEditingCommentId(null)}>Отмена</button>
            </div>
          ) : (
            // Отображение комментария
            <div>
              <div className={styles.commentsText}>{el.text}</div>
              <button onClick={() => {
                setEditingCommentId(el.id);
                setNewCommentText(el.text);
              }}>
                Редактировать
              </button>
              <button >Удалить</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

            {transaction.TransactionRPhotos &&
              transaction.TransactionRPhotos.length > 0 && (
                <div className={styles.gallerySection}>
                  <div className={styles.sectionTitle}>Фотографии:</div>
                  <div className={styles.gallery}>
                    {transaction.TransactionRPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.url}
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
