import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting to log in with:", {
      username: formData.username,
      password: formData.password,
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, null, {
        params: {
          username: formData.username,
          password: formData.password,
        },
      });

      console.log("Login successful:", response.data);
      sessionStorage.setItem("access_token", response.data.access_token); // Save token
      navigate("/workouts"); // Redirect to workouts
    } catch (error) {
      if (error.response) {
        console.error("Login error details:", error.response.data);
      } else {
        console.error("Network error:", error.message);
      }

      const errorDetail = error.response?.data?.detail || "Login failed.";
      setErrorMessage(errorDetail);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register the user
      await axios.post(`${API_BASE_URL}/auth/register`, formData);

      // Automatically log the user in after registration
      const loginResponse = await axios.post(
        `${API_BASE_URL}/auth/login`,
        null,
        {
          params: {
            username: formData.username,
            password: formData.password,
          },
        }
      );

      // Store the access token and redirect
      sessionStorage.setItem("access_token", loginResponse.data.access_token); // Save token
      navigate("/workouts"); // Redirect to workouts
    } catch (error) {
      const errorDetail =
        error.response?.data?.detail ||
        "Registration or login failed. Please try again.";
      setErrorMessage(errorDetail);
    }
  };

  return (
    <div
    className="flex items-center justify-center min-h-screen bg-cover bg-center bg-repeat"
    style={{ backgroundImage: 'url("./run.jpg")' }} 
  >

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">

        <h1 className="text-6xl font-bold text-center text-gray-800 mb-8">
          Gym4Us
        </h1>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        <form
          className="space-y-6"
          onSubmit={isRegistering ? handleRegister : handleLogin}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-sm text-center mt-4">
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => {
                  setIsRegistering(false);
                  setErrorMessage("");
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => {
                  setIsRegistering(true);
                  setErrorMessage("");
                }}
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
