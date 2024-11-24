import { ProjectProps, ProjectFieldsProps } from "./propsTypes";

interface ContextProps {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
    onStartAddProject(): void;
    onCancelProject: () => void;
    onSelectedProject: (id: ProjectProps["id"]) => void;
    onAddProject: (projectData: ProjectFieldsProps) => void;
    onDeleteProject: () => void;
    project: ProjectProps | undefined;
    highlightSelectedID: ProjectProps["id"];
}

export type { ContextProps };
