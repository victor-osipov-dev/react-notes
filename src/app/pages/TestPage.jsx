import { useEffect, useRef, useState } from "react";
import "./test.css";

function useSelection(contentEditableEl, text, textIndex) {
    const rangeRef = useRef(null);

    useEffect(() => {
        console.log('test', text[textIndex.current]);
        
        if (rangeRef.current && text[textIndex.current]) {
            console.log(2, 'rangeRef', rangeRef);
            
            const new_range = new Range();
            console.dir(contentEditableEl.current);

            
            new_range.setStart(
                contentEditableEl.current.children[textIndex.current]
                    .firstChild,
                rangeRef.current.startOffset
            );
            new_range.setEnd(
                contentEditableEl.current.children[textIndex.current]
                    .firstChild,
                rangeRef.current.endOffset
            );

            document.getSelection().removeAllRanges();
            document.getSelection().addRange(new_range);
        }
    });

    return rangeRef;
}

export function TestPage() {
    const [text, setText] = useState(["test", "test"]);
    const textIndex = useRef(0);
    const contentEditableEl = useRef(null);
    const rangeRef = useSelection(contentEditableEl, text, textIndex);

    useEffect(() => {
        const beforeinputHandler = (e) => {
            console.log("onBeforeInput", e);
            e.preventDefault();

            const range = document.getSelection().getRangeAt(0).cloneRange();

            const startOffset = range.startOffset;
            const endOffset = range.endOffset;
            const offsetDiff = endOffset - startOffset;

            if (
                e.inputType == "deleteContentBackward" ||
                e.inputType == "deleteByCut"
            ) {
                console.log(startOffset, endOffset);

                if (offsetDiff == 0) {
                    console.log(0);

                    setText(
                        text.toSpliced(
                            textIndex.current,
                            1,
                            text[textIndex.current]
                                .split("")
                                .toSpliced(startOffset - 1, 1)
                                .join("")
                        )
                    );

                    rangeRef.current = {
                        startOffset: startOffset - 1,
                        endOffset: startOffset - 1,
                    };
                } else {
                    setText(
                        text.toSpliced(
                            textIndex.current,
                            1,
                            text[textIndex.current]
                                .split("")
                                .toSpliced(startOffset, endOffset - startOffset)
                                .join("")
                        )
                    );

                    rangeRef.current = {
                        startOffset: startOffset,
                        endOffset: startOffset,
                    };
                }
            } else if (
                e.inputType == "insertText" ||
                e.inputType == "insertFromPaste"
            ) {
                const insertText =
                    e.data ?? e.dataTransfer.getData("text/plain");

                setText(
                    text.toSpliced(
                        textIndex.current,
                        1,
                        text[textIndex.current]
                            .split("")
                            .toSpliced(startOffset, offsetDiff, insertText)
                            .join("")
                    )
                );

                rangeRef.current = {
                    startOffset: startOffset + insertText.length,
                    endOffset: startOffset + insertText.length,
                };
            } else if (e.inputType == "insertParagraph") {
                console.log("insertParagraph", [...text, ""]);

                setText(text.toSpliced(textIndex.current + 1, 0, ""));
                textIndex.current = textIndex.current + 1;

                rangeRef.current = {
                    startOffset: 0,
                    endOffset: 0,
                };
                console.log(1, rangeRef);
                
            }
        };

        const el = contentEditableEl.current;
        el.addEventListener("beforeinput", beforeinputHandler);

        return () => {
            el.removeEventListener("beforeinput", beforeinputHandler);
        };
    }, [text, rangeRef]);

    return (
        <div>
            <div>
                {text.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            <button
                onClick={() => {
                    const new_range = new Range();
                    new_range.setStart(contentEditableEl.current.firstChild, 4);
                    new_range.setEnd(contentEditableEl.current.firstChild, 4);

                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(new_range);
                }}
            >
                Click
            </button>

            <div
                ref={contentEditableEl}
                suppressContentEditableWarning={true}
                contentEditable
            >
                {text.map((line, index) => (
                    <p
                        onClick={() => {
                            textIndex.current = index;
                        }}
                        key={index}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
}
