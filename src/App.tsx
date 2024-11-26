import { ProjectProvider } from "./context/ProjectProvider";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
    return (
        <ProjectProvider>
            <Main>
                <Sidebar />
            </Main>
        </ProjectProvider>
    );
}

export default App;
