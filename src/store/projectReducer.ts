import { ProjectState } from "../types/state";
import { ProjectAction, ProjectActionType } from "./actions";

export const initialState: ProjectState = {
    selectedProjectId: undefined,
    projects: []
};

export function projectReducer(
    state: ProjectState = initialState,
    action: ProjectAction
): ProjectState {
    switch (action.type) {
        case ProjectActionType.START_ADD:
            return {
                ...state,
                selectedProjectId: null
            };

        case ProjectActionType.CANCEL:
            return {
                ...state,
                selectedProjectId: undefined
            };

        case ProjectActionType.ADD: {
            const newProject = {
                ...action.payload,
                id: Date.now()
            };
            return {
                ...state,
                selectedProjectId: undefined,
                projects: [...state.projects, newProject]
            };
        }

        case ProjectActionType.SELECT:
            return {
                ...state,
                selectedProjectId: action.payload
            };

        case ProjectActionType.DELETE:
            if (!state.selectedProjectId) return state;

            return {
                ...state,
                selectedProjectId: undefined,
                projects: state.projects.filter(
                    project => project.id !== state.selectedProjectId
                )
            };

        default:
            return state;
    }
}
