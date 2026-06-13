import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'taskflow_tasks'

const defaultTasks = [
  {
    id: uuidv4(),
    title: 'Set up project repository',
    description: 'Initialize Git repo and push initial commit',
    priority: 'high',
    dueDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: uuidv4(),
    title: 'Design system components',
    description: 'Build reusable button, input, and card components',
    priority: 'medium',
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: uuidv4(),
    title: 'Write unit tests',
    description: 'Cover core utilities with Jest',
    priority: 'low',
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
    completed: true,
    createdAt: new Date().toISOString(),
    order: 2,
  },
]

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return defaultTasks
}

function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // ignore
  }
}

export function useTasks() {
  const [tasks, setTasks] = useState(loadTasks)

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = useCallback((data) => {
    setTasks(prev => [
      ...prev,
      {
        id: uuidv4(),
        title: data.title.trim(),
        description: data.description?.trim() || '',
        priority: data.priority || 'medium',
        dueDate: data.dueDate || '',
        completed: false,
        createdAt: new Date().toISOString(),
        order: prev.length,
      },
    ])
  }, [])

  const updateTask = useCallback((id, changes) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t))
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const toggleComplete = useCallback((id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }, [])

  const reorderTasks = useCallback((newOrder) => {
    setTasks(newOrder.map((t, i) => ({ ...t, order: i })))
  }, [])

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order)

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false
      return new Date(t.dueDate) < new Date(new Date().toDateString())
    }).length,
  }

  return { tasks: sortedTasks, stats, addTask, updateTask, deleteTask, toggleComplete, reorderTasks }
}
