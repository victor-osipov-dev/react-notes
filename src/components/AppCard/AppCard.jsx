import styles from "./style.module.css";
import clsx from "clsx";

export function AppCard({ children, className, handleClick, ...attrs }) {
    return (
        <div
            {...attrs}
            onClick={handleClick}
            className={clsx([styles["app-card"], className])}
        >
            {children}
        </div>
    );
}
