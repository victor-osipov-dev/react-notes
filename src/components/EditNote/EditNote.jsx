import { useState } from "react";
import { AppCard } from "@components/AppCard";
import styles from "./style.module.css";
import clsx from "clsx";
import { AppButton } from "@components/AppButton";
import { AppChip } from "@components/AppChip";
import { useClickOutside } from "@hooks/useClickOutside";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import svg from '@svg/Ластик.svg'

export function EditNote({ title, text, noteSave, deleteNote, buttonClassName, ...attrs }) {
    const [noteTitle, setNoteTitle] = useState(title ?? "");
    const [isText, setIsText] = useState(
        text == "<p></p>" || !text ? false : true
    );
    const isContent = noteTitle || isText;

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
                placeholder: "Описание...",
                emptyEditorClass: "is-editor-empty",
            }),
        ],
        content: text,
        onUpdate: ({ editor }) => {
            if (editor.getText()) {
                setIsText(true);
            } else {
                setIsText(false);
            }
        },
    });

    const handleClickOutside = () => {
        if (isContent) {
            console.log("Клик за пределами!");
            noteSave(noteTitle, editor.getHTML());
        } else {
            deleteNote?.();
        }
    };

    const ref = useClickOutside(handleClickOutside);

    if (isContent) {
        var footerElement = (
            <footer className={styles.footer}>
                <div className={styles["footer__edit"]}>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                    >
                        <i className={styles.icon}>I</i>
                    </AppChip>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                    >
                        <b className={styles.icon}>B</b>
                    </AppChip>
                    <AppChip
                        onClick={() =>
                            editor.chain().focus().unsetAllMarks().run()
                        }
                    >
                        <img className={styles.img} src={svg}></img>
                    </AppChip>
                </div>

                <AppButton
                    className={clsx(buttonClassName)}
                    onClick={() => {
                        if (isContent) {
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
        <AppCard {...attrs} ref={ref}>
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
