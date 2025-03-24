import React from 'react';

const Dropdown = ({ options, selectedAnswer, handleAnswerChange }) => {
  return (
    <select
      value={selectedAnswer}
      onChange={handleAnswerChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="" disabled>
        Select an answer
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
