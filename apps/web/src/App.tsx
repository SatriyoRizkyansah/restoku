// src/App.tsx
import { useRoutes } from "react-router-dom";
import { routesSections } from "./routes/section";

function App() {
  const routes = useRoutes(routesSections);
  console.log("App component rendered");
  return routes;
}

export default App;
