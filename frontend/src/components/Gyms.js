import React, { useEffect, useState } from "react";

const Gyms = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });

  async function findNearbyGyms() {
    const radius = 16093;
    const placeType = "gym";

    const location = `${latitude},${longitude}`;

    const url = `http://127.0.0.1:8000/api/nearby-gyms?location=${location}&radius=${radius}&place_type=${placeType}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch nearby shelters");
        }

        const data = await response.json();

        if (data.status === "OK") {
          const formattedGyms = data.results.map((gym) => ({
            name: gym.name,
            location: gym.vicinity,
          }));
          setGyms(formattedGyms);
        } else {
            console.error("Error:", data.status, data.error_message);
            alert(`Failed to retrieve shelters: ${data.status}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching shelters.");
    }
}


  const onSubmit = (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      setErrorMessage(
        "Location data is missing. Please allow location access to proceed."
      );
    } else {
      setErrorMessage("");
      findNearbyGyms()
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Gyms</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <form className="space-y-6" onSubmit={onSubmit}>
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

          {errorMessage && (
            <div className="mt-4 text-red-600">{errorMessage}</div>
          )}

          {gyms.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-700">Nearby Gyms</h3>
              <ul className="space-y-4">
                {gyms.map((gym, index) => (
                  <li key={index} className="bg-gray-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-lg">{gym.name}</h4>
                    <p className="text-gray-600">{gym.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Gyms;
