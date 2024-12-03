import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

// Workouts API
export const fetchWorkouts = () =>
  axios.get(`${API_BASE_URL}/workouts`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const addWorkout = (workoutData) =>
  axios.post(`${API_BASE_URL}/workouts`, workoutData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const deleteWorkout = (workoutId) =>
  axios.delete(`${API_BASE_URL}/workouts/${workoutId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const updateWorkout = (workoutId, workoutData) =>
  axios.put(`${API_BASE_URL}/workouts/${workoutId}`, workoutData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

// Goals API
export const fetchGoals = () =>
  axios.get(`${API_BASE_URL}/goals`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const addGoal = (goalData) =>
  axios.post(`${API_BASE_URL}/goals`, goalData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const deleteGoal = (goalId) =>
  axios.delete(`${API_BASE_URL}/goals/${goalId}`, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

export const updateGoal = (goalId, goalData) =>
  axios.put(`${API_BASE_URL}/goals/${goalId}`, goalData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
    },
  });

// Auth API
export const loginUser = (username, password) =>
  axios.post(`${API_BASE_URL}/auth/login`, null, {
    params: {
      username,
      password,
    },
  });

export const registerUser = (userData) =>
  axios.post(`${API_BASE_URL}/auth/register`, userData);

// Gym API
export const fetchGyms = (location, radius, type) =>
  axios.get(`${API_BASE_URL}/api/nearby-gyms`);
