# Gym4Us

Gym4Us is a workout assistant application with clean UI, designed to help users track their workouts, set fitness goals, and find nearby gyms. It uses a React frontend for an interactive user experience and FastAPI on the backend to handle RESTful API requests. The app integrates the Google Places API to locate gyms based on the user's location.

## Features

### 1. **Workouts**
   - **Functionality**: Users can view, add, edit, and delete their workouts, with details including workout type, duration, and calories burned.
   - **Backend**: FastAPI provides RESTful CRUD endpoints for managing workouts.
   - **Frontend**: React components allow users to interact with their workout data.

### 2. **Goals**
   - **Functionality**: Users can set workout goals with a target completion date and monitor their progress.
   - **Backend**: CRUD operations are available for goal management.
   - **Frontend**: A simple UI enables users to add, update, and delete goals.

### 3. **Gyms**
   - **Functionality**: Users can find nearby gyms based on their current location.
   - **Backend**: The Google Places API is used to fetch gym data based on the user's GPS coordinates.
   - **Frontend**: Displays gym locations on an interactive map.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: FastAPI, SQLite, Pydantic
- **Third-Party API**: Google Places API
- **Authentication**: JWT tokens for secure login
- **State Management**: React state and session management

## Endpoints

### Auth Routes
- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login an existing user

### Workouts
- `POST /workouts/`: Add a new workout
- `GET /workouts/`: Get all workouts for the logged-in user
- `PUT /workouts/{id}`: Update an existing workout
- `DELETE /workouts/{id}`: Delete a workout

### Goals
- `POST /goals/`: Add a new fitness goal
- `GET /goals/`: Get all goals for the logged-in user
- `PUT /goals/{id}`: Update an existing goal
- `DELETE /goals/{id}`: Delete a goal

### Gyms
- `GET /gyms/nearby`: Get nearby gyms based on the user's location (uses Google Places API)

## Presentation VIDEO LINK:

