import { ProjectFieldsProps, ProjectProps } from "./propsTypes";

enum ActionType {
    START_ADD_PROJECT = "START_ADD_PROJECT",
    CANCEL_ADD_PROJECT = "CANCEL_ADD_PROJECT",
    ADD_PROJECT = "ADD_PROJECT",
    SELECTED_PROJECT = "SELECTED_PROJECT",
    DELETE_PROJECT = "DELETE_PROJECT"
}

type Action =
    | { type: ActionType.START_ADD_PROJECT }
    | { type: ActionType.CANCEL_ADD_PROJECT }
    | { type: ActionType.ADD_PROJECT; payload: ProjectFieldsProps }
    | { type: ActionType.SELECTED_PROJECT; payload: ProjectProps["id"] }
    | { type: ActionType.DELETE_PROJECT; payload: ProjectProps["id"] };

export { ActionType };
export type { Action };
