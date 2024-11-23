import { NewTaskProps, SelectedProjectProps, TasksProps } from "../models";
import Button from "./Button";
import Task from "./Task";

export default function SelectedProject({
    project,
    onDeleteProject,
    onAddTask,
    tasks,
    onDeleteTask
}: SelectedProjectProps & NewTaskProps & TasksProps) {
    const formattedDate = new Date(project.dueDate).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">
                        {project.title}
                    </h1>
                    <Button
                        onClick={onDeleteProject}
                        variant="text"
                        label="Delete"
                    />
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">
                    {project.description}
                </p>
            </header>
            <Task
                onDeleteTask={onDeleteTask}
                tasks={tasks}
                onAddTask={onAddTask}
            />
        </div>
    );
}
