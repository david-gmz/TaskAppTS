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
interface InitState {
    selectedProjectId: undefined | null | ProjectProps["id"];
    projects: ProjectProps[];
}
type ChildrenRN = {
    children: React.ReactNode
}
type ButtonCaption = {
    buttonCaption: string
}

type ModalProps = ChildrenRN & ButtonCaption;
export type {
    ChildrenRN,
    InputProps,
    InitState,
    ButtonProps,
    ProjectFieldsProps,
    ProjectProps,
    ModalProps
};
