import styles from './Navbar.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Space } from "antd";
import { ROUTES } from '@/shared/enums/routes';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getAllBudgetsThunk } from '@/entities/budget';
import { HistoryOutlined, LineChartOutlined, WalletOutlined, SettingOutlined } from '@ant-design/icons';

export function Navbar(): React.ReactElement {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state)=>state.user.user)
  const navigate = useNavigate();
  
  const startGameHandler = async() =>{
    dispatch(getAllBudgetsThunk())
    navigate(ROUTES.BUDGETS)
  }
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
    <Button className={styles.button} type="button" onClick= {() => navigate(ROUTES.ANALYTICS)} >
      <div className={styles.iconContainer}>
      <Space>
        <LineChartOutlined style={{ fontSize: '41px', color:"var(--primary-light-purple)" }}/> 
        </Space>
        <span>Аналитика</span>
      </div>
    </Button>
      {/* <Button className={styles.burgerButton} type="button" onClick={() => navigate(ROUTES.SETTINGS)}>
        
        <Space>

          <SettingOutlined style={{ fontSize: '41px', color:"var(--primary-light-purple)" }}/>
        </Space>
        
      </Button> */}
      <Button className={styles.button} type="button" onClick= {() => navigate(ROUTES.SETTINGS)} >
      <div className={styles.iconContainer}>
      <Space>

        <SettingOutlined  style={{ fontSize: '41px', color:"var(--primary-light-purple)" }}/> 
        </Space>
        <span>Настройки</span>
      </div>
    </Button>
  </>
)}

    </div>
  );
}
