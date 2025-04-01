import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCategories } from "./CategoriesContext"; // Import the custom hook
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import Form from "./pages/Form";
import AdminReport from "./pages/AdminReport";

// Ensure your App component is wrapped with CategoriesProvider
const App = () => {
  const { categories, fetchCategories } = useCategories(); // Access categories from context

  useEffect(() => {
    fetchCategories(); // Fetch categories when the app mounts
  }, [fetchCategories]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1 className="text-center text-3xl font-bold">Welcome to the App!</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/form" element={<Form categoriesData={categories} />} />
        <Route path="/adminreport" element={<AdminReport />} />
      </Routes>
    </Router>
  );
};

export default App;
