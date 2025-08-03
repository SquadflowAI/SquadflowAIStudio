import { useEffect, useState } from "react";
import { createUIFlowAPI, deleteUIFlowByIdAPI, getAllUIFlowsAPI, getUIFlowsByProjectIdAPI } from "../api/api.uiflow";
import { useDataContext } from "../contexts/DataContext";
import { UIFlowDto } from "../dtos/ui-flow-dto";
import CreateFlowModal from "./create-flow-modal";
import { useRouter } from "@/node_modules/next/navigation";
import { useAuth } from "../contexts/AuthProvider";
import CreateDataModal from "./create-data-modal";
import { deleteDataFileByIdAPI, getDataByProjectIdAPI } from "../api/api.data";
import PdfModal from "../studio/pdf-viewer";
import { API_BASE_URL } from "../constants";

export default function DataTable() {
    const [_data, setData] = useState([]);
    const [showCreateData, setShowCreateData] = useState(false);
    const closeModal = () => setShowCreateData(false);
    const { projectInMemory } = useDataContext();
    const router = useRouter();
    const { user } = useAuth();

    const [showModalPdfViewer, setShowModalPdfViewer] = useState(false);

    const openCreateData = () => {
        setShowCreateData(true)
    }

    useEffect(() => {
        async function getData() {
            try {
                const response = await getDataByProjectIdAPI(projectInMemory?.id);
                setData(response);
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getData();
    }, []);

    const createData = async (file) => {
        setData((data) => [...data, file])
    };

    const openPreview = () => {
        setShowModalPdfViewer(true)
    }

    const deleteDataFile = (id: any) => {
        let deletedFlow = _data.filter(x => x.id !== id);
        setData(deletedFlow);
        deleteDataFileByIdAPI(id)
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="preview-container">
                <div className="flex flex-row  ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Data</h4>
                    <button
                        onClick={openCreateData}
                        type="button"
                        className="ml-auto text-black bg-slate-300 hover:bg-slate-400   focus:outline-none   font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Add</button>
                    <CreateDataModal isOpen={showCreateData}
                        onClose={closeModal}
                        onAdd={createData} ></CreateDataModal>
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Data type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created Date
                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                                <th scope="col" className="px-6 py-3">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {_data.map((row) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <td className="px-6 py-4 flex-row flex items-center font-medium text-gray-900">
                                        <img src="../../pdf.svg" className="h-7 mr-3"></img><div className="">{row.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        -
                                    </td>
                                    <td className="px-6 py-4">
                                        -
                                    </td>
                                    <td className="px-6 py-4   ">
                                        <button onClick={() => openPreview()} className="ml-auto cursor-pointer  p-2 focus:outline-none text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Preview</button>
                                        {showModalPdfViewer && row.id && (
                                            <PdfModal
                                                fileUrl={`${API_BASE_URL}/UIFlow/documents/download/${row.id}`}
                                                onClose={() => setShowModalPdfViewer(false)}
                                            />
                                        )}
                                    </td>
                                    <td className="px-6 py-4  ">
                                        <div onClick={() => deleteDataFile(row.id)}>
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}