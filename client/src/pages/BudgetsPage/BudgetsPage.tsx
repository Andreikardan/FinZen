import styles from "./BudgetsPage.module.css";
import { useState } from "react";
import { Space } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "@/shared/ui/Button";
import { BudgetAddModal } from "@/widgets/BudgetAddModal";
import { BudgetsList } from "@/widgets/BudgetsList";

export function BudgetsPage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <div>
      <BudgetsList />
      <div className={styles.buttonContainer}>
        <Button
          color="var(--primary-light-purple)"
          onClick={() => setIsModalVisible(true)}
        >
          <Space>
            <PlusSquareOutlined style={{ fontSize: "32px" }} />
          </Space>
        </Button>
      </div>
      {isModalVisible && (
        <BudgetAddModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </div>
  );
}
