import { LocalActionType } from "./localAction";

export function tasksReducer(
    state: string,
    action: { type: LocalActionType; payload?: string }
): string {
    switch (action.type) {
        case LocalActionType.SET_TASK_TEXT:
            return action.payload || "";
        case LocalActionType.CLEAR_TASK_TEXT:
            return "";
        default:
            return state;
    }
}
