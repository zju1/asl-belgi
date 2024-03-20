import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import "./styles/reset.css";
import "./i18n";
import "react-spring-bottom-sheet/dist/style.css";
import "react-router-dom/server.mjs";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
