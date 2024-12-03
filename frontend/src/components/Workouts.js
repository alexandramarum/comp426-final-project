import React, { useState, useEffect } from "react";
import {
  fetchWorkouts,
  addWorkout as apiAddWorkout,
  deleteWorkout as apiDeleteWorkout,
  updateWorkout as apiUpdateWorkout,
} from "../api/api"; // Adjust the import path if needed

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState(null);

  // Fetch workouts from the backend on component mount
  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await fetchWorkouts();
        setWorkouts(response.data); // Assume the API returns a list of workouts
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    getWorkouts();
  }, []);

  const editWorkout = (workout) => {
    setActiveWorkout(workout);
    setIsEditing(true);
  };

  const updateWorkoutField = (e) => {
    const { name, value } = e.target;
    setActiveWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const saveWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await apiUpdateWorkout(activeWorkout.id, activeWorkout);
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === activeWorkout.id ? response.data : workout
        )
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await apiDeleteWorkout(id);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const addWorkout = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAddWorkout(activeWorkout);
      setWorkouts((prev) => [...prev, response.data]);
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  const startAddingWorkout = () => {
    setActiveWorkout({ name: "", duration: "", type: "", caloriesBurned: "" });
    setIsAdding(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Workouts</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={startAddingWorkout}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Workout
          </button>
        </div>
        <WorkoutTable
          workouts={workouts}
          onEdit={editWorkout}
          onDelete={deleteWorkout}
        />
        {(isEditing || isAdding) && (
          <WorkoutModal
            workout={activeWorkout}
            onFieldChange={updateWorkoutField}
            onSave={isAdding ? addWorkout : saveWorkout}
            onCancel={() => {
              setIsEditing(false);
              setIsAdding(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Workout Table
const WorkoutTable = ({ workouts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Name</th>
            <th className="px-4 py-2 text-left font-medium">Duration</th>
            <th className="px-4 py-2 text-left font-medium">Type</th>
            <th className="px-4 py-2 text-left font-medium">Calories Burned</th>
            <th className="px-4 py-2 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, index) => (
            <tr
              key={workout.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(workout)}
              >
                {workout.name}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(workout)}
              >
                {workout.duration}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(workout)}
              >
                {workout.type}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(workout)}
              >
                {workout.caloriesBurned}
              </td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onDelete(workout.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.136 21H7.864a2 2 0 01-1.997-1.858L5 7m5 4v6m4-6v6M6 7h12M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Workout Modal
const WorkoutModal = ({ workout, onFieldChange, onSave, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-700">
          {workout.id ? "Edit Workout" : "Add Workout"}
        </h3>
        <form className="space-y-6" onSubmit={onSave}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.name || ""}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.duration || ""}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <input
              type="text"
              name="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.type || ""}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories Burned
            </label>
            <input
              type="number"
              name="caloriesBurned"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.caloriesBurned || ""}
              onChange={onFieldChange}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Workouts;
