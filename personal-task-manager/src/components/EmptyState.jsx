import styles from './EmptyState.module.css'

const MESSAGES = {
  all: {
    icon: '✦',
    title: 'No tasks yet',
    body: 'Add your first task above and start getting things done.',
  },
  active: {
    icon: '◎',
    title: 'Nothing active',
    body: "All caught up — or try adding a task to get started.",
  },
  completed: {
    icon: '◉',
    title: 'Nothing completed yet',
    body: 'Check off tasks to see them here.',
  },
  overdue: {
    icon: '◈',
    title: 'No overdue tasks',
    body: "You're right on schedule.",
  },
  search: {
    icon: '⊘',
    title: 'No results',
    body: 'Try a different search term.',
  },
}

export default function EmptyState({ type = 'all' }) {
  const msg = MESSAGES[type] || MESSAGES.all
  return (
    <div className={styles.wrap}>
      <div className={styles.iconWrap}>
        <span className={styles.icon}>{msg.icon}</span>
      </div>
      <p className={styles.title}>{msg.title}</p>
      <p className={styles.body}>{msg.body}</p>
    </div>
  )
}
