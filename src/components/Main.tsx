
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";
import { ChildrenRN } from "../types/uiTypes";
import { useProjects } from "../hooks/useProjects";

export default function Main({ children }: ChildrenRN) {
    const { selectedProjectId } = useProjects();
    const renderContent = () => {
        if (selectedProjectId === null) return <NewProject />;
        if (selectedProjectId === undefined) return <NoProjectSelected />;
        return <SelectedProject />;
    };

    return (
        <main className="h-screen my-8 flex gap-8">
            {children}
            {renderContent()}
        </main>
    );
}
