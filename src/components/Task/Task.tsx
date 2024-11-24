import React from "react";
import Button from "../Button";
import NewTask from "./NewTask";
import { ProjectsContext } from "../../store/ProjectsContext";

export default function Task() {
    const {
        tasks,
        onDeleteTask
    } = React.useContext(ProjectsContext);
    const tasksList = tasks.map(task => (
        <li key={task.taskId} className="flex justify-between my-4">
            <span>{task.text}</span>
            <Button onClick={() => onDeleteTask(task.taskId)} label="Clear" variant="text" />
        </li>
    ));

    return (
        <section>
            <NewTask />
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Tasks list
            </h2>
            {tasks.length === 0 && (
                <p className="text-stone-800 my-4">
                    This project does not have task yet.
                </p>
            )}
            {tasks.length > 0 && (
                <ul className="p-4 mt-8 rounded-md bg-stone-100">
                    {tasksList}
                </ul>
            )}
        </section>
    );
}
