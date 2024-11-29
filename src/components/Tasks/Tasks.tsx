import { useProjects } from "../../hooks/useProjects";
import Button from "../Button";
import NewTask from "./NewTask";

export default function Tasks() {
    const { tasks, deleteTask } = useProjects();
    if (!tasks) return null;
    const tasksList =
        tasks.length === 0 ? (
            <p className="text-stone-800 my-4">
                This project does not have tasks yet.
            </p>
        ) : (
            <ul className="p-4 mt-8 rounded-md bg-stone-100">
                {tasks.map(task => (
                    <li key={task.taskId} className="flex justify-between my-4">
                        <span>{task.text}</span>
                        <Button
                            onClick={() => deleteTask(task.taskId)}
                            label="Clear"
                            variant="text"
                        />
                    </li>
                ))}
            </ul>
        );
    
    return (
        <section>
            <NewTask />
            <h2 className="text-2xl font-bold text-stone-700 mb-4">
                Tasks List
            </h2>
            {tasksList}
        </section>
    );
}
