import React from "react";

import { InputProps } from "../models";

export default function Input({ isTextarea, label, props = {} }: InputProps) {
    const classesP = "flex flex-col gap-1 my-4";
    const classesLabel = "text-sm font-bold uppercase text-stone-500";
    const classesInput =
        "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    if (isTextarea) {
        // Narrow to TextArea props
        const textareaProps =
            props as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
        return (
            <p className={classesP}>
                <label className={classesLabel}>{label}</label>
                <textarea className={classesInput} {...textareaProps} />
            </p>
        );
    } else {
        // Narrow to Input props
        const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
        return (
            <p className={classesP}>
                <label className={classesLabel}>{label}</label>
                <input className={classesInput} {...inputProps} />
            </p>
        );
    }
}
