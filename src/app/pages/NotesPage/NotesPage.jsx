import { NotesSearch } from "@components/NotesSearch";
import { useState } from "react";
import styles from "./style.module.css";
import clsx from "clsx";
import { EditNote } from "@components/EditNote/EditNote";
import { AppNote } from "@components/AppNote";
import { initialNotes } from "./consts";

export function NotesPage() {
    const [notes, setNotes] = useState(
        JSON.parse(localStorage.getItem("notes")) 
        ?? initialNotes,
    );
    const [searchNoteName, setSearchNoteName] = useState("");

    localStorage.setItem("notes", JSON.stringify(notes));
    const newNoteId = Math.max(...notes.map((note) => note.id), 0) + 1;

    return (
        <>
            <div className={clsx(styles["notes-page"], "container")}>
                <NotesSearch
                    className={styles["notes-search"]}
                    setSearchNoteName={setSearchNoteName}
                    noteName={searchNoteName}
                ></NotesSearch>

                <EditNote
                    key={newNoteId}
                    noteSave={(title, text) =>
                        setNotes([
                            {
                                id: newNoteId,
                                title,
                                text,
                            },
                            ...notes,
                        ])
                    }
                ></EditNote>

                {notes.map((note, index) =>
                    note.isEdit ? (
                        <EditNote
                            key={note.id}
                            title={note.title}
                            text={note.text}
                            noteSave={(title, text) =>
                                setNotes(
                                    notes.toSpliced(index, 1, {
                                        id: note.id,
                                        title: title,
                                        text: text,
                                        isEdit: false,
                                    }),
                                )
                            }
                            deleteNote={() =>
                                setNotes(notes.toSpliced(index, 1))
                            }
                        ></EditNote>
                    ) : (
                        <AppNote
                            key={note.id}
                            title={note.title}
                            text={note.text}
                            handleClick={() =>
                                setNotes(
                                    notes.toSpliced(index, 1, {
                                        ...note,
                                        isEdit: true,
                                    }),
                                )
                            }
                            deleteNote={() =>
                                setNotes(notes.toSpliced(index, 1))
                            }
                        ></AppNote>
                    ),
                )}
            </div>
        </>
    );
}
