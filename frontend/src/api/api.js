import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// Workouts API
export const fetchWorkouts = () => axios.get(`${API_BASE_URL}/workouts`);
export const addWorkout = (workoutData) =>
  axios.post(`${API_BASE_URL}/workouts`, workoutData);
export const deleteWorkout = (workoutId) =>
  axios.delete(`${API_BASE_URL}/workouts/${workoutId}`);
export const updateWorkout = (workoutId, workoutData) =>
  axios.put(`${API_BASE_URL}/workouts/${workoutId}`, workoutData);

// Goals API
export const fetchGoals = () => axios.get(`${API_BASE_URL}/goals`);
export const addGoal = (goalData) =>
  axios.post(`${API_BASE_URL}/goals`, goalData);
export const deleteGoal = (goalId) =>
  axios.delete(`${API_BASE_URL}/goals/${goalId}`);
export const updateGoal = (goalId, goalData) =>
  axios.put(`${API_BASE_URL}/goals/${goalId}`, goalData);
