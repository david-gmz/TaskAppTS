import React from "react";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import SelectedProject from "./SelectedProject";
import { ProjectsContext } from "../store/ProjectsContext";
import { ChildrenRN } from "../models";

export default function Content({ children }: ChildrenRN) {
    const {selectedProjectId} = React.useContext(ProjectsContext);
    let content = <SelectedProject />;
    if (selectedProjectId === undefined)
        content = (
            <NoProjectSelected />
        );
    else if (selectedProjectId === null) content = <NewProject />;

    return (
        <main className="h-screen my-8 flex gap-8">
                {children} {content}
        </main>
    );
}
