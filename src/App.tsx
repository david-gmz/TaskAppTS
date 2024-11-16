import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { InitState } from "./models";

function App() {
    const initialState: InitState = {
        selectedProjectId: undefined,
        projects: []
    };
    const [stateProjects, setStateProjects] =
        React.useState<InitState>(initialState);
    const handleStartAddProject = () => {
        setStateProjects(prevState => ({
            ...prevState,
            selectedProjectId: null
        }));
    };
    let content;
    if (stateProjects.selectedProjectId === undefined)
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    else if (stateProjects.selectedProjectId === null) content = <NewProject />;
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar onStartAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
