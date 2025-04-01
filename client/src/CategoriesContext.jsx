import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

// Create the context
const CategoriesContext = createContext();

// Create a custom hook to use the context
export const useCategories = () => {
  return useContext(CategoriesContext);
};

// Provide context to the app
export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/forms/categories");
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error("Invalid categories data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, fetchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
