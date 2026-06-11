import { useState, useEffect } from 'react'
import styles from './TaskForm.module.css'

const empty = { title: '', description: '', priority: 'medium', dueDate: '' }

export default function TaskForm({ onSubmit, onCancel, initial = null }) {
  const [form, setForm] = useState(initial || empty)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (field === 'title') setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Task title is required.')
      return
    }
    onSubmit(form)
    setForm(empty)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          type="text"
          placeholder="Task title *"
          value={form.title}
          onChange={e => set('title', e.target.value)}
          autoFocus
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>

      <textarea
        className={styles.textarea}
        placeholder="Description (optional)"
        value={form.description}
        onChange={e => set('description', e.target.value)}
        rows={2}
      />

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Priority</label>
          <select
            className={styles.select}
            value={form.priority}
            onChange={e => set('priority', e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Due date</label>
          <input
            className={styles.input}
            type="date"
            value={form.dueDate}
            onChange={e => set('dueDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className={styles.actions}>
        {onCancel && (
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.submitBtn}>
          {initial ? 'Save changes' : 'Add task'}
        </button>
      </div>
    </form>
  )
}
