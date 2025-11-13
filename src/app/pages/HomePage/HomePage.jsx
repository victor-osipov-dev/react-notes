import { AppButton } from "@components/AppButton";
import styles from "./style.module.css";
import { Link } from "react-router";

export function HomePage() {
    return (
        <div className={styles["home-page"]}>
            <h1 className={styles.title}>Приложение для заметок</h1>

            <div className={styles.actions}>
                <Link to="/notes">
                    <AppButton className={styles["app-button"]}>
                        Начать пользоваться
                    </AppButton>
                </Link>
                <AppButton className={styles["app-button"]} type="secondary">
                    Отчёт
                </AppButton>
            </div>

            <footer className={styles.footer}></footer>
        </div>
    );
}
