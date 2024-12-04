# Gym4Us
Gym4Us is a workout assistant application that offers registered users three services:
* **Workouts**: Displays user workouts with details inlcuding workout type, duration, and calories burned. Users can add, edit, and delete workouts.
* **Goals**: Allows users to record workout goals with a desired completion date and present completion status.
* **Gyms**: Locates the nearest gyms based on the user's current location.

We created the frontend using React and Tailwind and on the backend we used FastAPI to connect to an SQLite database, communicating data via pydantic models. To fetch nearby gyms, we used the Google Places API and requested the user's current location through the browser.
## Presentation
