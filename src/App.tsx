import React from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Sidebar from "./components/Sidebar";
import { InitState, ActionType, Action, ProjectProps } from "./models";

function projectsReducer(state: InitState, action: Action) {
  switch (action.type) {
    case ActionType.START_ADD_PROJECT:
      return {
          ...state,
          selectedProjectId: null
      };
      case ActionType.ADD_PROJECT: {
          const newProject = {
                ...action.payload,
                id: Date.now()
            };
            return {
                ...state,
                selectedProjectId: undefined,
                projects: [...state.projects, newProject]
            };
      }
  
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

    const handleAddProject = (projectData: ProjectProps) => {
        dispatchProjects({
            type: ActionType.ADD_PROJECT,
            payload: projectData
        });
    }
console.log('StateProjects: ', stateProjects);

    let content;
    if (stateProjects.selectedProjectId === undefined)
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    else if (stateProjects.selectedProjectId === null) content = <NewProject onAddProject={handleAddProject} />;
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar onStartAddProject={handleStartAddProject} projectsList={stateProjects.projects} />
            {content}
        </main>
    );
}

export default App;
