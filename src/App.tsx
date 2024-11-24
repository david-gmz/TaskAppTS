
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { ProjectsContextProvider } from "./store/ProjectsContext";

function App() {

    
    return (
        <ProjectsContextProvider>
            <Main>
                <Sidebar />
            </Main>
        </ProjectsContextProvider>
    );
}

export default App;
