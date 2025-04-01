import React, { useState } from "react";

const QuestionCard = ({ question, handleAnswerChange }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleAnswerChangeLocal = (e) => {
    const newAnswer = e.target.value;
    setSelectedAnswer(newAnswer);
    handleAnswerChange(question._id, newAnswer); // Pass `_id` instead of `text`
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm">
      <p className="text-lg font-semibold text-gray-700 mb-2">{question.text}</p>
      <p className="text-sm text-gray-500">Weightage: {question.weightage}</p>

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
