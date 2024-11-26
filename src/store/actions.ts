import { ProjectFields, ProjectId } from "../types/project";

export const enum ProjectActionType {
    START_ADD = "project/start_add",
    CANCEL = "project/cancel",
    ADD = "project/add",
    SELECT = "project/select",
    DELETE = "project/delete"
}

export type ProjectAction =
    | { type: ProjectActionType.START_ADD }
    | { type: ProjectActionType.CANCEL }
    | { type: ProjectActionType.ADD; payload: ProjectFields }
    | { type: ProjectActionType.SELECT; payload: ProjectId }
    | { type: ProjectActionType.DELETE };
