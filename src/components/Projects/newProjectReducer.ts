import { ProjectFields } from "../../types/project";
import { NewProjectActionType } from "./localAction";

export function newdProjectReducer(
    state: ProjectFields,
    action: { type: NewProjectActionType; payload?: string }
): ProjectFields {
    switch (action.type) {
        case NewProjectActionType.SET_TITLE:
            return { ...state, title: action.payload || "" };
        case NewProjectActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload || "" };
        case NewProjectActionType.SET_DUE_DATE:
            return { ...state, dueDate: action.payload || "" };
        default:
            return state;
    }
}
