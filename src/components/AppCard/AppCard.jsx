import styles from "./style.module.css";
import clsx from 'clsx'

export function AppCard({ children, className }) {
    return <div className={ clsx([styles["app-card"], className]) }>{children}</div>;
}
