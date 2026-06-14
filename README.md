📝 Personal Task Manager

A modern and responsive Personal Task Manager built with React and Tailwind CSS. This application helps users organize daily tasks, track progress, manage deadlines, and stay productive with an intuitive user interface.

🚀 Features

 ➕ Add new tasks with title, due date, and priority level
  ✅ Mark tasks as completed
  🗑️ Delete tasks instantly
  📊 Dashboard with task statistics
  🔴 Automatic overdue task detection
  💾 Data persistence using browser Local Storage
  🎨 Clean and responsive UI
  📱 Mobile-friendly design

🛠️ Tech Stack

Frontend

* React.js
* JavaScript (ES6+)
* Tailwind CSS

State Management

* React Hooks (`useState`, `useEffect`, `useCallback`)
* Custom Hook (`useTasks`)

Storage

* Browser Local Storage API

📂 Project Structure

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
├── package.json
├── vite.config.js
└── README.md
```

 ⚙️ Installation

Clone the Repository

```bash
git clone https://github.com/your-username/personal-task-manager.git
cd personal-task-manager
```

Install Dependencies

```bash
npm install
```

Start Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:5173
```

🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be generated inside the `dist` folder.

🌐 Deployment

This project can be deployed easily using:

* Netlify
* Vercel
* GitHub Pages

Netlify Build Settings

```text
Build Command: npm run build
Publish Directory: dist
```

🎯 Future Enhancements

* User Authentication
* Dark Mode
* Task Categories
* Drag and Drop Task Management
* Cloud Database Integration
* Task Reminders and Notifications

🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

📜 License

This project is licensed under the MIT License.

👨‍💻 Author

Developed by [Rituraj Singh Rana]

GitHub: https://github.com/riturajsingh02
