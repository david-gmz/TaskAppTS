import { ProjectFields, ProjectId, TaskEntry } from "../types/project";

export const enum ProjectActionType {
    START_ADD = "project/start_add",
    CANCEL = "project/cancel",
    ADD = "project/add",
    SELECT = "project/select",
    DELETE = "project/delete",
    ADD_TASK = "project/add/task"
}

export type ProjectAction =
    | { type: ProjectActionType.START_ADD }
    | { type: ProjectActionType.CANCEL }
    | { type: ProjectActionType.ADD; payload: ProjectFields }
    | { type: ProjectActionType.SELECT; payload: ProjectId }
    | { type: ProjectActionType.DELETE }
    | { type: ProjectActionType.ADD_TASK; payload: TaskEntry };
