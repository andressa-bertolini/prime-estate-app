import { Routes, Route } from "react-router-dom";
import PropertiesPage from "./pages/propertiesPage/propertiesPage";

const PropertiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertiesPage />} />
    </Routes>
  );
};

export default PropertiesRoutes;