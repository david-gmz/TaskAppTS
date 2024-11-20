import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { InitState, ProjectFieldsProps, ProjectProps } from "./models";
import SelectedProject from "./components/SelectedProject";

function App() {
    const initialState: InitState = {
        selectedProjectId: undefined,
        projects: []
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
 const handleSelectedProject = (id:ProjectProps['id']) => {
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
    const selectedProject = stateProjects.projects.find(project => project.id === stateProjects.selectedProjectId)

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
                onSelectedProject={handleSelectedProject}
                onStartAddProject={handleStartAddProject}
                projectsList={ stateProjects.projects }
                selectedProjectId={stateProjects.selectedProjectId!}
            />
            {content}
        </main>
    );
}

export default App;
