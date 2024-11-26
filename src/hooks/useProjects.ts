import React from "react";
import { ProjectFields, ProjectId } from "../types/project";
import { ProjectActionType } from "../store/actions";
import { useProjectDispatch, useProjectState } from "./useProjectContext";

export function useProjects() {
    const { selectedProjectId, projects } = useProjectState();
    const dispatch = useProjectDispatch();

    const selectedProject = React.useMemo(
        () => projects.find(project => project.id === selectedProjectId),
        [projects, selectedProjectId]
    );

    const startAddProject = React.useCallback(() => {
        dispatch({ type: ProjectActionType.START_ADD });
    }, [dispatch]);

    const cancelProject = React.useCallback(() => {
        dispatch({ type: ProjectActionType.CANCEL });
    }, [dispatch]);

    const addProject = React.useCallback(
        (projectData: ProjectFields) => {
            dispatch({ type: ProjectActionType.ADD, payload: projectData });
        },
        [dispatch]
    );

    const selectProject = React.useCallback(
        (id: ProjectId) => {
            dispatch({ type: ProjectActionType.SELECT, payload: id });
        },
        [dispatch]
    );

    const deleteProject = React.useCallback(() => {
        dispatch({ type: ProjectActionType.DELETE });
    }, [dispatch]);

    return {
        selectedProjectId,
        projects,
        selectedProject,
        startAddProject,
        cancelProject,
        addProject,
        selectProject,
        deleteProject
    };
}
