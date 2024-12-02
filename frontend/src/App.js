import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Workouts from "./components/Workouts";
import Goals from "./components/Goals";
import Gyms from "./components/Gyms";

const App = () => {
  return (
    <Router>
      <div data-theme="light" className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center h-16 px-4">
            <Link to="/">
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src="/coolguy.jpg"
                alt="Rounded avatar"
              />
            </Link>
            <nav>
              <ul className="flex space-x-6 text-lg font-medium">
                <li>
                  <Link
                    to="/workouts"
                    className="hover:text-gray-700 transition-colors duration-200"
                  >
                    Workouts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/goals"
                    className="hover:text-gray-700 transition-colors duration-200"
                  >
                    Goals
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gyms"
                    className="hover:text-gray-700 transition-colors duration-200"
                  >
                    Gyms
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/workouts" />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/gyms" element={<Gyms />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-2xl">404 - Page Not Found</h1>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
