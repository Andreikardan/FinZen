import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { useMobileOrientation, isMobile } from 'react-device-detect'; 
import { useEffect} from "react";
import "./App.css";
import { useAppDispatch } from "@/shared/hooks/reduxHooks";
import { refreshTokensThunk } from "@/entities/user";

function App(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const { isLandscape } = useMobileOrientation();

  const handleVisibilityChange =() => {
    const state = document.visibilityState

    if (state === 'visible' && isMobile) {
      dispatch(refreshTokensThunk()).unwrap()
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
}
}, []);


return (
   
      <div className="container">
        <RouterProvider router={router} />
          {(isLandscape || window.innerWidth > 500) && 
          <div className="orientation">
            <div className="message">
            <h2>Переверните телефон</h2>;
            </div>
          </div>}
          {!isMobile && 
          <div className="orientation">
            <div className="message">
            <h2>Такой формат не поддерживается</h2>;
            </div>
          </div>}
      </div>
 
  );
}

export default App;
