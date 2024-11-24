import {
    InitState,
    ActionType,
    Action
} from "../models";

function projectsReducer(state: InitState, action: Action) {
    switch (action.type) {
        case ActionType.START_ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: null
            };
        case ActionType.CANCEL_ADD_PROJECT:
            return {
                ...state,
                selectedProjectId: undefined
            };
        case ActionType.ADD_PROJECT: {
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
        case ActionType.SELECTED_PROJECT: {
            return {
                ...state,
                selectedProjectId: action.payload
            };
        }
        case ActionType.DELETE_PROJECT:
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
export {projectsReducer}