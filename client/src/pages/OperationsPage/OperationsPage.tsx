import { OperationsList } from "@/widgets/OperationsList";
import styles from "./OperationsPage.module.css"; // Импортируем стили
import { InfoSlider } from "@/widgets/InfoSlider";

export function OperationsPage() {
  return (
    <div>
      <div className={styles.sliderContainer}>
        <InfoSlider />
      </div>
      <div className={styles.operationsList}>
        <OperationsList />
      </div>
    </div>
  );
}