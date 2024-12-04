import React, { useState, useEffect } from "react";
import {
  fetchWorkouts,
  addWorkout as apiAddWorkout,
  deleteWorkout as apiDeleteWorkout,
  updateWorkout as apiUpdateWorkout,
} from "../api/api";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const workoutTypes = ["cardio", "strength", "flexibility", "other"];

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await fetchWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
        setError("Unable to load workouts.");
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  const initiateEdit = (workout) => {
    setCurrentWorkout(workout);
    setIsEditing(true);
  };

  const initiateAdd = () => {
    setCurrentWorkout({ duration: "", type: "", calories: "", date: "" });
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const saveWorkout = async (e) => {
    e.preventDefault();
    try {
      const updatedWorkout = await apiUpdateWorkout(
        currentWorkout.id,
        currentWorkout
      );
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout.id === currentWorkout.id ? updatedWorkout : workout
        )
      );
      setIsEditing(false);
      setCurrentWorkout(null);
    } catch (err) {
      console.error("Update failed:", err);
      setError("Could not update workout.");
    }
  };

  const addNewWorkout = async (e) => {
    e.preventDefault();
    try {
      const newWorkout = await apiAddWorkout(currentWorkout);
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
      setIsAdding(false);
      setCurrentWorkout(null);
    } catch (err) {
      console.error("Addition failed:", err);
      setError("Could not add workout.");
    }
  };

  const deleteWorkout = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workout?"
    );
    if (!confirmDelete) return;

    try {
      await apiDeleteWorkout(id);
      setWorkouts((prevWorkouts) =>
        prevWorkouts.filter((workout) => workout.id !== id)
      );
    } catch (err) {
      console.error("Deletion failed:", err);
      setError("Could not delete workout.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Workouts</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={initiateAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Workout
          </button>
        </div>

        {loading && <div>Loading workouts...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {!loading && !error && (
          <WorkoutTable
            workouts={workouts}
            onEdit={initiateEdit}
            onDelete={deleteWorkout}
            workoutTypes={workoutTypes}
          />
        )}

        {(isEditing || isAdding) && (
          <WorkoutModal
            workout={currentWorkout}
            onChange={handleInputChange}
            onSave={isAdding ? addNewWorkout : saveWorkout}
            onCancel={() => {
              setIsEditing(false);
              setIsAdding(false);
              setCurrentWorkout(null);
              setError(null);
            }}
            workoutTypes={workoutTypes}
          />
        )}
      </div>
    </div>
  );
};

const WorkoutTable = ({ workouts, onEdit, onDelete }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  if (workouts.length === 0) return <div>No workouts available.</div>;

  return (
    <div className="overflow-x-auto mb-10">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {/* Removed the 'Name' column */}
            <th className="px-4 py-2 text-left font-medium">Duration</th>
            <th className="px-4 py-2 text-left font-medium">Type</th>
            <th className="px-4 py-2 text-left font-medium">Calories</th>
            <th className="px-4 py-2 text-right">Actions</th>
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
                {workout.duration}
              </td>
              <td
                className="px-4 py-2 cursor-pointer capitalize"
                onClick={() => onEdit(workout)}
              >
                {capitalize(workout.type)}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(workout)}
              >
                {workout.calories}
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

const WorkoutModal = ({
  workout,
  onChange,
  onSave,
  onCancel,
  workoutTypes,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-700">
          {workout.id ? "Edit Workout" : "Add Workout"}
        </h3>
        <form className="space-y-6" onSubmit={onSave}>
          {/* Removed the 'Name' field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.duration}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.type}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Select workout type
              </option>
              {workoutTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.calories}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={workout.date}
              onChange={onChange}
              required
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
