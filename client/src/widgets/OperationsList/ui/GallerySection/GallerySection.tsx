import React, { useState, useRef } from "react";
import { ImageViewer } from "antd-mobile";
import styles from "../PopupTransactionPage/PopupTransactionPage.module.css";
import { useAppSelector } from "@/shared/hooks/reduxHooks";

type Props = {
  transactionId: number;
  transactionType: string;
  onUploadPhoto: (file: File) => Promise<void>;
};

export const GallerySection: React.FC<Props> = ({
  transactionId,
  transactionType,
  onUploadPhoto,
}) => {
  const { allTransactionsArray } = useAppSelector((state) => state.budget);

  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentPhotos = allTransactionsArray?.find(
    (el) => el.id === transactionId
  )?.TransactionRPhotos;

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setImageViewerVisible(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        onUploadPhoto(file);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } catch (error) {
        console.error("Ошибка при загрузке фото:", error);
      }
    }
  };


  return (
    <div>
      {currentPhotos && currentPhotos.length > 0 ? (
        <div className={styles.gallerySection}>
          <div className={styles.sectionTitle}>Фотографии:</div>
          <div className={styles.gallery}>
            {currentPhotos.map((photo, index) => (
              <img
                key={index}
                src={`${import.meta.env.VITE_IMAGES_API}${photo.url}`}
                alt={`Фото ${index + 1}`}
                className={styles.photo}
                onClick={() => openImageViewer(index)}
              />
            ))}
          </div>
          {transactionType === "трата" && (
            <div className={styles.uploadSection}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={inputRef}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input" className={styles.uploadButton}>
                Загрузить фото
              </label>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.emptySection}>
          <div className={styles.sectionTitle}>Фотографии:</div>
          <div className={styles.emptyMessage}>Тут пока пусто</div>

          {transactionType === "трата" && (
            <div className={styles.uploadSection}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={inputRef}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input" className={styles.uploadButton}>
                Загрузить фото
              </label>
            </div>
          )}
        </div>
      )}

      {currentPhotos && (
        <ImageViewer
          classNames={{ body: styles.imgContainer }}
          image={`${import.meta.env.VITE_IMAGES_API}${
            currentPhotos[currentImageIndex]?.url
          }`}
          visible={imageViewerVisible}
          onClose={() => setImageViewerVisible(false)}
        />
      )}
    </div>
  );
};
