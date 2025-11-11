import styles from './style.module.css'

export function AppChip({children}) {
    return <div className={styles['app-chip']}>{children}</div>
}