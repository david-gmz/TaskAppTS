import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { InitState } from "./models";

enum ActionType {
    START_ADD_PROJECT = "START_ADD_PROJECT"
}

type Action = {type: ActionType.START_ADD_PROJECT;}

function projectsReducer(state: InitState, action: Action) {
  switch (action.type) {
    case ActionType.START_ADD_PROJECT:
      return {
          ...state,
          selectedProjectId: null
      };
  
    default:
      return state;
  }
 }

function App() {
    const initialState: InitState = {
        selectedProjectId: undefined,
        projects: []
    };
  
  const [stateProjects, dispatchProjects] = React.useReducer(projectsReducer, initialState);
  
    const handleStartAddProject = () => {
      dispatchProjects({
          type: ActionType.START_ADD_PROJECT
        })
    };
    let content;
    if (stateProjects.selectedProjectId === undefined)
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    else if (stateProjects.selectedProjectId === null) content = <NewProject />;
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar onStartAddProject={handleStartAddProject} />
            {content}
        </main>
    );
}

export default App;
