import { ProjectState } from "../types/state";
import { ProjectAction, ProjectActionType } from "./actions";

export const initialState: ProjectState = {
    viewState: { type: "NO_SELECTION" },
    projects: [],
    tasks: []
};

export function projectReducer(
    state: ProjectState = initialState,
    action: ProjectAction
): ProjectState {
    switch (action.type) {
        case ProjectActionType.START_ADD:
            return {
                ...state,
                viewState: { type: "ADDING_NEW" }
            };

        case ProjectActionType.CANCEL:
            return {
                ...state,
                viewState: { type: "NO_SELECTION" }
            };

        case ProjectActionType.ADD: {
            const newProject = {
                ...action.payload,
                id: Date.now()
            };
            return {
                ...state,
                viewState: { type: "NO_SELECTION" },
                projects: [...state.projects, newProject]
            };
        }

        case ProjectActionType.SELECT:
            return {
                ...state,
                viewState: { type: "SELECTED", projectId: action.payload }
            };

        case ProjectActionType.DELETE: {
            // Explicitly extract projectId if in SELECTED state
            if (state.viewState.type === "SELECTED") {
                const { projectId } = state.viewState;
                return {
                    ...state,
                    viewState: { type: "NO_SELECTION" },
                    projects: state.projects.filter(
                        project => project.id !== projectId
                    )
                };
            }
            return state;
        }
        case ProjectActionType.ADD_TASK: {
            if (state.viewState.type !== "SELECTED") return state;
            const { projectId } = state.viewState;
            const newTask = {
                ...action.payload,
                id: projectId,
                taskId: Date.now()
            };
            return {
                ...state,
                tasks: [newTask, ...state.tasks]
            };
        }

        default:
            return state;
    }
}
