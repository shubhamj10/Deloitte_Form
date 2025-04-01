// Updated Form.jsx
import React, { useState, useEffect } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import QuestionCard from "../components/QuestionCard";
import axios from "axios";

const Form = ({ categoriesData }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!selectedCategory) return;
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/forms/${selectedCategory}`);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [selectedCategory]);
  const handleAnswerChange = (questionId, answer) => {
    const questionData = questions.find((q) => q._id === questionId);
    if (!questionData) {
      console.error("Question not found:", questionId);
      return;
    }

    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.filter(response => response.questionId !== questionId);
      updatedResponses.push({ questionId, answer });

      console.log("Updated Responses:", updatedResponses); // Debugging
      return updatedResponses;
    });
  };



  const handleSubmit = async () => {
    if (!selectedCategory || responses.length === 0) {
      setMessage('Please complete the survey before submitting.');
      return;
    }
  
    try {
      const formResponse = await axios.get(`http://localhost:5000/api/forms/${selectedCategory}`);
      const formId = formResponse.data.formId;
  
      // Convert answer to Number before sending
      const formattedResponses = responses.map(r => ({
        questionId: r.questionId,
        answer: Number(r.answer) || 0
      }));
  
      const payload = { formId, responses: formattedResponses };
      console.log("Submitting Payload:", payload); // ✅ Debugging step
  
      await axios.post(
        `http://localhost:5000/api/forms/submit`,
        payload,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
  
      setMessage('Survey submitted successfully!');
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      setMessage('Failed to submit survey.');
    }
  };
  



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Deloitte Survey Form</h2>
        <CategoryDropdown categories={categoriesData} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        {selectedCategory && (
          <div className="mt-4">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <QuestionCard key={index} question={question} handleAnswerChange={handleAnswerChange} />
              ))
            ) : (
              <p>Loading questions...</p>
            )}
          </div>
        )}
        <button onClick={handleSubmit} className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">Submit Survey</button>
        {message && <p className={`mt-4 text-center ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Form;
