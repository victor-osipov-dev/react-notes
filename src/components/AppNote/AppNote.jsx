import { AppCard } from "../AppCard";
import styles from "./style.module.css";
import svg from "@svg/Крестик.svg";

export function AppNote({title, text}) {
    return (
        <AppCard className={styles['app-note']}>
            <div className={styles.content}>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>

            <img className={styles.cross} src={svg}></img>
        </AppCard>
    );
}
