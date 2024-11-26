import React from "react";
import { InputProps } from "../types/uiTypes";

const Input = React.forwardRef<
    HTMLTextAreaElement | HTMLInputElement,
    InputProps
>(function Input({ isTextarea, label, props = {} }: InputProps, ref) {
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
                <label htmlFor={label.toLowerCase()} className={classesLabel}>
                    {label}
                </label>
                <textarea
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    id={label.toLowerCase()}
                    className={classesInput}
                    {...textareaProps}
                />
            </p>
        );
    } else {
        // Narrow to Input props
        const inputProps = props as React.InputHTMLAttributes<HTMLInputElement>;
        return (
            <p className={classesP}>
                <label htmlFor={label.toLowerCase()} className={classesLabel}>
                    {label}
                </label>
                <input
                    ref={ref as React.Ref<HTMLInputElement>}
                    id={label.toLowerCase()}
                    className={classesInput}
                    {...inputProps}
                />
            </p>
        );
    }
});

export default Input;
