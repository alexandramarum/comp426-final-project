// src/api/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// Function to retrieve the access token from sessionStorage
const getAccessToken = () => sessionStorage.getItem("access_token");

// Helper function to convert camelCase to snake_case
const toSnakeCase = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === "goalStatus") {
        newObj["status"] = obj[key]; // Explicitly map goalStatus to status
      } else {
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        newObj[snakeKey] = obj[key];
      }
    }
  }
  return newObj;
};

// Workouts API
export const fetchWorkouts = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/workouts/`, {
      params: { token },
    });
    console.log("Workouts fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching workouts:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchUsername = async () => {
  const token = getAccessToken()
  if (!token) {
    throw new Error("Access token is missing. Please log in.")
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/auth/me`, {params: { token }}
    )
    console.log("Username successfully retrieved:", response.data)
    return response.data.username
  } catch (error) {
    console.error("Error fetching username:")
    throw error;
  }
}

export const addWorkout = async (workoutData) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/workouts/`,
      workoutData,
      {
        params: { token },
      }
    );
    console.log("Workout added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding workout:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteWorkout = async (workoutId) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/workouts/${workoutId}/`,
      {
        params: { token },
      }
    );
    console.log(`Workout ${workoutId} deleted successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting workout ${workoutId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateWorkout = async (workoutId, workoutData) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/workouts/${workoutId}/`,
      workoutData,
      {
        params: { token },
      }
    );
    console.log(`Workout ${workoutId} updated successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating workout ${workoutId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Goals API
export const fetchGoals = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/goals/`, {
      params: { token },
    });
    console.log("Goals fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching goals:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addGoal = async (goalData) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  // Transform field names to snake_case, with goalStatus mapped to status
  const transformedGoalData = toSnakeCase(goalData);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/goals/`,
      transformedGoalData,
      {
        params: { token },
      }
    );
    console.log("Goal added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding goal:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteGoal = async (goalId) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/goals/${goalId}/`, {
      params: { token },
    });
    console.log(`Goal ${goalId} deleted successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting goal ${goalId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateGoal = async (goalId, goalData) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  // Transform field names to snake_case, with goalStatus mapped to status
  const transformedGoalData = toSnakeCase(goalData);

  try {
    const response = await axios.put(
      `${API_BASE_URL}/goals/${goalId}/`,
      transformedGoalData,
      {
        params: { token },
      }
    );
    console.log(`Goal ${goalId} updated successfully:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating goal ${goalId}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Auth API
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, null, {
      params: {
        username,
        password,
      },
    });
    console.log("User logged in successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register/`,
      userData
    );
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Gym API
export const fetchGyms = async (location, radius, type) => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("Access token is missing. Please log in.");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/api/nearby-gyms/`, {
      params: {
        token,
        location,
        radius,
        type,
      },
    });
    console.log("Gyms fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching gyms:",
      error.response?.data || error.message
    );
    throw error;
  }
};
