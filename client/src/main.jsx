import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure to import from 'react-dom/client'
import App from './App';
import { CategoriesProvider } from './CategoriesContext'; // Import CategoriesProvider
import './index.css'; // Import your CSS file

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render your app
const root = ReactDOM.createRoot(rootElement);
root.render(
  <CategoriesProvider>
    <App />
  </CategoriesProvider>
);
