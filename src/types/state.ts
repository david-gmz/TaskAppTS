import { Project, ProjectId } from "./project";

export type ProjectViewState =
    | { type: "NO_SELECTION" }
    | { type: "ADDING_NEW" }
    | { type: "SELECTED"; projectId: ProjectId };

export interface ProjectState {
    selectedProjectId: undefined | null | Project["id"];
    projects: Project[];
}