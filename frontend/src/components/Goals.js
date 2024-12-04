import React, { useState, useEffect } from "react";
import {
  fetchGoals,
  addGoal as apiAddGoal,
  deleteGoal as apiDeleteGoal,
  updateGoal as apiUpdateGoal,
} from "../api/api";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusDisplayMap = {
    notstarted: "Not Started",
    inprogress: "In-Progress",
    complete: "Complete",
  };

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const data = await fetchGoals();
        setGoals(data);
      } catch (err) {
        console.error("Failed to fetch goals:", err);
        if (err.response && err.response.status === 401) {
          window.location.href = "/login";
        } else {
          setError("Unable to load goals.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadGoals();
  }, []);

  const initiateEdit = (goal) => {
    setCurrentGoal(goal);
    setEditing(true);
  };

  const initiateAdd = () => {
    setCurrentGoal({ description: "", target_date: "", status: "" });
    setAdding(true);
  };

  const updateGoal = (e) => {
    const { name, value } = e.target;
    setCurrentGoal((prev) => ({ ...prev, [name]: value }));
  };

  const saveGoalChanges = async (e) => {
    e.preventDefault();
    try {
      const updatedGoal = await apiUpdateGoal(currentGoal.id, currentGoal);
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === currentGoal.id ? updatedGoal : goal
        )
      );
      setEditing(false);
      setCurrentGoal(null);
    } catch (err) {
      console.error("Update failed:", err);
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        setError("Could not update goal.");
      }
    }
  };

  const addNewGoal = async (e) => {
    e.preventDefault();
    try {
      const newGoal = await apiAddGoal(currentGoal);
      setGoals((prevGoals) => [...prevGoals, newGoal]);
      setAdding(false);
      setCurrentGoal(null);
    } catch (err) {
      console.error("Addition failed:", err);
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        setError("Could not add goal.");
      }
    }
  };

  const removeGoal = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmDelete) return;

    try {
      await apiDeleteGoal(id);
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    } catch (err) {
      console.error("Deletion failed:", err);
      if (err.response && err.response.status === 401) {
        window.location.href = "/login";
      } else {
        setError("Could not delete goal.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Goals</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={initiateAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Goal
          </button>
        </div>

        {loading && <div>Loading goals...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {!loading && !error && (
          <GoalsTable
            goals={goals}
            onEdit={initiateEdit}
            onDelete={removeGoal}
            statusDisplayMap={statusDisplayMap}
          />
        )}

        {(editing || adding) && (
          <GoalsModal
            goal={currentGoal}
            onChange={updateGoal}
            onSave={adding ? addNewGoal : saveGoalChanges}
            onCancel={() => {
              setEditing(false);
              setAdding(false);
              setCurrentGoal(null);
              setError(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

const GoalsTable = ({ goals, onEdit, onDelete, statusDisplayMap }) => {
  if (!goals || goals.length === 0) {
    return <div>No goals found.</div>;
  }

  return (
    <div className="overflow-x-auto mb-10">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Description</th>
            <th className="px-4 py-2 text-left font-medium">Target Date</th>
            <th className="px-4 py-2 text-left font-medium">Goal Status</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal, index) => (
            <tr
              key={goal.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(goal)}
              >
                {goal.description}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(goal)}
              >
                {goal.target_date}
              </td>
              <td
                className="px-4 py-2 cursor-pointer capitalize"
                onClick={() => onEdit(goal)}
              >
                {statusDisplayMap[goal.status] || goal.status}
              </td>
              <td className="px-4 py-2 text-right">
                <button
                  onClick={() => onDelete(goal.id)}
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

const GoalsModal = ({ goal, onChange, onSave, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-700">
          {goal.id ? "Edit Goal" : "Add Goal"}
        </h3>
        <form className="space-y-6" onSubmit={onSave}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goal.description || ""}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="date"
              name="target_date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goal.target_date || ""}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Status
            </label>
            <select
              name="status"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goal.status || ""}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Select current goal status
              </option>
              <option value="notstarted">Not Started</option>
              <option value="inprogress">In-Progress</option>
              <option value="complete">Complete</option>
            </select>
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

export default Goals;
