import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TaskForm from './TaskForm'
import styles from './TaskCard.module.css'

const PRIORITY_LABELS = { high: 'High', medium: 'Med', low: 'Low' }
const PRIORITY_CLASS = { high: 'priorityHigh', medium: 'priorityMed', low: 'priorityLow' }

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false
  const due = new Date(task.dueDate)
  const today = new Date(new Date().toDateString())
  return due < today
}

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TaskCard({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const overdue = isOverdue(task)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : undefined,
  }

  function handleUpdate(data) {
    onUpdate(task.id, data)
    setEditing(false)
  }

  if (editing) {
    return (
      <div ref={setNodeRef} style={style}>
        <TaskForm
          initial={{ title: task.title, description: task.description, priority: task.priority, dueDate: task.dueDate }}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${task.completed ? styles.completed : ''} ${overdue ? styles.overdue : ''}`}
    >
      {overdue && <div className={styles.overdueStripe} />}

      <div className={styles.main}>
        {/* Drag handle */}
        <button className={styles.dragHandle} {...attributes} {...listeners} aria-label="Drag to reorder">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <circle cx="5" cy="4" r="1.2" fill="currentColor"/>
            <circle cx="11" cy="4" r="1.2" fill="currentColor"/>
            <circle cx="5" cy="8" r="1.2" fill="currentColor"/>
            <circle cx="11" cy="8" r="1.2" fill="currentColor"/>
            <circle cx="5" cy="12" r="1.2" fill="currentColor"/>
            <circle cx="11" cy="12" r="1.2" fill="currentColor"/>
          </svg>
        </button>

        {/* Checkbox */}
        <button
          className={`${styles.checkbox} ${task.completed ? styles.checked : ''}`}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {task.completed && (
            <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{task.title}</span>
            <span className={`${styles.priority} ${styles[PRIORITY_CLASS[task.priority]]}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}
          <div className={styles.meta}>
            {task.dueDate && (
              <span className={`${styles.due} ${overdue ? styles.dueOverdue : ''}`}>
                {overdue ? (
                  <svg viewBox="0 0 14 14" width="12" height="12" fill="none">
                    <path d="M7 1v6M7 10v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 14 14" width="12" height="12" fill="none">
                    <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                )}
                {overdue ? `Overdue · ` : ''}{formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => setEditing(true)} aria-label="Edit task">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path d="M11.5 2.5l2 2-8 8H3.5v-2l8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
          </button>
          {confirmDelete ? (
            <div className={styles.confirmRow}>
              <button className={styles.confirmYes} onClick={() => onDelete(task.id)}>Delete</button>
              <button className={styles.confirmNo} onClick={() => setConfirmDelete(false)}>No</button>
            </div>
          ) : (
            <button className={`${styles.actionBtn} ${styles.deleteBtn}`} onClick={() => setConfirmDelete(true)} aria-label="Delete task">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                <path d="M3 5h10M6 5V3h4v2M5 5l.5 8h5l.5-8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
