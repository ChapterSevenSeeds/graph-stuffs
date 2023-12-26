import App from "./App";
import ReactDOM from "react-dom/client";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div>
    <CssBaseline />
    <App />
  </div>
);