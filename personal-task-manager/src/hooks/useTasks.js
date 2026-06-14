import { useState, useEffect, useCallback } from 'react'

const API_URL = 'http://localhost:3001/api/tasks'

export function useTasks() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setTasks(data)
      } catch (err) {
        setError('Failed to load tasks from server')
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

    const newTaskData = {
      title: title.trim(),
      description: data?.description?.trim() || '',
      priority: data?.priority || 'medium',
      dueDate: data?.dueDate || '',
      completed: false,
      order: tasks.length,
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData)
      })
      const createdTask = await res.json()
      setTasks(prev => [...prev, createdTask])
      return createdTask
    } catch (err) {
      setError('Failed to add task')
    }
  }, [tasks])

  const updateTask = useCallback(async (id, changes) => {
    setError(null)
    try {
      setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t))
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes)
      })
    } catch (err) {
      setError('Failed to update task')
    }
  }, [])

  const deleteTask = useCallback(async (id) => {
    setError(null)
    try {
      setTasks(prev => prev.filter(t => t.id !== id))
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    } catch (err) {
      setError('Failed to delete task')
    }
  }, [])

  const toggleComplete = useCallback(async (id) => {
    const taskToToggle = tasks.find(t => t.id === id)
    if (taskToToggle) {
      updateTask(id, { completed: !taskToToggle.completed })
    }
  }, [tasks, updateTask])

  const reorderTasks = useCallback(async (newOrder) => {
    setError(null)
    const updatedTasks = newOrder.map((t, i) => ({ ...t, order: i }))
    setTasks(updatedTasks)
    // Note: To fully persist reordering, you would map over updatedTasks and send PUT requests,
    // or create a new bulk update endpoint.
  }, [])

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
