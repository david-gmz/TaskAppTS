import React from "react";
import { projectsReducer } from "./projectsReducer";
import {
    ActionType,
    InitState,
    ProjectFieldsProps,
    ProjectProps
} from "../models";
import { ContextProps, ChildrenRN } from "../models";

const ProjectsContext = React.createContext<ContextProps>({
    selectedProjectId: undefined,
    projects: [],
    onStartAddProject: () => {},
    onCancelProject: () => {},
    onSelectedProject: () => {},
    onAddProject: () => {},
    onDeleteProject: () => {},
    project: undefined,
    highlightSelectedID: 0
});

function ProjectsContextProvider({ children }:ChildrenRN ) {
    const initialState: InitState = {
        selectedProjectId: undefined,
        projects: []
    };

    const [stateProjects, dispatchProjects] = React.useReducer(
        projectsReducer,
        initialState
    );

    const handleStartAddProject = () =>
        dispatchProjects({
            type: ActionType.START_ADD_PROJECT
        });

    const handleCancelAddProject = () =>
        dispatchProjects({
            type: ActionType.CANCEL_ADD_PROJECT
        });

    const handleAddProject = (projectData: ProjectFieldsProps) =>
        dispatchProjects({
            type: ActionType.ADD_PROJECT,
            payload: projectData
        });
    const handleSelectedProject = (id: ProjectProps["id"]) =>
        dispatchProjects({
            type: ActionType.SELECTED_PROJECT,
            payload: id
        });
    const handleDeleteProject = () =>
        dispatchProjects({
            type: ActionType.DELETE_PROJECT,
        });
    const selectedProject = stateProjects.projects.find(
        project => project.id === stateProjects.selectedProjectId
    );
    const projectsContext = {
        selectedProjectId: stateProjects.selectedProjectId,
        projects: stateProjects.projects,
        onStartAddProject: handleStartAddProject,
        onCancelProject: handleCancelAddProject,
        onSelectedProject: handleSelectedProject,
        onAddProject: handleAddProject,
        onDeleteProject: handleDeleteProject,
        project: selectedProject,
        highlightSelectedID: stateProjects.selectedProjectId!
    };
    return (
        <ProjectsContext.Provider value={projectsContext}>
            {children}
        </ProjectsContext.Provider>
    );
}

export { ProjectsContext, ProjectsContextProvider };
