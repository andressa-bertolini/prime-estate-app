import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

import Navigation from "@/layouts/Navigation";
import Footer from "@/layouts/Footer";
import Home from "@/pages/home";
import PropertiesRoutes from "@/pages/properties/propertiesRoutes";
import PropertyRoutes from "@/pages/property/propertyRoutes";
import AboutRoutes from "@/pages/about/aboutRoutes";
import AgentsRoutes from "@/pages/agents/agentsRoutes";
import CalculatorRoutes from "@/pages/calculator/calculatorRoutes";

const AppRoutes = () => {
  return (
    <Router basename="/prime-estate">
      <ScrollToTop />
      <div className="App">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<PropertiesRoutes />} />
              <Route path="/property/:id" element={<PropertyRoutes />} />
              <Route path="/about-us" element={<AboutRoutes />} />
              <Route path="/realtors" element={<AgentsRoutes />} />
              <Route path="/calculator" element={<CalculatorRoutes />} />
            </Routes>
          </main>
          <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;