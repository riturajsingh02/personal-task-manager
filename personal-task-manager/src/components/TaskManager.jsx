import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

export default function TaskManager() {
  const { tasks, stats, addTask, toggleComplete, deleteTask } = useTasks();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    addTask({ title, dueDate, priority });
    setTitle('');
    setDueDate('');
    setPriority('medium');
  };

  const getPriorityColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      
      {/* Header & Stats Dashboard */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Tasks</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Tasks" count={stats.total} color="bg-blue-50 text-blue-600" />
          <StatCard title="Active" count={stats.active} color="bg-indigo-50 text-indigo-600" />
          <StatCard title="Completed" count={stats.completed} color="bg-emerald-50 text-emerald-600" />
          <StatCard title="Overdue" count={stats.overdue} color="bg-rose-50 text-rose-600" />
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-3 items-center transition-shadow hover:shadow-md">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 w-full bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none transition-all"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full md:w-auto bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none cursor-pointer transition-all"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full md:w-auto bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl px-4 py-3 outline-none cursor-pointer transition-all"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button
          type="submit"
          disabled={!title.trim()}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 transition-colors active:scale-95"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No tasks yet. Enjoy your day! 🌟</p>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id} 
              className={`group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                task.completed ? 'border-gray-100 opacity-60' : 
                task.status === 'overdue' ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
              }`}
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                {/* Custom Checkbox */}
                <label className="relative flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-6 h-6 border-2 border-gray-300 rounded-md appearance-none checked:bg-emerald-500 checked:border-emerald-500 transition-colors cursor-pointer"
                  />
                  {task.completed && (
                    <svg className="absolute w-4 h-4 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </label>
                
                <div>
                  <h3 className={`text-lg font-medium transition-colors ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.dueDate && (
                    <p className={`text-sm mt-0.5 ${task.status === 'overdue' && !task.completed ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                      {task.status === 'overdue' && !task.completed && '⚠️ '}
                      Due: {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric'})}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 ml-10 md:ml-0">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors md:opacity-0 group-hover:opacity-100"
                  aria-label="Delete task"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/** 
 * Helper Component for the Stats Dashboard 
 */
function StatCard({ title, count, color }) {
  return (
    <div className={`p-4 rounded-2xl flex flex-col items-center justify-center ${color}`}>
      <span className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-1">
        {title}
      </span>
      <span className="text-3xl font-bold">
        {count}
      </span>
    </div>
  );
}