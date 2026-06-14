import { useState, useEffect, useCallback } from 'react'

const LOCAL_STORAGE_KEY = 'personal_task_manager_tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Helper to save to local storage and update state simultaneously
  const saveTasks = useCallback((newTasks) => {
    setTasks(newTasks)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
  }, [])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks))
        }
      } catch (err) {
        setError('Failed to load tasks from local storage')
      } finally {
        setIsLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const addTask = useCallback(async (data) => {
    setError(null)
    
    // Safely handle if the form passes a plain string OR an object
    const title = typeof data === 'string' ? data : data?.title;
    if (!title) {
      setError('Task title is required');
      return null;
    }

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: data?.description?.trim() || '',
      priority: data?.priority || 'medium',
      dueDate: data?.dueDate || '',
      completed: false,
      order: tasks.length,
    }

    const newTasks = [...tasks, newTask]
    saveTasks(newTasks)
    return newTask
  }, [tasks, saveTasks])

  const updateTask = useCallback(async (id, changes) => {
    setError(null)
    const newTasks = tasks.map(t => t.id === id ? { ...t, ...changes } : t)
    saveTasks(newTasks)
  }, [tasks, saveTasks])

  const deleteTask = useCallback(async (id) => {
    setError(null)
    const newTasks = tasks.filter(t => t.id !== id)
    saveTasks(newTasks)
  }, [tasks, saveTasks])

  const toggleComplete = useCallback(async (id) => {
    setError(null)
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    saveTasks(newTasks)
  }, [tasks, saveTasks])

  const reorderTasks = useCallback(async (newOrder) => {
    setError(null)
    const updatedTasks = newOrder.map((t, i) => ({ ...t, order: i }))
    saveTasks(updatedTasks)
  }, [saveTasks])

  // Get today's local date as YYYY-MM-DD to avoid timezone shifting bugs
  const today = new Date()
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const sortedTasks = [...tasks].sort((a, b) => a.order - b.order).map(task => {
    let status = 'active'
    if (task.completed) {
      status = 'completed'
    } else if (task.dueDate && task.dueDate < todayString) {
      status = 'overdue'
    }
    return { ...task, status }
  })

  const stats = {
    total: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    overdue: tasks.filter(t => {
      if (!t.dueDate || t.completed) return false
      return t.dueDate < todayString
    }).length,
  }

  return {
    tasks: sortedTasks,
    stats,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    reorderTasks
  }
}
