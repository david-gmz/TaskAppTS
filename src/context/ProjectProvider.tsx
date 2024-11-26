import React from "react";
import { projectReducer } from "../store/projectReducer";
import { ProjectDispatchContext, ProjectStateContext } from "./ProjectContext";
import { initialState } from "../store/projectReducer";
import { ChildrenRN } from "../types/uiTypes";

export function ProjectProvider({ children }: ChildrenRN) {
    const [state, dispatch] = React.useReducer(projectReducer, initialState);

    return (
        <ProjectStateContext.Provider value={state}>
            <ProjectDispatchContext.Provider value={dispatch}>
                {children}
            </ProjectDispatchContext.Provider>
        </ProjectStateContext.Provider>
    );
}
