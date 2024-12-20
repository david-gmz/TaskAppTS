import React from "react";
import Button from "../Button";
import Input from "../Input";
import { ProjectsContext } from "../../store/ProjectsContext";
export default function NewTask() {
    const { onAddTask } = React.useContext(ProjectsContext)
    const [enteredTask, setEnteredTask] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEnteredTask(e.target.value);
    const handleClick = () => {
        if (enteredTask.trim() !== "") onAddTask(enteredTask);
        setEnteredTask("");
    };
    return (
        <div className="flex items-center gap-4">
            <Input
                label="Task"
                isTextarea={false}
                props={{
                    value: enteredTask,
                    onChange: handleChange,
                    placeholder: "Enter your task"
                }}
            />
            <Button onClick={handleClick} label="+ Add Task" variant="text" />
        </div>
    );
}
