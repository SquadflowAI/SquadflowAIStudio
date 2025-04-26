import { useEffect, useState } from "react";
import { createProjectAPI, getAllProjectsAPI } from "../api/api.projects";
import { getAllUIFlows } from "../api/api.uiflow";
import { ProjectDto } from "../dtos/project-dto";
import CreateProjectModal from "./create-project-modal";

export default function ProjectsTable() {
    const [_projects, setProjects] = useState([]);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const closeModal = () => setShowCreateProject(false);
  
    const openCreateProject = () => {
      setShowCreateProject(true)
    }

    useEffect(() => {
        async function getProjects() {
            try {
                const response = await getAllProjectsAPI();
                setProjects(response);
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getProjects();
    }, []);

    const createProject = (name) => {

        let project = new ProjectDto();
        project.name = name;

        _projects.push(project);
    
        createProjectAPI(project);
      };
    

    return (
        <div className="p-4 sm:ml-64">

            <div className="preview-container">
                <div className="flex flex-row  ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Projects</h4>
                    <button onClick={openCreateProject}
                        type="button"
                        className="ml-auto text-black bg-slate-300 hover:bg-slate-400 focus:outline-none   font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Create</button>
                    <CreateProjectModal isOpen={showCreateProject}
                        onClose={closeModal}
                        onAdd={createProject} ></CreateProjectModal>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Last Modified
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {_projects.map((row) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {row.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.createdDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.updatedDate}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}