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
import Login from "./components/Login";
import { fetchUsername } from "./api/api";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState()

  const loadUsername = async () => {
    try {
      const data = await fetchUsername()
      setUsername(data)
    } catch (err) {
      console.error("Failed to fetch goals:", err);
    }
  }

  return (
    <Router>
      <div data-theme="light" className="bg-gray-50 min-h-screen flex flex-col">
        <header className="bg-white shadow-md">
          <div className="flex justify-between items-center h-16 px-4">
            <Link to="/">
              <img
                className="w-20 h-30 rounded-full cursor-pointer"
                src="./gym4us.png"
                alt="Rounded avatar"
              />
            </Link>
            <nav>
              <ul className="flex space-x-6 text-lg font-medium">
                <li>
                <div>
              {username ? (
                <>
                  <div className="text-lg font-medium">Hello, {username}</div>
                </>
              ) : (
                <div className="text-lg font-medium">Not logged in</div>
              )}
            </div>
                </li>
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
            <Route path="/" element={<Login onLoginSuccess={loadUsername} />} />
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
