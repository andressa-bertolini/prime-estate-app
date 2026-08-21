import { Routes, Route } from "react-router-dom";
import PropertiesPage from "./propertiesPage";

const PropertiesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertiesPage />} />
    </Routes>
  );
};

export default PropertiesRoutes;