import React from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../models";

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
            <dialog ref={dialog}>
                {children}
                <form method="dialog">
                    <button>{buttonCaption}</button>
                </form>
            </dialog>,
            modalRoot
        );
    }
    return null;
});

export default Modal;
