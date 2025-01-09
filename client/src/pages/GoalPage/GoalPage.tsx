import { useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import {  Space } from 'antd';
import { GoalForm } from '@/widgets/GoalForm';
import { GoalList } from '@/widgets/GoalList';



export function GoalPage () {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <div >
      <GoalList />
      <div >
        <button
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
    </div>
  );
}
