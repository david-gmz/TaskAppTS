import { ProjectFieldsProps } from "./propsTypes";

enum ActionType {
    START_ADD_PROJECT = "START_ADD_PROJECT",
    CANCEL_ADD_PROJECT = "CANCEL_ADD_PROJECT",
    ADD_PROJECT = "ADD_PROJECT"
}

type Action =
    | { type: ActionType.START_ADD_PROJECT }
    | { type: ActionType.CANCEL_ADD_PROJECT }
    | { type: ActionType.ADD_PROJECT; payload: ProjectFieldsProps };

export { ActionType };
export type { Action };
