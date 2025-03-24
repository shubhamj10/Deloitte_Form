// src/components/QuestionCard.jsx
import React, { useState, useEffect } from "react";

const QuestionCard = ({ question, handleAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  // Update the parent component with the selected answer
  useEffect(() => {
    handleAnswerChange(question.text, selectedAnswer);
  }, [selectedAnswer, question.text, handleAnswerChange]);

  const handleAnswerChangeLocal = (e) => {
    setSelectedAnswer(e.target.value);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <p className="text-lg font-semibold text-gray-700 mb-2">{question.text}</p>
      <select
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={selectedAnswer}
        onChange={handleAnswerChangeLocal}
      >
        <option value="" disabled>
          Select an answer
        </option>
        {question.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuestionCard;
