import React from "react";
import { ProjectState } from "../types/state";
import { ProjectAction } from "../store/actions";

export const ProjectStateContext = React.createContext<
    ProjectState | undefined
>(undefined);
export const ProjectDispatchContext = React.createContext<
    React.Dispatch<ProjectAction> | undefined
>(undefined);
