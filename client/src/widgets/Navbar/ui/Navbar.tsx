import styles from './Navbar.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, MenuProps, Space } from "antd";
import { signOutThunk} from '@/entities/user';
import { ROUTES } from '@/shared/enums/routes';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getAllBudgetsThunk } from '@/entities/budget';
import { HistoryOutlined, LineChartOutlined, MenuOutlined, WalletOutlined } from '@ant-design/icons';

export function Navbar(): React.ReactElement {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state)=>state.user.user)
  const navigate = useNavigate();
  


 const startGameHandler = async() =>{
  dispatch(getAllBudgetsThunk())

  navigate(ROUTES.BUDGETS)
 }


  const signOutHandler = async (): Promise<void> => {
    dispatch(signOutThunk())
   
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel=" " href="https:">
          Редактировать
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel=" " href="https:">
          Категории
        </a>
      ),
    },

  ];



  return (
    
    <div className={styles.container}>

 
{user && (
  <>
    <Button className={styles.button} type="button" onClick={() => navigate(ROUTES.OPERATIONS)}>
      <div className={styles.iconContainer}>
        <Space>
        <HistoryOutlined style={{ fontSize: '40px', color:"var(--primary-light-purple)"}}/> 
        </Space>
      
        <span>Операции</span>
      </div>
    </Button>
    <Button className={styles.button} type="button" onClick={startGameHandler}>
      <div className={styles.iconContainer}>
      <Space>
      <WalletOutlined  style={{ fontSize: '41px', color:"var(--primary-light-purple)" }}/> 
        </Space>
        <span >Бюджет</span>
      </div>
    </Button>
    <Button className={styles.button} type="button" onClick={signOutHandler}>
      <div className={styles.iconContainer}>
      <Space>
        <LineChartOutlined style={{ fontSize: '41px', color:"var(--primary-light-purple)" }}/> 
        </Space>
        <span>Аналитика</span>
      </div>
    </Button>
    <Dropdown menu={{ items }} trigger={['click']} placement="top">
      <Button className={styles.burgerButton} type="submit">
      <Space>
        <MenuOutlined style={{ fontSize: '32px' }}/> 
        </Space>
      </Button>
    </Dropdown>
  </>
)}

    </div>
  );
}
