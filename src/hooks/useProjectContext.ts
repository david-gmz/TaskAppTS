import React from "react";
import { ProjectDispatchContext, ProjectStateContext } from "../context/ProjectContext";

export function useProjectState() {
    const context = React.useContext(ProjectStateContext);
    if (context === undefined) {
        throw new Error(
            "useProjectState must be used within a ProjectProvider"
        );
    }
    return context;
}

export function useProjectDispatch() {
    const context = React.useContext(ProjectDispatchContext);
    if (context === undefined) {
        throw new Error(
            "useProjectDispatch must be used within a ProjectProvider"
        );
    }
    return context;
}
