import { ProjectProps, ProjectFieldsProps, TaskProps } from "./UIProps";

interface ProjectContextProps {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
    tasks: TaskProps[];
    onStartAddProject(): void;
    onCancelProject: () => void;
    onSelectedProject: (id: ProjectProps["id"]) => void;
    onAddProject: (projectData: ProjectFieldsProps) => void;
    onDeleteProject: () => void;
    onAddTask: (text: string) => void;
    onDeleteTask: (id: TaskProps["id"]) => void;
    project: ProjectProps | undefined;
}

export type { ProjectContextProps };
