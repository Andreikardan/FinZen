import React, { useState, useRef } from "react";
import { ImageViewer } from "antd-mobile";
import styles from "../PopupTransactionPage/PopupTransactionPage.module.css";
import { ArrayPhotoType } from "@/entities/photo";

type Props = {
  photos: ArrayPhotoType;
  transactionType: string;
  onUploadPhoto: (file: File) => Promise<void>;
};

export const GallerySection: React.FC<Props> = ({
  photos,
  transactionType,
  onUploadPhoto,
}) => {
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setImageViewerVisible(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await onUploadPhoto(file);
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
      {photos.length > 0 ? (
        <div className={styles.gallerySection}>
          {" "}
          //!!!!!!!!!
          <div className={styles.sectionTitle}>Фотографии:</div>
          <div className={styles.gallery}>
            {photos.map((photo, index) => (
              
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

      <ImageViewer
        classNames={{body:styles.imgContainer}}
        image={`${import.meta.env.VITE_IMAGES_API}${photos[currentImageIndex]?.url}`}
        visible={imageViewerVisible}
        onClose={() => setImageViewerVisible(false)}
      />
    </div>
  );
};
