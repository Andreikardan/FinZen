import { Button } from '@/shared/ui/Button';
import { BudgetAddButton, BudgetAddModal } from '@/widgets/BudgetAddModal/ui/BudgetAddModal';
import { BudgetForm } from '@/widgets/BudgetForm';
import { BudgetList } from '@/widgets/BudgetList/ui/BudgetList';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useState } from 'react';


export function BudgetPage() {
  const [isModalVisible,setIsModalVisible] = useState(false)
  return (
    <div>
      <BudgetList/>
      <Button color='var(--primary-light-purple)'  onClick={()=>setIsModalVisible(true)}>
        <Space>
        <PlusSquareOutlined style={{fontSize: '32px'}} />
        </Space>
      </Button>
    {isModalVisible && <BudgetAddModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>}

    </div>
  );
}

