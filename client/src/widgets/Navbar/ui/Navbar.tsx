import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
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

  return (

    <div className={styles.container}>
      <Button className = {styles.button} text="Главная"  type="button" onClick={()=>navigate(ROUTES.HOME)} />
      {user ? (
        <>
          <Button className = {styles.button} text="Бюджеты"  type="button" onClick={startGameHandler} />
          <Button className = {styles.button} text="Выход"  type="button" onClick={signOutHandler} />
        </>
      ) : (
        <>
          <Button 
            className = {styles.button}
            text="Вход"
            type="button"
            onClick={() => navigate(`${ROUTES.AUTH_ROOT}/signin`)}
          />
          <Button
            className = {styles.button}
            text="Регистрация"
            type="button"
            onClick={() => navigate(`${ROUTES.AUTH_ROOT}/signup`)}
          />
        </>

      )}
    </>
  );
}
