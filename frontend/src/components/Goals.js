import React from "react";

const Goals = () => {
  const goals = [
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
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Goals</h1>
        <div className="overflow-x-auto mb-10">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Description</th>
                <th className="px-4 py-2 text-left font-medium">Target Date</th>
                <th className="px-4 py-2 text-left font-medium">Goal Status</th>
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
                  <td className="px-4 py-2">{goal.description}</td>
                  <td className="px-4 py-2">{goal.targetDate}</td>
                  <td className="px-4 py-2">{goal.goalStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">
            Add a New Goal
          </h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Hit a bench PR"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Date
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="12/4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Status
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select current goal status
                </option>
                <option value="Complete">Complete</option>
                <option value="In-progress">In-progress</option>
                <option value="Incomplete">Incomplete</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Goals;
