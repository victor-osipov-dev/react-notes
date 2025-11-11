import { useState } from "react";
import { AppCard } from "../AppCard";
import styles from "./style.module.css";
import clsx from "clsx";
import { AppButton } from '@components/AppButton'
import { AppChip } from "../AppChip/AppChip";

export function EditNote() {
    const [noteName, setNoteName] = useState('Name')
    const [noteDesc, setNoteDesc] = useState('')

    if (noteName || noteDesc) {
        var footerElement = (
            <footer className={styles.footer}>
                <div className={styles['footer__edit']}>
                    <AppChip><i>I</i></AppChip>
                    <AppChip><b>B</b></AppChip>
                </div>

                <AppButton height="40px" type="gray">Закрыть</AppButton>
            </footer>
        )
    }

    return (
        <AppCard>
            <div className={clsx(styles["content"])}>
                <input onChange={(e) => setNoteName(e.target.value)} value={noteName} placeholder="Название..." className={clsx(styles.input, styles.title)}></input>
                <input onChange={(e) => setNoteDesc(e.target.value)} value={noteDesc} placeholder="Описание..." className={clsx(styles.input)}></input>
            </div>
            { footerElement }
        </AppCard>
    );
}
