import { Routes, Route } from "react-router-dom";
import AgentsPage from "./agentsPage";

const AgentsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AgentsPage />} />
    </Routes>
  );
};

export default AgentsRoutes;