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

type OnStartAdd = {
    onStartAddProject: () => void;
}
// type ButtonChildrenProps = ButtonProps | ChildrenProp
interface InitState {
    selectedProjectId: undefined | null;
    projects: [];
}

export type { InputProps, InitState, ButtonProps, OnStartAdd };