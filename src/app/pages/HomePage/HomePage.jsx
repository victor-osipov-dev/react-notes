import { AppButton } from "@components/AppButton";
import { EditNote } from "@components/EditNote";
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
                    <a href="/doc.pptx">Отчёт</a>
                </AppButton>
            </div>

            <footer className={styles.footer}>
                <EditNote className={styles['edit-note']} title="Текст задачи" text="<p>Описание задачи</p><p>Описание задачи</p><p>Описание задачи</p>" buttonClassName={styles['edit-note-button']}></EditNote>
            </footer>
        </div>
    );
}
