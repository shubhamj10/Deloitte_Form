import React, { useState } from 'react';
import CategoryDropdown from '../components/CategoryDropdown';
import QuestionCard from '../components/QuestionCard';
import axios from 'axios';

const Form = ({ categoriesData }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState('');

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setQuestions(categoriesData[category] || []);
  };

  // Handle answer change
  const handleAnswerChange = (questionText, answer) => {
    const questionData = questions.find((q) => q.text === questionText); // Find the question from the list
    if (!questionData) return;
  
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter(
        (response) => response.question !== questionText
      );
      updatedResponses.push({
        question: questionText,
        ratings: answer,
        weightage: questionData.weightage,
      });
      return updatedResponses;
    });
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedCategory || responses.length === 0) {
      setMessage('Please complete the survey before submitting.');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/submit`,
        {
          categoryName: selectedCategory,
          ratings: responses,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
      setMessage('Survey submitted successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit survey.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Deloitte Survey Form</h2>

        {/* Category Dropdown */}
        <CategoryDropdown
          categories={Object.keys(categoriesData)}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Display questions for selected category */}
        {selectedCategory && (
          <div className="mt-4">
            {questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                handleAnswerChange={handleAnswerChange}
              />
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Submit Survey
        </button>

        {/* Success/Error Message */}
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes('successfully') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
