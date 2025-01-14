import { useEffect, useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Select, Space} from 'antd';
import { GoalForm } from '@/widgets/GoalForm';
import { GoalList } from '@/widgets/GoalList';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { BudgetStatistics } from '@/widgets/BudgetStatistics/ui/BudgetStatistics';
import { getBudgetByIdThunk } from '@/entities/budget';
import { Option } from 'antd/es/mentions';
import styles from "../BudgetsPage/BudgetsPage.module.css"

export function GoalPage() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const budget = useAppSelector((state) => state.budget.currentBudget); 
  const budgets = useAppSelector((state) => state.budget.budgets);  

console.log(budget,999);


  useEffect(() => {
    if (selectedBudgetId) {
      dispatch(getBudgetByIdThunk(selectedBudgetId));
    }
  }, [selectedBudgetId, dispatch]);



 
  const transactionDs = 

        budget?.CategoryDs?.flatMap((category) =>
          category.TransactionDs?.map((transactionD) => ({
            ...transactionD,
            category_icon: category.icon,
          })) || []
        ) || []
     
console.log(transactionDs, 77);


  const transactionRs = 

        budget?.CategoryRs?.flatMap((category) =>
          category.TransactionRs?.map((transactionR) => ({
            ...transactionR,
            category_icon: category.icon,
          })) || []
        ) || []


  const handleBudgetSelect = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
  };

  const hasTransactions = () => {
    return transactionDs.length > 0 || transactionRs.length > 0;
  };

  const categoriesRs = budget?.CategoryRs || [];
  const categoriesDs = budget?.CategoryDs || [];

  return (
    <div>
       <div>
      <GoalList />
      <div>
        <button className={styles.buttonContainer}
          color="var(--primary-light-purple)"
          onClick={() => setIsModalVisible(true)}
        >
          <Space>
            <PlusSquareOutlined style={{ fontSize: "32px" }} />
          </Space>
        </button>
      </div>
      {isModalVisible && (
        <GoalForm
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      )}
      <Select
        placeholder="Статистика по бюджету"
        onChange={(value) => handleBudgetSelect(Number(value))}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {budgets.map((budget) => (
          <Option key={budget.id.toString()} value={budget.id.toString()}>
            {budget.name} - {budget.sum} ₽
          </Option>
        ))}
      </Select>


    
    </div>

    {budget && hasTransactions() &&(
        <BudgetStatistics
          transactionDs={transactionDs}
          transactionRs={transactionRs}
          categoriesRs={categoriesRs}
          categoriesDs={categoriesDs}
        />
      )}
    </div>
   

  );
}