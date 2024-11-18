import { ProjectProps } from "./propsTypes";

enum ActionType {
    START_ADD_PROJECT = "START_ADD_PROJECT",
    ADD_PROJECT = "ADD_PROJECT"
}

type Action =
    | { type: ActionType.START_ADD_PROJECT }
    | { type: ActionType.ADD_PROJECT; payload: ProjectProps };

export { ActionType };
export type { Action };
