import React from "react";
import { ProjectFields, ProjectId, TaskEntry } from "../types/project";
import { ProjectActionType } from "../store/actions";
import { useProjectDispatch, useProjectState } from "./useProjectContext";

export function useProjects() {
    const { viewState, projects, tasks } = useProjectState();
    const dispatch = useProjectDispatch();

    const selectedProject = React.useMemo(() => {
        if (viewState.type !== "SELECTED") return undefined;
        return projects.find(project => project.id === viewState.projectId);
    }, [projects, viewState]);

    const selectedProjectTask = React.useMemo(() => {
        if (viewState.type !== "SELECTED") return undefined;
        return tasks.filter(task => task.id === viewState.projectId);
    }, [tasks, viewState]);

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

    const addTask = React.useCallback(
        (taskData: TaskEntry) => {
            dispatch({ type: ProjectActionType.ADD_TASK, payload: taskData });
        },
        [dispatch]
    );

    return {
        viewState,
        projects,
        selectedProject,
        tasks: selectedProjectTask,
        startAddProject,
        cancelProject,
        addProject,
        selectProject,
        deleteProject,
        addTask
    };
}
