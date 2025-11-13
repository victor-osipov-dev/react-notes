import styles from "./style.module.css";

export function AppChip({ children, ...attrs }) {
    return (
        <div {...attrs} className={styles["app-chip"]}>
            {children}
        </div>
    );
}
