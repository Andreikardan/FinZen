import { useEffect, useState, useRef } from 'react';
import { PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import { GoalForm } from '@/widgets/GoalForm';
import { GoalList } from '@/widgets/GoalList';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { BudgetStatistics } from '@/widgets/BudgetStatistics/ui/BudgetStatistics';
import { getBudgetByIdThunk } from '@/entities/budget';
import { Option } from 'antd/es/mentions';
import styles from "../BudgetsPage/BudgetsPage.module.css";

export function GoalPage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);  

  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.budget.currentBudget);
  const budgets = useAppSelector((state) => state.budget.budgets);

 
  const budgetStatisticsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedBudgetId) {
      setIsDataLoaded(false);
      dispatch(getBudgetByIdThunk(selectedBudgetId)).then(() => {
        setIsDataLoaded(true);
      });
    }
  }, [selectedBudgetId, dispatch]);

  useEffect(() => {
    if (isDataLoaded && budgetStatisticsRef.current) {
      const budgetStatisticsTop = budgetStatisticsRef.current.offsetTop;
      const offset = 80;  
      window.scrollTo({
        top: budgetStatisticsTop - offset,
        behavior: 'smooth',  
      });
    }
  }, [isDataLoaded]);

  const transactionDs =
    budget?.CategoryDs?.flatMap((category) =>
      category.TransactionDs?.map((transactionD) => ({
        ...transactionD,
        category_icon: category.icon,
      })) || []
    ) || [];

  const transactionRs =
    budget?.CategoryRs?.flatMap((category) =>
      category.TransactionRs?.map((transactionR) => ({
        ...transactionR,
        category_icon: category.icon,
      })) || []
    ) || [];

  const handleBudgetSelect = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
  };

  const hasTransactions = () => {
    return transactionDs.length > 0 || transactionRs.length > 0;
  };

  const categoriesRs = budget?.CategoryRs || [];
  const categoriesDs = budget?.CategoryDs || [];

  return (
    <div className={styles.container}>
      <div>
        <GoalList />
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

        <GoalForm
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />

        <div style={{ marginTop: '40px' }}>
          <Select
            placeholder="Статистика по бюджету"
            onChange={(value) => handleBudgetSelect(Number(value))}
            style={{ width: "100%", marginBottom: "10px", fontWeight: "bolder", color: "#333" }}
          >
            {budgets.map((budget) => (
              <Option key={budget.id.toString()} value={budget.id.toString()}>
                {budget.name} - {budget.sum} ₽
              </Option>
            ))}
          </Select>
        </div>
      </div>

     
      <div ref={budgetStatisticsRef} style={{ minHeight: '300px', marginTop: '15px' }}>
        {budget && hasTransactions() ? (
          <BudgetStatistics
            transactionDs={transactionDs}
            transactionRs={transactionRs}
            categoriesRs={categoriesRs}
            categoriesDs={categoriesDs}
          />
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Нет данных о расходах и доходах</p>
        )}
      </div>
    </div>
  );
}
   

