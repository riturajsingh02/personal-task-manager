import { useState, useMemo } from 'react'
import StatsBar from './components/StatsBar'
import SearchBar from './components/SearchBar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import styles from './App.module.css'

export default function App() {
  const { tasks, stats, addTask, updateTask, deleteTask, toggleComplete, reorderTasks } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const today = new Date(new Date().toDateString())

  const visibleTasks = useMemo(() => {
    let result = tasks

    // Filter
    if (filter === 'active') result = result.filter(t => !t.completed)
    else if (filter === 'completed') result = result.filter(t => t.completed)
    else if (filter === 'overdue') result = result.filter(t => {
      if (!t.dueDate || t.completed) return false
      return new Date(t.dueDate) < today
    })

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q)
      )
    }

    return result
  }, [tasks, filter, search])

  function handleAdd(data) {
    addTask(data)
    setShowForm(false)
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <svg className={styles.logo} viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#6366f1"/>
              <path d="M7 10h14M7 14h9M7 18h11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="21" cy="18" r="4" fill="#34d399"/>
              <path d="M19.5 18l1.2 1.3L22.5 17" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h1 className={styles.title}>TaskFlow</h1>
          </div>
          <button
            className={`${styles.addBtn} ${showForm ? styles.addBtnActive : ''}`}
            onClick={() => setShowForm(v => !v)}
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d={showForm ? 'M3 3l10 10M13 3L3 13' : 'M8 3v10M3 8h10'} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {showForm ? 'Cancel' : 'New task'}
          </button>
        </header>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Add form */}
        {showForm && (
          <TaskForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
        )}

        {/* Search & filter */}
        <SearchBar
          value={search}
          onChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />

        {/* Task list */}
        <TaskList
          tasks={visibleTasks}
          onToggle={toggleComplete}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onReorder={reorderTasks}
          filter={filter}
          searching={search.trim().length > 0}
        />
      </div>
    </div>
  )
}
