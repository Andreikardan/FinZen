import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { isMobile, useMobileOrientation } from "react-device-detect";
import { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { refreshTokensThunk } from "@/entities/user";
import { LandingPage } from "@/pages/LandingPage/LandingPage";
import { Layout } from "antd";

function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [isDesktop, setIsDesktop] = useState(!isMobile);
  const { isLandscape } = useMobileOrientation();

  const handleVisibilityChange = () => {
    const state = document.visibilityState;

    if (state === "visible" && isMobile) {
      dispatch(refreshTokensThunk()).unwrap();
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1000 && !isMobile);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <div className="container">
      {isDesktop && <LandingPage />}

      {((isLandscape && isMobile) ||
        (window.innerWidth > 500 && window.innerWidth < 1000)) && (
        <div className="orientation">
          <div className="message">
            <h2>Переверните телефон</h2>
          </div>
        </div>
      )}

      {!isDesktop && isMobile && <Layout />}

      {!isDesktop && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
