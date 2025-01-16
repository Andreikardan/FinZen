import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/normalize.css";
import "./styles/reset.css";
import "./styles/variables.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import 'antd/dist/reset.css'

createRoot(document.getElementById("root")!).render(
<Provider store={store}>
<App />
</Provider>);
