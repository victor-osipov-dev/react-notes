import { useState } from "react";
import { AppCard } from "../AppCard";
import styles from "./style.module.css";
import clsx from "clsx";
import { AppButton } from "@components/AppButton";
import { AppChip } from "../AppChip/AppChip";
import { useClickOutside } from "../../hooks/useClickOutside";

export function EditNote({ title, text, noteSave }) {
    const [noteTitle, setNoteTitle] = useState(title ?? "");
    const [noteText, setNoteText] = useState(text ?? "");

    const handleClickOutside = () => {
        if (noteTitle && noteText) {
            console.log("Клик за пределами!");
            noteSave(noteTitle, noteText);
        }
    };

    const ref = useClickOutside(handleClickOutside);

    if (noteTitle || noteText) {
        var footerElement = (
            <footer className={styles.footer}>
                <div className={styles["footer__edit"]}>
                    <AppChip>
                        <i>I</i>
                    </AppChip>
                    <AppChip>
                        <b>B</b>
                    </AppChip>
                </div>

                <AppButton
                    onClick={() => noteSave(noteTitle, noteText)}
                    height="40px"
                    type="gray"
                >
                    Сохранить
                </AppButton>
            </footer>
        );
    }

    return (
        <AppCard ref={ref}>
            <div className={clsx(styles["content"])}>
                <input
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
                    placeholder="Название..."
                    className={clsx(styles.input, styles.title)}
                ></input>
                <input
                    onChange={(e) => setNoteText(e.target.value)}
                    value={noteText}
                    placeholder="Описание..."
                    className={clsx(styles.input)}
                ></input>
            </div>
            {footerElement}
        </AppCard>
    );
}
