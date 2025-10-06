import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AppProvider from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
