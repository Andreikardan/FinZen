import styles from "./OperationsPage.module.css"; 
import { OperationsList } from "@/widgets/OperationsList";
import { InfoSlider } from "@/widgets/InfoSlider";

export function OperationsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <InfoSlider />
      </div>

      <div className={styles.operationsList}>
        <OperationsList />
      </div>
    </div>
  );
}