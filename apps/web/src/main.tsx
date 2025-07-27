import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./components/providers/theme-provider";
import PreactSignalDialog from "./lib/@preact-signals-react/toas-container";
import ToasContainer from "./lib/@preact-signals-react/toas-container";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      {/* <PreactSignalDialog> */}
      {/* <ToasContainer></ToasContainer> */}
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
