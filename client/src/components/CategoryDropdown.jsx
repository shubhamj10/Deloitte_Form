import React from "react";

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!Array.isArray(categories)) {
    return <p className="text-red-500 text-sm font-semibold">⚠️ Error: Categories data is not available.</p>;
  }

  return (
    <div className="relative w-full">
      <select
        id="category-select"
        name="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm 
             focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 
             hover:border-blue-400 transition duration-150"
      >
        <option value="" disabled className="text-gray-500">
          🏷️ Select a Category
        </option>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <option key={index} value={category} className="text-gray-900">
              {category}
            </option>
          ))
        ) : (
          <option disabled className="text-gray-400">
            ❌ No categories available
          </option>
        )}
      </select>
    </div>
  );
};

export default CategoryDropdown;
