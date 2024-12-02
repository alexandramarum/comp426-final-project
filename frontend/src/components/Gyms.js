import React, { useEffect, useState } from "react";

const Gyms = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function (error) {
          console.error("Error getting location:", error);
          alert(
            "Could not get your location. Please allow location access to use the live chat."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-700">Gyms</h3>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={longitude}
            readOnly
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={latitude}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Find Gyms Nearby
        </button>
      </form>
    </div>
  );
};

export default Gyms;
