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

type OnStartAdd = {
    onStartAddProject: () => void;
};

interface ProjectProps {
    title: string;
    description: string;
    dueDate: string;
}
interface InitState {
    selectedProjectId: undefined | null;
    projects: ProjectProps[];
}

interface NewProjectProps {
    onAddProject: (p:ProjectProps) => void;
}

export type {
    InputProps,
    InitState,
    ButtonProps,
    OnStartAdd,
    ProjectProps,
    NewProjectProps
};
