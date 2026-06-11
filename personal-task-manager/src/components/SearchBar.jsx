import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange, filter, onFilterChange }) {
  return (
    <div className={styles.row}>
      <div className={styles.searchWrap}>
        <svg className={styles.icon} viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M15 15l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder="Search tasks…"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button className={styles.clear} onClick={() => onChange('')} aria-label="Clear search">
            <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      <div className={styles.filters}>
        {['all', 'active', 'completed', 'overdue'].map(f => (
          <button
            key={f}
            className={`${styles.chip} ${filter === f ? styles.active : ''}`}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}
