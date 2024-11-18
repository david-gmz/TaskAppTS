import React from "react";
import Input from "./Input";
import { NewProjectProps } from "../models";

export default function NewProject({ onAddProject }: NewProjectProps) {
    const title = React.useRef<HTMLInputElement>(null);
    const description = React.useRef<HTMLTextAreaElement>(null);
    const dueDate = React.useRef<HTMLInputElement>(null);
    const handleSave = () => {
        if (
            title.current !== null &&
            description.current !== null &&
            dueDate.current !== null
        ) {
            const enteredTitle = title.current.value;
            const enteredDescription = description.current.value;
            const enteredDueDate = dueDate.current.value;

            onAddProject({
                title: enteredTitle,
                description: enteredDescription,
                dueDate: enteredDueDate
            });
        }
    };
    return (
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950">
                        Cancel
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
                        Save
                    </button>
                </li>
            </menu>
            <div>
                <Input
                    ref={title}
                    isTextarea={false}
                    label="Title"
                    props={{ type: "text", placeholder: "Enter text" }}
                />
                <Input
                    ref={description}
                    label="Description"
                    props={{ placeholder: "Enter your description" }}
                    isTextarea
                />
                <Input
                    ref={dueDate}
                    isTextarea={false}
                    label="Due Date"
                    props={{ type: "date" }}
                />
            </div>
        </div>
    );
}
