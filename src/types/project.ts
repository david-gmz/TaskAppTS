export interface ProjectFields {
    title: string;
    description: string;
    dueDate: string;
}
export interface Project extends ProjectFields {
    id: number;
}

export type ProjectId = Project["id"];
export interface TaskEntry {
    text: string;
}
export interface Task extends TaskEntry {
    id: ProjectId;
    taskId: number;
}
export type TaskId = Task["taskId"];
