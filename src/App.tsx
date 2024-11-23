import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { InitState, ProjectFieldsProps, ProjectProps, TaskProps} from "./models";
import SelectedProject from "./components/SelectedProject";

function App() {
    const initialState: InitState = {
        selectedProjectId: undefined,
        projects: [],
        tasks: []
    };
    const [stateProjects, setStateProjects] =
        React.useState<InitState>(initialState);

    const handleStartAddProject = () => {
        setStateProjects(prevStateProjects => ({
            ...prevStateProjects,
            selectedProjectId: null
        }));
    };

    const handleCancelAddProject = () => {
        setStateProjects(prevStateProjects => ({
            ...prevStateProjects,
            selectedProjectId: undefined
        }));
    };
    const handleSelectedProject = (id: ProjectProps["id"]) => {
        setStateProjects(prevStateProjects => ({
            ...prevStateProjects,
            selectedProjectId: id
        }));
    };
    const handleAddProject = (projectData: ProjectFieldsProps) => {
        setStateProjects((prevStateProjects: InitState) => {
            const newProject = {
                ...projectData,
                id: Date.now()
            };
            return {
                ...prevStateProjects,
                selectedProjectId: undefined,
                projects: [...prevStateProjects.projects, newProject]
            };
        });
    };
    const handleDeletedProject = () => {
        setStateProjects((prevStateProjects: InitState) => ({
            ...prevStateProjects,
            selectedProjectId: undefined,
            projects: stateProjects.projects.filter(project => project.id !== prevStateProjects.selectedProjectId)
        }))
    };
    const selectedProject = stateProjects.projects.find(
        project => project.id === stateProjects.selectedProjectId
    );
    const handleAddTask = (text: string) => {
        setStateProjects((prevStateProjects) => {
            if (!prevStateProjects.selectedProjectId) {
                return prevStateProjects; // Return unchanged if no project is selected
            }
            const newTask = {
                text,
                id: prevStateProjects.selectedProjectId,
                taskId: Date.now()
            };
            return {
                ...prevStateProjects,
                tasks: [newTask,...prevStateProjects.tasks]
            };
        });
    }
const selectedProjectTasks = stateProjects.tasks.filter(
    task => task.id === stateProjects.selectedProjectId
);
    const handleDeleteTask = (id: TaskProps["id"]) => {
        setStateProjects((prevStateProjects: InitState) => ({
            ...prevStateProjects,
            tasks: stateProjects.tasks.filter(
                task => task.taskId !== id
            )
        }));
    }
    let content = (
        <SelectedProject
            onDeleteProject={handleDeletedProject}
            project={selectedProject!}
            onAddTask={handleAddTask}
            tasks={selectedProjectTasks}
            onDeleteTask={handleDeleteTask}
        />
    );
    if (stateProjects.selectedProjectId === undefined)
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    else if (stateProjects.selectedProjectId === null)
        content = (
            <NewProject
                onAddProject={handleAddProject}
                onCancelProject={handleCancelAddProject}
            />
        );
    console.log('Projects', stateProjects);
    
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onSelectedProject={handleSelectedProject}
                onStartAddProject={handleStartAddProject}
                projectsList={stateProjects.projects}
                selectedProjectId={stateProjects.selectedProjectId!}
            />
            {content}
        </main>
    );
}

export default App;
