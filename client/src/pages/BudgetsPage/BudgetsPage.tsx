import styles from "./BudgetsPage.module.css";
import { useState } from "react";
import { Space, Button } from "antd";
import { PlusOutlined  } from "@ant-design/icons";
import { BudgetAddModal } from "@/widgets/BudgetAddModal";
import { BudgetsList } from "@/widgets/BudgetsList";


export function BudgetsPage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
 



  return (
    <div className={styles.container}>
      <BudgetsList />

      <div className={styles.buttonContainer}>
        <Button
          type="primary"
          className={styles.addButton}
          onClick={() => setIsModalVisible(true)}
        >
          <Space>
          <PlusOutlined className={styles.addIcon} />
          </Space>
        </Button>
      </div>

      
        <BudgetAddModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      
    </div>
  );
}
