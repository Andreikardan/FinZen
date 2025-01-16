import styles from './Navbar.module.css';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Space } from "antd";
import { ROUTES } from '@/shared/enums/routes';
import { Button } from '@/shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getAllBudgetsThunk } from '@/entities/budget';
import { HistoryOutlined, LineChartOutlined, WalletOutlined, SettingOutlined, PieChartOutlined } from '@ant-design/icons';

export function Navbar(): React.ReactElement {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();  

  const startGameHandler = async () => {
    dispatch(getAllBudgetsThunk());
    navigate(ROUTES.BUDGETS);
  };

   
  const isActive = (route: string) => location.pathname === route;

  return (
    <div className={styles.container}>
      {user && (
        <>
          <Button
            className={styles.button}
            type="button"
            onClick={() => navigate(ROUTES.OPERATIONS)}
          >
            <div className={styles.iconContainer}>
              <Space>
                <HistoryOutlined
                  style={{
                    fontSize: '40px',
                    color: isActive(ROUTES.OPERATIONS) ? "var(--primary-light-purple)" : "var(--primary-gray-2)",
                  }}
                />
              </Space>
             
            </div>
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={startGameHandler}
          >
            <div className={styles.iconContainer}>
              <Space>
                <WalletOutlined
                  style={{
                    fontSize: '41px',
                    color: isActive(ROUTES.BUDGETS) ? "var(--primary-light-purple)" : "var(--primary-gray-2)",
                    borderRadius: "8px",
                  }}
                />
              </Space>
              
              
            </div>
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => navigate(ROUTES.ANALYTICS)}
          >
            <div className={styles.iconContainer}>
              <Space>
                <PieChartOutlined
                  style={{
                    fontSize: '41px',
                    color: isActive(ROUTES.ANALYTICS) ? "var(--primary-light-purple)" : "var(--primary-gray-2)",
                  }}
                />
              </Space>
           
            </div>
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => navigate(ROUTES.SETTINGS)}
          >
            <div className={styles.iconContainer}>
              <Space>
                <SettingOutlined
                  style={{
                    fontSize: '41px',
                    color: isActive(ROUTES.SETTINGS) ? "var(--primary-light-purple)" : "var(--primary-gray-2)",
                  }}
                />
              </Space>
        
            </div>
          </Button>
        </>
      )}
    </div>
  );
}
