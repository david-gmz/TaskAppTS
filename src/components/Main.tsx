
import NewProject from "./Projects/NewProject";
import NoProjectSelected from "./Projects/NoProjectSelected";
import SelectedProject from "./Projects/SelectedProject";
import { ChildrenRN } from "../types/uiTypes";
import { useProjects } from "../hooks/useProjects";

export default function Main({ children }: ChildrenRN) {
    const { viewState } = useProjects();
    const renderContent = () => {
        switch (viewState.type) {
            case "ADDING_NEW":
                return <NewProject />;
            case "NO_SELECTION":
                return <NoProjectSelected />;
            case "SELECTED":
                return <SelectedProject />;
        }
    };

    return (
        <main className="h-screen my-8 flex gap-8">
            {children}
            {renderContent()}
        </main>
    );
}
