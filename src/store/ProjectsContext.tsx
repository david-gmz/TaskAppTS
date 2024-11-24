import React from "react";
import {
    ChildrenRN,
    InitState,
    ProjectContextProps,
    ProjectFieldsProps,
    ProjectProps,
    TaskProps
} from "../models";

const initialState: InitState = {
    selectedProjectId: undefined,
    projects: [],
    tasks: []
};

const ProjectsContext = React.createContext<ProjectContextProps>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
    onStartAddProject: () => {},
    onCancelProject: () => {},
    onSelectedProject: () => {},
    onAddProject: () => {},
    onDeleteProject: () => {},
    onAddTask: () => {},
    onDeleteTask: () => { },
    project: undefined
});

function ProjectsContextProvider({ children }: ChildrenRN) {
    const [stateProjects, setStateProjects] =
        React.useState(initialState);

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
            projects: stateProjects.projects.filter(
                project => project.id !== prevStateProjects.selectedProjectId
            )
        }));
    };
    const selectedProject = stateProjects.projects.find(
        project => project.id === stateProjects.selectedProjectId
    );
    const handleAddTask = (text: string) => {
        setStateProjects(prevStateProjects => {
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
                tasks: [newTask, ...prevStateProjects.tasks]
            };
        });
    };
    const selectedProjectTask = stateProjects.tasks.filter(
        task => task.id === stateProjects.selectedProjectId
    );
    const handleDeleteTask = (id: TaskProps["id"]) => {
        setStateProjects((prevStateProjects: InitState) => ({
            ...prevStateProjects,
            tasks: stateProjects.tasks.filter(task => task.taskId !== id)
        }));
    };

    const projectsContext = {
        selectedProjectId: stateProjects.selectedProjectId,
        projects: stateProjects.projects,
        onStartAddProject: handleStartAddProject,
        onCancelProject: handleCancelAddProject,
        onSelectedProject: handleSelectedProject,
        onAddProject: handleAddProject,
        onDeleteProject: handleDeletedProject,
        onAddTask: handleAddTask,
        onDeleteTask: handleDeleteTask,
        project: selectedProject,
        tasks: selectedProjectTask
    };
    return (
        <ProjectsContext.Provider value={projectsContext}>
            {children}
        </ProjectsContext.Provider>
    );
}

export { ProjectsContext, ProjectsContextProvider };
