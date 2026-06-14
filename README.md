# 📝 Personal Task Manager

A modern, responsive, and user-friendly Personal Task Manager built with React, Tailwind CSS, Node.js, and Express. This application helps users organize daily tasks, manage deadlines, track progress, and stay productive through a clean and intuitive interface.

## 🚀 Live Demo

### Frontend

https://personal-task-manager-git-main-rituraj-s-projects6.vercel.app/

### Backend API

https://personal-task-manager-qadv.onrender.com

---

## ✨ Features

* ➕ Add new tasks with title, due date, and priority level
* ✅ Mark tasks as completed
* 🗑️ Delete tasks instantly
* 📊 Dashboard displaying task statistics
* 🔴 Automatic overdue task detection
* 💾 Persistent task storage through backend API
* 🎨 Modern and responsive user interface
* 📱 Mobile-friendly design
* 🔄 Real-time synchronization between frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### State Management

* React Hooks (`useState`, `useEffect`, `useCallback`)
* Custom Hook (`useTasks`)

### Data Storage

* JSON-based storage (`tasks.json`)

---

## 📂 Project Structure

```text
personal-task-manager/
│
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── server.js
├── tasks.json
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/riturajsingh02/personal-task-manager.git
cd personal-task-manager
```

### Install Dependencies

```bash
npm install
```

### Start Backend Server

```bash
node server.js
```

Backend runs on:

```text
http://localhost:3001
```

### Start Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/tasks`     | Fetch all tasks         |
| POST   | `/api/tasks`     | Create a new task       |
| PUT    | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task           |

---

## 📋 Sample Daily Tasks

### 1. Morning Exercise

Complete a 30-minute workout session to stay healthy and energized throughout the day.

### 2. Study React Development

Spend at least 2 hours learning React concepts, building components, or working on projects.

### 3. Complete Project Tasks

Finish assigned project work, fix bugs, and update progress before the end of the day.

---

## 🏗️ Build for Production

```bash
npm run build
```

The optimized production files will be generated inside the `dist` folder.

---

## 🌐 Deployment

### Frontend (Vercel)

https://personal-task-manager-git-main-rituraj-s-projects6.vercel.app/

### Backend (Render)

https://personal-task-manager-qadv.onrender.com

---

## 🎯 Future Enhancements

* User Authentication
* Dark Mode Support
* Task Categories & Filtering
* Drag-and-Drop Task Management
* Database Integration (MongoDB/PostgreSQL)
* Task Reminders & Notifications
* Task Search Functionality

---

## 🤝 Contributing

Contributions, suggestions, and feature requests are welcome. Feel free to fork the repository and submit a pull request.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rituraj Singh Rana**

GitHub: https://github.com/riturajsingh02
