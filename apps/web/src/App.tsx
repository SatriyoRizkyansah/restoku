// src/App.tsx
import { useRoutes } from "react-router-dom";
import { routesSections } from "./routes/section";

function App() {
  const routes = useRoutes(routesSections);
  return routes;
}

export default App;
