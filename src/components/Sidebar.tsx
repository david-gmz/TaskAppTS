import Button from "./Button";
import { useProjects } from "../hooks/useProjects";

export default function Sidebar() {
    const {
        projects,
        selectedProjectId,
        startAddProject,
        selectProject
    } = useProjects();
    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
                Projects List
            </h2>
            <div>
                <Button onClick={startAddProject} label="+ Add Project" />
            </div>
            <ul>
                {projects.map(project => {
                    const isSelected = project.id === selectedProjectId;
                    const classes = `
                        w-full text-left px-2 py-1 rounded-sm my-1 
                        ${
                            isSelected
                                ? "bg-stone-800 text-stone-200"
                                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
                        }
                    `;

                    return (
                        <li key={project.id}>
                            <button
                                onClick={() => selectProject(project.id)}
                                className={classes}>
                                {project.title}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
