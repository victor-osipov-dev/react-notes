import { AppCard } from "@components/AppCard";
import styles from "./style.module.css";
import svg from "@svg/Крестик.svg";
import clsx from "clsx";

export function NotesSearch({ noteName, setSearchNoteName, className }) {
    return (
        <AppCard className={clsx(styles["notes-search"], className)}>
            <input
                className={styles.input}
                onChange={(e) => setSearchNoteName(e.target.value)}
                value={noteName}
                placeholder="Поиск..."
            ></input>
            <img className={styles.cross} src={svg}></img>
        </AppCard>
    );
}
