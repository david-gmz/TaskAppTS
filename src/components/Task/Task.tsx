import { NewTaskProps, TasksProps } from "../../models";
import NewTask from "./NewTask";

export default function Task({ onAddTask, tasks }: NewTaskProps & TasksProps) {
    const tasksList = tasks.map(task => (
        <li key={task.taskId} className="flex justify-between my-4">
            <span>{task.text}</span>
        </li>
    ));

    return (
        <section>
            <NewTask onAddTask={onAddTask} />
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Tasks list
            </h2>
           {tasks.length === 0 && <p className="text-stone-800 my-4">
                This project does not have task yet.
            </p>}
            {tasks.length > 0 && <ul>{tasksList}</ul>}
        </section>
    );
}
