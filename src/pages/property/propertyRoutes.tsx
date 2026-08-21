import { Routes, Route } from "react-router-dom";
import PropertyPage from "./propertyPage";

const PropertyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyPage />} />
    </Routes>
  );
};

export default PropertyRoutes;