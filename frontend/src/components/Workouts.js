import React from "react";

const Workouts = () => {
  const workouts = [
    {
      id: 1,
      name: "Morning Run",
      duration: "30 mins",
      type: "Cardio",
      caloriesBurned: 300,
      date: "11/26",
    },
    {
      id: 2,
      name: "Yoga Session",
      duration: "45 mins",
      type: "Flexibility",
      caloriesBurned: 150,
      date: "11/26",
    },
    {
      id: 3,
      name: "Strength Training",
      duration: "1 hour",
      type: "Strength",
      caloriesBurned: 500,
      date: "11/26",
    },
    {
      id: 4,
      name: "Cycling",
      duration: "2 hours",
      type: "Endurance",
      caloriesBurned: 800,
      date: "11/26",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Workouts</h1>
        <div className="overflow-x-auto mb-10">
          <table className="table-auto w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Duration</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">
                  Calories Burned
                </th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
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
                  <td className="px-4 py-2">{workout.name}</td>
                  <td className="px-4 py-2">{workout.duration}</td>
                  <td className="px-4 py-2">{workout.type}</td>
                  <td className="px-4 py-2">{workout.caloriesBurned}</td>
                  <td className="px-4 py-2">{workout.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-700">
            Add a New Workout
          </h3>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workout Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cardio"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="30 mins"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue=""
              >
                <option value="" disabled>
                  Select workout type
                </option>
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories Burned
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="200"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Workout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
