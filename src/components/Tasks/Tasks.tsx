import { useProjects } from "../../hooks/useProjects";
import NewTask from "./NewTask";

export default function Tasks() {
    const { tasks } = useProjects();
    const tasksList =
        tasks.length === 0 ? (
            <p>This project does not have tasks yet.</p>
        ) : (
            <ul>
                {tasks.map(task => (
                    <li key={task.taskId}>{task.text}</li>
                ))}
            </ul>
        );
    console.log('Tasks: ', tasks);
    
    return (
        <section>
            <NewTask />
            <h2 className="text-2xl font-bold text-stone-900 my-4">
                Tasks List
            </h2>
            {tasksList}
        </section>
    );
}
