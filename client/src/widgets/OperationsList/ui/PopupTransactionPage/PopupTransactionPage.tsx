import { Popup, Button, Toast } from "antd-mobile";
import styles from "./PopupTransactionPage.module.css";
import React, { useState, useEffect } from "react";
import { IAllTransaction } from "@/entities/transactionR";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { IApiResponseSuccess } from "@/shared/types";
import { IComment } from "@/entities/comments";
import { CommentsSection } from "../CommentsSection/CommentsSection"; 
import { GallerySection } from "../GallerySection/GallerySection"; 

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
  const [photos, setPhotos] = useState(transaction.TransactionRPhotos || []);
  const [comments, setComments] = useState(transaction.TransactionComments || []);
  

 
  useEffect(() => {
    setPhotos(transaction.TransactionRPhotos || []);
    setComments(transaction.TransactionComments || []);
  }, [transaction]);

  const handleAddComment = async (text: string) => {
    try {
      const response = await axiosInstance.post<IApiResponseSuccess<IComment>>(
        "/comments",
        {
          transaction_id: transaction.id,
          text: text,
        }
      );

      if (response.data.statusCode === 201) {
        setComments([...comments, response.data.data]);
        Toast.show({
          content: "Комментарий добавлен",
          icon: "success",
          position: "bottom",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Не удалось добавить комментарий",
      });
    }
  };

  const handleUpdateComment = async (id: number, text: string) => {
    try {
      const updateComment = await axiosInstance.put<
        IApiResponseSuccess<IComment>
      >("/comments", {
        id: id,
        text: text,
      });

      if (updateComment.data.statusCode === 200) {
        const updatedComments = comments.map((comment) =>
          comment.id === id ? { ...comment, text: text } : comment
        );
        setComments(updatedComments); 
        Toast.show({
          content: "Изменено",
          icon: "success",
          position: "bottom",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Что-то не так",
      });
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      const response = await axiosInstance.delete<IApiResponseSuccess<null>>(
        `/comments/${id}`
      );

      if (response.data.statusCode === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== id
        );
        setComments(updatedComments);
        Toast.show({
          content: "Комментарий удален",
          icon: "success",
          position: "bottom",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Не удалось удалить комментарий",
      });
    }
  };

  const handleUploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("trPhoto", file);

    try {
      const response = await axiosInstance.post(
        `/imagesForTransaction/upload/${transaction.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.statusCode === 201) {
        setPhotos([...photos, response.data.data]); 
        Toast.show({
          content: "Фото загружено",
          icon: "success",
          position: "bottom",
        });
      }

      return response.data.data;
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Не удалось загрузить фото",
      });
      throw error;
    }
  };

  return (
    <div>
      <Popup
        closeOnSwipe={true}
        visible={visible}
        onMaskClick={() => setVisible(false)}
        position="bottom"
        bodyStyle={{ height: "50vh" }}
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

            <CommentsSection
              comments={comments}
              transactionType={transaction.type}
              transactionId={transaction.id}
              onAddComment={handleAddComment}
              onUpdateComment={handleUpdateComment}
              onDeleteComment={handleDeleteComment}
            />

            <GallerySection
              photos={photos}
              // transactionId={transaction.id}
              transactionType={transaction.type}
              onUploadPhoto={handleUploadPhoto}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
}