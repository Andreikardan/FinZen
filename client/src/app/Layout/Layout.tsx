import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks";
import styles from "./Layout.module.css";
import  { useEffect } from "react";
import { refreshTokensThunk } from "@/entities/user";
import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";
import { getAllBudgetsThunk } from "@/entities/budget";
import { getAllTransactionsThunk } from "@/entities/budget/api";


function Layout() {
  const user = useAppSelector((state)=>state.user.user)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshTokensThunk()).unwrap()
    dispatch(getAllBudgetsThunk());
    dispatch(getAllTransactionsThunk())
  }, [dispatch]);

  return (
    <div>
      <main className={styles.root}>
        <Outlet />
      </main>
      {user && (
      <Navbar />)}
    </div>
  );
}

export default Layout;
