import React from "react";
import Input from "../Input";
import Modal from "../Modal";
import { useProjects } from "../../hooks/useProjects";
import Button from "../Button";
import { entriesReducer } from "./entriesReducer";
import { EntriesActionType } from "./localAction";
import { ProjectFields } from "../../types/project";

const initialState = {
    title: "",
    description: "",
    dueDate: ""
};

export default function NewProject() {
    const { addProject, cancelProject } = useProjects();
    const [entriesState, entriesDispatch] = React.useReducer(
        entriesReducer,
        initialState
    );
    const modal = React.useRef<{ open: () => void } | null>(null);
    const handleSave = () => {
        if (!entriesState.title.trim() || !entriesState.description.trim() || !entriesState.dueDate.trim()) {
            modal.current!.open();
            return;
        }
        addProject({
            title: entriesState.title,
            description: entriesState.description,
            dueDate: entriesState.dueDate
        });
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof ProjectFields ) =>
        entriesDispatch({
            type: EntriesActionType.UPDATE_ENTRIES,
            field,
            payload: e.target.value
        });
    return (
        <>
            <Modal ref={modal} buttonCaption="Okey">
                <h2 className="text-xl font-bold text-stone-700 my-4">
                    Invalid input
                </h2>
                <p className="text-stone-600 mb-4">
                    Oops... looks like you forgot to enter a value.{" "}
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a value for every field.
                </p>
            </Modal>
            <div className="w-[35rem] mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <Button
                            onClick={cancelProject}
                            variant="text"
                            label="Cancel"
                        />
                    </li>
                    <li>
                        <Button
                            onClick={handleSave}
                            variant="secondary"
                            label="Save"
                        />
                    </li>
                </menu>
                <div>
                    <Input
                        isTextarea={false}
                        label="Title"
                        props={{
                            type: "text",
                            name: "title",
                            placeholder: "Enter text",
                            value: entriesState.title,
                            onChange: e => handleChange(e, "title")
                        }}
                    />
                    <Input
                        label="Description"
                        props={{
                            name: "description",
                            placeholder: "Enter your description",
                            value: entriesState.description,
                            onChange: e => handleChange(e, "description")
                        }}
                        isTextarea
                    />
                    <Input
                        isTextarea={false}
                        label="Due Date"
                        props={{
                            type: "date",
                            name: "dueDate",
                            value: entriesState.dueDate,
                            onChange: e => handleChange(e, "dueDate")
                        }}
                    />
                </div>
            </div>
        </>
    );
}
