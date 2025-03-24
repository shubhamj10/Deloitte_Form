import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const register = async () => {
    try {
      const finalData = { ...formData, role: "user" };
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        finalData
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      alert("Error registering!");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="Email"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          name="role"
          type="text"
          placeholder="Role"
          required
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          onClick={register}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
