import { AppCard } from "../AppCard";
import styles from "./style.module.css";
import svg from "@svg/Крестик.svg";

export function AppNote({ title, text, handleClick, deleteNote }) {
    return (
        <AppCard handleClick={handleClick} className={styles["app-note"]}>
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>

            <img
                onClick={(e) => {
                    e.stopPropagation();
                    deleteNote();
                }}
                className={styles.cross}
                src={svg}
            ></img>
        </AppCard>
    );
}
