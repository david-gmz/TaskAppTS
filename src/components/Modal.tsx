import React from "react";
import { ModalProps } from "../types/uiTypes";
import { createPortal } from "react-dom";
import Button from "./Button";

const modalRoot = document.getElementById("modal-root");

const Modal = React.forwardRef(function Modal(
    { children, buttonCaption }: ModalProps,
    ref: React.Ref<{ open: () => void }>
) {
    const dialog = React.useRef<HTMLDialogElement | null>(null);
    React.useImperativeHandle(ref, () => {
        return {
            open() {
                if (dialog.current) dialog.current.showModal();
            }
        };
    });
    if (modalRoot) {
        return createPortal(
            <dialog
                ref={dialog}
                className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
                {children}
                <form method="dialog" className="mt-4 text-right">
                    <Button label={buttonCaption} />
                </form>
            </dialog>,
            modalRoot
        );
    }
    return null;
});

export default Modal;
