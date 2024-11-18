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
}


interface ProjectFieldsProps {
    title: string;
    description: string;
    dueDate: string;
}

interface ProjectProps extends ProjectFieldsProps {
    id: number;
}

interface SidebarProps {
    onStartAddProject: () => void;
    projectsList: ProjectProps[];
}

interface NewProjectProps {
    onAddProject: (p: ProjectFieldsProps) => void;
}
interface InitState {
    selectedProjectId: undefined | null;
    projects: ProjectProps[];
}
type ButtonCaption = { buttonCaption: string};
type ChildrenRN = {
    children: React.ReactNode
}
type ModalProps = ChildrenRN & ButtonCaption
export type {
    InputProps,
    InitState,
    ButtonProps,
    SidebarProps,
    ProjectFieldsProps,
    NewProjectProps,
    ModalProps
};
