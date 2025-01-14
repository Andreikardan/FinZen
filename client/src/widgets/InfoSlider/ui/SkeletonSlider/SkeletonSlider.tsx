import styles from "./SkeletonSlider.module.css";

export const SkeletonSlider = () => {
  return (
    <div className={styles.skeletonSliderContainer}>
      <div className={styles.skeletonSlide}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonImage}></div>
      </div>
    </div>
  );
};