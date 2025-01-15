// import styles from './CommentsSection.module.css'
import React, { useState } from "react";
import { Button, TextArea, Toast } from "antd-mobile";
import styles from "../PopupTransactionPage/PopupTransactionPage.module.css";
import { ArrayCommentsType } from "@/entities/comments";

type Props = {
  comments: ArrayCommentsType;
  transactionId: number;
  transactionType: string; // Добавляем тип операции
  onAddComment: (text: string) => void;
  onUpdateComment: (id: number, text: string) => void;
  onDeleteComment: (id: number) => void;
};

export const CommentsSection: React.FC<Props> = ({
  comments,
  transactionType, 
  onAddComment,
  onUpdateComment,
  onDeleteComment,
}) => {
  
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleUpdate = async () => {
    if (editingCommentId !== null) {
      onUpdateComment(editingCommentId, newCommentText);
      setEditingCommentId(null);
      setNewCommentText("");
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Toast.show({
        content: "Что-то пошло не так...",
        position:'top'
      });
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <>
      {comments.length > 0 ? (
        <div className={styles.commentsSection}>
          <div className={styles.sectionTitle}>Комментарии:</div>
          {comments.map((el) => (
            <div key={el.id} className={styles.commentItem}>
              {editingCommentId === el.id ? (
                <div>
                  <TextArea
                    value={newCommentText}
                    onChange={(value) => setNewCommentText(value)}
                    placeholder="Введите текст комментария"
                  />
                  <Button
                    onClick={() => {
                      handleUpdate();
                      setEditingCommentId(null);
                    }}
                  >
                    Сохранить
                  </Button>
                  <Button onClick={() => setEditingCommentId(null)}>
                    Отмена
                  </Button>
                </div>
              ) : (
                <div>
                  <div className={styles.commentsText}>{el.text}</div>
                  <Button
                    onClick={() => {
                      setEditingCommentId(el.id);
                      setNewCommentText(el.text);
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button onClick={() => onDeleteComment(el.id)}>
                    Удалить
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptySection}>
          <div className={styles.sectionTitle}>Комментарии:</div>
          <div className={styles.emptyMessage}>Тут пока пусто</div>
        </div>
      )}

      {transactionType === "трата" && ( 
        <div className={styles.addCommentSection}>
          <TextArea
            value={newComment}
            onChange={(value) => setNewComment(value)}
            placeholder="Введите свой комментарий"
          />
          <Button onClick={handleAddComment} color="primary">
            Добавить 
          </Button>
        </div>
      )}
    </>
  );
};