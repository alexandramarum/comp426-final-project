import React, { useState } from "react";

// dummy data for goals
const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      description: "exams",
      targetDate: "12/12",
      goalStatus: "Incomplete",
    },
    {
      id: 2,
      description: "gaming",
      targetDate: "12/1",
      goalStatus: "Complete",
    },
    {
      id: 3,
      description: "progaming",
      targetDate: "12/1",
      goalStatus: "In-progress",
    },
    {
      id: 4,
      description: "vibes",
      targetDate: "12/31",
      goalStatus: "In-progress",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeGoal, setActiveGoal] = useState(null);

  const startEditingGoal = (goal) => {
    setActiveGoal(goal);
    setIsEditing(true);
  };

  const startAddingGoal = () => {
    setActiveGoal({ description: "", targetDate: "", goalStatus: "" });
    setIsAdding(true);
  };

  const updateGoalField = (e) => {
    const { name, value } = e.target;
    setActiveGoal((prev) => ({ ...prev, [name]: value }));
  };

  const saveGoal = (e) => {
    e.preventDefault();
    setGoals((prev) =>
      prev.map((goal) => (goal.id === activeGoal.id ? activeGoal : goal))
    );
    setIsEditing(false);
  };

  const addGoal = (e) => {
    e.preventDefault();
    const newGoal = { ...activeGoal, id: Date.now() };
    setGoals((prev) => [...prev, newGoal]);
    setIsAdding(false);
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Goals</h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={startAddingGoal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Goal
          </button>
        </div>
        <GoalsTable
          goals={goals}
          onEdit={startEditingGoal}
          onDelete={deleteGoal}
        />
        {(isEditing || isAdding) && (
          <GoalsModal
            goal={activeGoal}
            onFieldChange={updateGoalField}
            onSave={isAdding ? addGoal : saveGoal}
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

// goals table
const GoalsTable = ({ goals, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto mb-10">
      <table className="table-auto w-full bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Description</th>
            <th className="px-4 py-2 text-left font-medium">Target Date</th>
            <th className="px-4 py-2 text-left font-medium">Goal Status</th>
            <th className="px-4 py-2 text-right"></th>
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
                {goal.targetDate}
              </td>
              <td
                className="px-4 py-2 cursor-pointer"
                onClick={() => onEdit(goal)}
              >
                {goal.goalStatus}
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

// goals add/edit modal
const GoalsModal = ({ goal, onFieldChange, onSave, onCancel }) => {
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
              onChange={onFieldChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="text"
              name="targetDate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goal.targetDate || ""}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Status
            </label>
            <select
              name="goalStatus"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={goal.goalStatus || ""}
              onChange={onFieldChange}
            >
              <option value="" disabled>
                Select current goal status
              </option>
              <option value="Complete">Complete</option>
              <option value="In-progress">In-progress</option>
              <option value="Incomplete">Incomplete</option>
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
