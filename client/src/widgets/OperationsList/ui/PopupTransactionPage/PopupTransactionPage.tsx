import { Popup, Toast } from "antd-mobile";
import styles from "./PopupTransactionPage.module.css";
import React, { useState } from "react";
import { IAllTransaction } from "@/entities/transactionR";
import { axiosInstance } from "@/shared/lib/axiosInstance";
import { IApiResponseSuccess } from "@/shared/types";
import { IComment } from "@/entities/comments";
import { CommentsSection } from "../CommentsSection/CommentsSection";
import { GallerySection } from "../GallerySection/GallerySection";
import { useAppDispatch } from "@/shared";
import { addPhotoToTransactionRThunk } from "@/entities/budget/api";

type Props = {
  transaction: IAllTransaction | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export function PopupTransactionPage({
  transaction,
  setVisible,
  visible,
}: Props) {
  const [comments, setComments] = useState(
    transaction?.TransactionComments || []
  );
  const dispatch = useAppDispatch();

  if (!transaction) {
    return <></>;
  }

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
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Ошибка",
        position: "top",
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
          content: "Комментарий изменен",
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Ошибка",
        position: "top",
      });
    }
  };

  const handleDeleteComment = async (id: number) => {
    try {
      const response = await axiosInstance.delete<IApiResponseSuccess<null>>(
        `/comments/${id}`
      );

      if (response.data.statusCode === 200) {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
        Toast.show({
          content: "Комментарий удален",
          position: "top",
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Ошибка",
        position: "top",
      });
    }
  };

  const handleUploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append("trPhoto", file);

    try {
      await dispatch(
        addPhotoToTransactionRThunk({ id: transaction.id, formData })
      ).unwrap()

      Toast.show({
        content: "Фото загружено",
        position: "top",
      });
    } catch (error) {
      console.error(error);
      Toast.show({
        content: "Ошибка",
        position: "top",
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
              transactionId={transaction.id}
              transactionType={transaction.type}
              onUploadPhoto={handleUploadPhoto}
            />
          </div>
        </div>
      </Popup>
    </div>
  );
}
