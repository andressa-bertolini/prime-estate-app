import { Routes, Route } from "react-router-dom";
import CalculatorPage from "./pages/calculatorPage/calculatorPage";

const CalculatorRoutes = () => {
  return(
    <Routes>
      <Route path="/" element={<CalculatorPage/>} />
    </Routes>
  );
}

export default CalculatorRoutes;