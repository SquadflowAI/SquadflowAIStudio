import { useEffect, useState } from "react";
import { getAllUIFlows } from "../api/api.uiflow";

export default function FlowsTable() {
    const [_flows, setFlows] = useState([]);

    useEffect(() => {
        async function getUIFlows() {
            try {
                const response = await getAllUIFlows();
                setFlows(response);
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getUIFlows();
    }, []);

    return (
        <div className="p-4 sm:ml-64">

            <div className="preview-container">
                <div className="flex flex-row  ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">My Flows</h4>
                    <button
                                         
                                         type="button"
                                         className="ml-auto text-black bg-slate-300 hover:bg-slate-400   focus:outline-none   font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Create</button>
                </div>

                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {_flows.map((row) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row.id}
                                    </th>
                                    <td class="px-6 py-4">
                                        {row.name}
                                    </td>
                      
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}