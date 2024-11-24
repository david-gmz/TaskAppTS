
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { ProjectsContextProvider } from "./store/ProjectsContext";

function App() {

    return (
        <ProjectsContextProvider>
            <Content>
                <Sidebar />
            </Content>
        </ProjectsContextProvider>
    );
}

export default App;
