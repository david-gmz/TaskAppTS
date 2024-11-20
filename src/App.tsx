import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import {
    InitState,
    ActionType,
    Action,
    ProjectFieldsProps,
    ProjectProps
} from "./models";
import SelectedProject from "./components/SelectedProject";

function projectsReducer(state: InitState, action: Action) {
    switch (action.type) {
        case ActionType.START_ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: null
            };
        case ActionType.CANCEL_ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: undefined
            };
        case ActionType.ADD_PROJECT: {
            const newProject = {
                ...action.payload,
                id: Date.now()
            };
            return {
                ...state,
                selectedProjectId: undefined,
                projects: [...state.projects, newProject]
            };
        };
        case ActionType.SELECTED_PROJECT: {
            return {
                ...state,
                selectedProjectId: action.payload
            }
        }

        default:
            return state;
    }
}

function App() {
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
    const selectedProject = stateProjects.projects.find(
        project => project.id === stateProjects.selectedProjectId
    );
    let content = <SelectedProject project={selectedProject!} />;
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
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                onSelectedProject={handleSelectedProject}
                projectsList={stateProjects.projects}
                highlightSelectedID={stateProjects.selectedProjectId!}
            />
            {content}
        </main>
    );
}

export default App;
