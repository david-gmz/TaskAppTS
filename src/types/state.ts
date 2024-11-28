import { Project, ProjectId, Task } from "./project";

export type ProjectViewState =
    | { type: "NO_SELECTION" }
    | { type: "ADDING_NEW" }
    | { type: "SELECTED"; projectId: ProjectId };

export interface ProjectState {
    viewState: ProjectViewState;
    projects: Project[];
    tasks: Task[];
}
