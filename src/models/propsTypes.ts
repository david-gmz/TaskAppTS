import React from "react";

interface InputPropsBase {
    label: string;
}

interface InputPropsTextArea extends InputPropsBase {
    isTextarea: true;
    props?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

interface InputPropsInput extends InputPropsBase {
    isTextarea?: false;
    props?: React.InputHTMLAttributes<HTMLInputElement>;
}

type InputProps = InputPropsTextArea | InputPropsInput;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

interface ProjectFieldsProps {
    title: string;
    description: string;
    dueDate: string;
}

interface ProjectProps extends ProjectFieldsProps {
    id: number;
}
interface InitState {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
}
interface SidebarProps {
    onStartAddProject: () => void;
    onSelectedProject: (id: ProjectProps["id"]) => void;
    projectsList: ProjectProps[]
};

interface NewProjectProps {
    onAddProject: (p: ProjectFieldsProps) => void;
    onCancelProject: () => void
}
interface SelectedProjectProps {
    project: ProjectProps
}
type ChildrenRN = {
    children: React.ReactNode
}
type ButtonCaption = {
    buttonCaption: string
}

type ModalProps = ChildrenRN & ButtonCaption;
export type {
    InputProps,
    InitState,
    ButtonProps,
    SidebarProps,
    NewProjectProps,
    SelectedProjectProps,
    ProjectFieldsProps,
    ProjectProps,
    ModalProps
};
