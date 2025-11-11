import { NotesSearch } from "@components/NotesSearch";
import { useState } from "react";
import styles from "./style.module.css";
import { AppCard } from "@components/AppCard";
import clsx from "clsx";
import { EditNote } from "@components/EditNote/EditNote";
import { AppNote } from "../../../components/AppNote";

export function NotesPage() {
    const [searchNoteName, setSearchNoteName] = useState("");

    return (
        <>
            <div className={clsx(styles["notes-page"], "container")}>
                <NotesSearch
                    className={styles["notes-search"]}
                    setSearchNoteName={setSearchNoteName}
                    noteName={searchNoteName}
                ></NotesSearch>

                <EditNote></EditNote>

                <AppNote title={'Name'} text={'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты.'}></AppNote>
                <AppNote title={'Name'} text={'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты.'}></AppNote>
            </div>
        </>
    );
}
