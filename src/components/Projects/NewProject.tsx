import React from "react";
import Input from "../Input";
import Modal from "../Modal";
import { useProjects } from "../../hooks/useProjects";
import Button from "../Button";
import { newdProjectReducer } from "./newProjectReducer";
import { NewProjectActionType } from "./localAction";

const initialState = {
    title: "",
    description: "",
    dueDate: ""
};

export default function NewProject() {
    const { addProject, cancelProject } = useProjects();
    const [newProjectState, newProjectDispatch] = React.useReducer(
        newdProjectReducer,
        initialState
    );
    const modal = React.useRef<{ open: () => void } | null>(null);
    const handleSave = () => {
        if (!newProjectState.title.trim() || !newProjectState.description.trim() || !newProjectState.dueDate.trim()) {
            modal.current!.open();
            return;
        }
        addProject({
            title: newProjectState.title,
            description: newProjectState.description,
            dueDate: newProjectState.dueDate
        });
    };
    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
        newProjectDispatch({
            type: NewProjectActionType.SET_TITLE,
            payload: e.target.value
        });
    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        newProjectDispatch({
            type: NewProjectActionType.SET_DESCRIPTION,
            payload: e.target.value
        });
    const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) =>
        newProjectDispatch({
            type: NewProjectActionType.SET_DUE_DATE,
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
                            value: newProjectState.title,
                            onChange: handleChangeText
                        }}
                    />
                    <Input
                        label="Description"
                        props={{
                            name: "description",
                            placeholder: "Enter your description",
                            value: newProjectState.description,
                            onChange: handleChangeDescription
                        }}
                        isTextarea
                    />
                    <Input
                        isTextarea={false}
                        label="Due Date"
                        props={{
                            type: "date",
                            name: "dueDate",
                            value: newProjectState.dueDate,
                            onChange: handleChangeDueDate
                        }}
                    />
                </div>
            </div>
        </>
    );
}
