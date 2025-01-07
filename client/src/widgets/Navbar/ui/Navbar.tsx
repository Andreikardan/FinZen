import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { Dropdown, MenuProps } from "antd";
import { signOutThunk} from '@/entities/user';
import { ROUTES } from '@/shared/enums/routes';
import { Button } from '@/shared/ui/Button';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/reduxHooks';
import { getAllBudgetsThunk } from '@/entities/budget';

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
        <img src="../../../../Операции.png" className={styles.icon} alt="Операции" />
        <span>Операции</span>
      </div>
    </Button>
    <Button className={styles.button} type="button" onClick={startGameHandler}>
      <div className={styles.iconContainer}>
        <img src="../../../../Бюджет.png" className={styles.icon} alt="Бюджет" />
        <span >Бюджет</span>
      </div>
    </Button>
    <Button className={styles.button} type="button" onClick={signOutHandler}>
      <div className={styles.iconContainer}>
        <img src="../../../../Аналитика.png" className={styles.icon} alt="Аналитика" />
        <span>Аналитика</span>
      </div>
    </Button>
    <Dropdown menu={{ items }} trigger={['click']} placement="top">
      <Button className={styles.burgerButton} type="submit">
      <div className={styles.Container}>
        <img src="../../../../Бургер1.png" className={styles.icon} alt="Аналитика" />
      </div>
      </Button>
    </Dropdown>
  </>
)}
    </div>
  );
}
