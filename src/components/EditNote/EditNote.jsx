import { useState } from "react";
import { AppCard } from "../AppCard";
import styles from "./style.module.css";
import clsx from "clsx";
import { AppButton } from "@components/AppButton";
import { AppChip } from "@components/AppChip";
import { useClickOutside } from "@hooks/useClickOutside";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export function EditNote({ title, text, noteSave, deleteNote }) {
    const [noteTitle, setNoteTitle] = useState(title ?? "");

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Отключаем ненужные форматы
                heading: false,
                bulletList: false,
                orderedList: false,
                blockquote: false,
                codeBlock: false,
                horizontalRule: false,
                strike: false,
                code: false,
            }),
            Placeholder.configure({
                placeholder: "Введите текст...",
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: text,
    });

    const handleClickOutside = () => {
        if (noteTitle || editor.getText()) {
            console.log("Клик за пределами!");
            noteSave(noteTitle, editor.getHTML());
        } else {
            deleteNote();
        }
    };

    const ref = useClickOutside(handleClickOutside);

    if (noteTitle || editor.getText()) {
        var footerElement = (
            <footer className={styles.footer}>
                <div className={styles["footer__edit"]}>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <i>I</i>
                    </AppChip>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <b>B</b>
                    </AppChip>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().unsetAllMarks().run()
                        }
                    >
                        Очистить форматирование
                    </AppChip>
                </div>

                <AppButton
                    onClick={() => {
                        if (noteTitle && editor.getText()) {
                            noteSave(noteTitle, editor.getHTML());
                        }
                    }}
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

                <EditorContent editor={editor} />
            </div>
            {footerElement}
        </AppCard>
    );
}
