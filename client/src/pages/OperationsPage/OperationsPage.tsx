import { OperationsList } from "@/widgets/OperationsList";
import styles from "./OperationsPage.module.css"; // Импортируем стили
import { InfoSlider } from "@/widgets/InfoSlider";

export function OperationsPage() {
  return (
    <div className={styles.container}>
      {/* Контейнер для слайдера */}
      <div className={styles.sliderContainer}>
        <InfoSlider />
      </div>

      {/* Контейнер для списка операций */}
      <div className={styles.operationsList}>
        <OperationsList />
      </div>
    </div>
  );
}