import React from "react";
import { useProjects } from "../../hooks/useProjects";
import Button from "../Button";
import Input from "../Input";
import { tasksReducer } from "./tasksReducer";
import { LocalActionType } from "./localAction";

export default function NewTask() {
    const { addTask } = useProjects();
    const [taskText, dispatchTaskText] = React.useReducer(tasksReducer, "");
    const handleSave = () => {
        if (!taskText.trim()) return;
        addTask({ text: taskText });
        // Clear the input using local reducer
        dispatchTaskText({ type: LocalActionType.CLEAR_TASK_TEXT });
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatchTaskText({
            type: LocalActionType.SET_TASK_TEXT,
            payload: e.target.value
        });

    return (
        <div className="flex gap-4">
            <Input
                label="Task"
                props={{
                    placeholder: "Enter a task",
                    value: taskText,
                    onChange: handleChange
                }}
            />
            <Button onClick={handleSave} label="Add task" variant="text" />
        </div>
    );
}
