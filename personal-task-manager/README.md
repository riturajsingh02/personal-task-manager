# 📝 Personal Task Manager

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A beautiful, responsive, and fully functional Personal Task Manager built with React and Tailwind CSS. It helps you stay organized by tracking your active, completed, and overdue tasks. Data is persisted via a custom Node.js/Express backend!

🚀 **Live Demo:** [https://personal-task-manager-git-main-rituraj-s-projects6.vercel.app](https://personal-task-manager-git-main-rituraj-s-projects6.vercel.app)

## ✨ Features

*   **Dashboard Statistics:** Get a quick overview of your Total, Active, Completed, and Overdue tasks.
*   **Task Management:** Add new tasks with a title, optional due date, and priority level (Low, Medium, High).
*   **Smart Overdue Tracking:** Automatically highlights tasks in red if their due date has passed.
*   **Backend Persistence:** Tasks are saved via a Node.js/Express backend into a `tasks.json` file so they safely persist across server restarts.
*   **Interactive UI:** Smooth hover states, custom checkboxes, and priority color badges.
*   **Responsive Design:** Works flawlessly on mobile, tablet, and desktop screens.

## 🛠️ Built With

*   **Frontend:** React (Hooks: `useState`, `useEffect`, `useCallback`)
*   **Styling:** Tailwind CSS
*   **State Management:** Custom React Hook (`useTasks`)
*   **Backend:** Node.js & Express
*   **Data Storage:** Local JSON file (`tasks.json`)

## 🚀 Getting Started locally

Follow these steps to run the project on your local machine.

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/personal-task-manager.git
   cd personal-task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Backend Server:**
   Open a terminal and run:
   ```bash
   node server.js
   ```
   *The backend will run on http://localhost:3001.*

4. **Start the Frontend Application:**
   Open a *second* terminal window and run:
   ```bash
   npm run frontend
   ```

5. Open your browser and visit `http://localhost:5173`.

## 📂 Project Structure
The project is structured with both frontend and backend code residing in the same repository for simplicity. The React app is built with Vite in the root directory, while the backend API is served by `server.js` and stores data in `tasks.json`.

## 🌍 Deployment
This project is deployed using a decoupled architecture from a single repository:
*   **Frontend:** Deployed on [Vercel](https://vercel.com/) (configured to build the React application from the root directory).
*   **Backend:** Deployed as a Web Service on [Render](https://render.com/) running the `server.js` Node/Express API.

*Note: Because Render's free tier uses an ephemeral file system, the local `tasks.json` database may reset when the server spins down. For permanent production storage, swapping to MongoDB is recommended.*

## 🔌 API Documentation

| Method | Endpoint | Description | Request Body | Response |
| :--- | :--- | :--- | :--- | :--- |
| GET | `/api/tasks` | Fetch all tasks | None | Array of Task objects |
| POST | `/api/tasks` | Create a new task | `{ title, description, priority, dueDate }` | Created Task object |
| PUT | `/api/tasks/:id` | Update an existing task | `{ title, description, completed, ... }` | Updated Task object |
| DELETE | `/api/tasks/:id` | Delete a task | None | 204 No Content |

## 🔮 Next Steps
If I had more time, I would:
*   Implement bulk-saving for drag-and-drop reordering logic to the backend.
*   Replace the `tasks.json` storage with a robust database like SQLite or PostgreSQL.
*   Add proper testing using Jest and React Testing Library.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is open-source and available under the MIT License.