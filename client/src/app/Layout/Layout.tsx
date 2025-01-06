import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import styles from "./Layout.module.css";
import  { useEffect } from "react";
import { refreshTokensThunk } from "@/entities/user";
import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/Footer";

function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshTokensThunk());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <main className={styles.root}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
