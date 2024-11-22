import React from "react";

interface InputPropsBase {
    label: string;
}

interface InputPropsTextArea extends InputPropsBase {
    isTextarea: true;
    props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

interface InputPropsInput extends InputPropsBase {
    isTextarea: false;
    props?: React.InputHTMLAttributes<HTMLInputElement>;
}

type InputProps = InputPropsTextArea | InputPropsInput;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    variant?: "primary" | "secondary" | "text";
}


interface ProjectFieldsProps {
    title: string;
    description: string;
    dueDate: string;
}

interface ProjectProps extends ProjectFieldsProps {
    id: number;
}

interface NoProjectSelectedProps {
    onStartAddProject: () => void;
}
interface SidebarProps extends NoProjectSelectedProps {
    onSelectedProject: (id: ProjectProps["id"]) => void;
    projectsList: ProjectProps[];
    selectedProjectId: ProjectProps["id"];
}
interface SelectedProjectProps {
    project: ProjectProps;
    onDeleteProject: () => void;
}
interface NewProjectProps {
    onAddProject: (p: ProjectFieldsProps) => void;
    onCancelProject: () => void
}
interface InitState extends TasksProps {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
}
type ButtonCaption = { buttonCaption: string};
type ChildrenRN = {
    children: React.ReactNode
}
interface NewTaskProps {
    onAddTask: (text: string) => void;
}
interface TaskProps {
    id: ProjectProps["id"];
    taskId: number;
    text: string
}
interface TasksProps {
    tasks: TaskProps[]
}
type ModalProps = ChildrenRN & ButtonCaption
export type {
    InputProps,
    InitState,
    ButtonProps,
    ProjectProps,
    SidebarProps,
    NoProjectSelectedProps,
    ProjectFieldsProps,
    NewProjectProps,
    NewTaskProps,
    TasksProps,
    ModalProps,
    SelectedProjectProps
};
