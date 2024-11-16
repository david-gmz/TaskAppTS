import noProjectImage from "../assets/logo.png";
import { OnStartAdd } from "../models";
import Button from "./Button";
export default function NoProjectSelected({ onStartAddProject }: OnStartAdd) {
    return (
        <div className="mt-24 text-center w-2/3">
            <img
                src={noProjectImage}
                alt="A block with a pen"
                className="w-16 h-16 object-contain mx-auto"
            />
            <h2 className="text-xl font-bold text-stone-500 mt-4">
                No Project Selected
            </h2>
            <p className="text-stone-400 mb-4">
                Select a project or get started with a new project
            </p>
            <p className="mt-8">
                <Button
                    label={"Create a newproject"}
                    onClick={onStartAddProject}
                />
            </p>
        </div>
    );
}