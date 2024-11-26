export interface ProjectFields {
    title: string;
    description: string;
    dueDate: string;
}

export interface Project extends ProjectFields {
    id: number;
}

export type ProjectId = Project["id"];
