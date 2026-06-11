import styles from './StatsBar.module.css'

export default function StatsBar({ stats }) {
  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.value}>{stats.total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={styles.divider} />
      <div className={`${styles.stat} ${styles.active}`}>
        <span className={styles.value}>{stats.active}</span>
        <span className={styles.label}>Active</span>
      </div>
      <div className={styles.divider} />
      <div className={`${styles.stat} ${styles.done}`}>
        <span className={styles.value}>{stats.completed}</span>
        <span className={styles.label}>Done</span>
      </div>
      {stats.overdue > 0 && (
        <>
          <div className={styles.divider} />
          <div className={`${styles.stat} ${styles.overdue}`}>
            <span className={styles.value}>{stats.overdue}</span>
            <span className={styles.label}>Overdue</span>
          </div>
        </>
      )}
      <div className={styles.progressWrap}>
        <div
          className={styles.progressBar}
          style={{ width: stats.total ? `${(stats.completed / stats.total) * 100}%` : '0%' }}
        />
      </div>
    </div>
  )
}
