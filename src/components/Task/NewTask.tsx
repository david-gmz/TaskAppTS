import React from "react";
import Button from "../Button";
import Input from "../Input";
import { NewTaskProps } from "../../models";
export default function NewTask({ onAddTask }: NewTaskProps) {
    const [enteredTask, setEnteredTask] = React.useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEnteredTask(e.target.value);
    const handleClick = () => {
        onAddTask(enteredTask)
        setEnteredTask('')
    }
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
