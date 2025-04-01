import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ selectedCategory, userId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [formId, setFormId] = useState(null);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`/api/forms/${selectedCategory}`);
        setFormId(response.data.formId);
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [selectedCategory]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const formattedResponses = Object.keys(answers).map((questionId) => ({
      questionId,
      answer: answers[questionId],
    }));

    try {
      await axios.post("/api/forms/submit", { formId, userId, responses: formattedResponses });
      alert("Survey submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit survey.");
    }
  };

  return (
    <div>
      {questions.length > 0 ? (
        <>
          {questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              handleAnswerChange={handleAnswerChange}
            />
          ))}
          <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            Submit
          </button>
        </>
      ) : (
        <p>No questions available for this category.</p>
      )}
    </div>
  );
};

export default QuestionList;
