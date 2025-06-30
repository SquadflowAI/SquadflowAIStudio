import { useEffect, useState } from "react";
import { getAllFlowTemplatesAPI } from "../api/api.flowtemplates";
import { createUIFlowFromTemplateAPI } from "../api/api.uiflow";
import { useAuth } from "../contexts/AuthProvider";
import { useDataContext } from "../contexts/DataContext";

export default function TemplatesPage() {

    const [_templates, setTemplates] = useState([]);
    const { projectInMemory } = useDataContext();
    const { user } = useAuth();

    useEffect(() => {
        async function getTemplates() {
            try {
                const response = await getAllFlowTemplatesAPI();
                setTemplates(response);
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getTemplates();
    }, []);

    const createFlow = async (template: any) => {

        try {
            await createUIFlowFromTemplateAPI(template, user.userId, projectInMemory.id);


        } catch (error) {
            console.error("Error saving workflow:", error);

        }
    }

    return (
        <div className="p-4 sm:ml-64">

            <div className="preview-container">
                <div className="flex flex-row  ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Templates</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {_templates.map((row) => (
                        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                            <div className="w-[15%] aspect-square bg-gray-200 rounded-full mb-4"></div>
                            <h3 className="text-xl font-semibold mb-2">{row?.name}</h3>
                            <p className="text-gray-600 mb-6">
                                {row?.description}
                            </p>
                            <div className="flex flex-row">
                                <span className="self-start bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                                    {row?.category}
                                </span>
                                <button onClick={() => createFlow(row)} className="ml-auto cursor-pointer  p-2 focus:outline-none text-white bg-black hover:bg-slate-500 focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-900">Use</button>
                            </div>

                        </div>
                    ))}

                    {/* <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="w-[15%] aspect-square bg-gray-200 rounded-full mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Stock Report</h3>
                        <p className="text-gray-600 mb-6">
                            Learn key steps to establish a memorable brand identity from scratch.
                        </p>
                        <span className="self-start bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                            Marketing
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="w-[15%] aspect-square bg-gray-200 rounded-full mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">CV Reviewer</h3>
                        <p className="text-gray-600 mb-6">
                            Explore the fundamentals of user-centered design and creative problem solving.
                        </p>
                        <span className="self-start bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                            Design
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="w-[15%] aspect-square bg-gray-200 rounded-full mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Intro to AI Tools</h3>
                        <p className="text-gray-600 mb-6">
                            Get started with AI-powered tools to boost productivity and creativity.
                        </p>
                        <span className="self-start bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
                            Technology
                        </span>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
                        <div className="w-[15%] aspect-square bg-gray-200 rounded-full mb-4"></div>
                        <h3 className="text-xl font-semibold mb-2">Social Media Strategy</h3>
                        <p className="text-gray-600 mb-6">
                            Discover how to grow your audience with an effective social media presence.
                        </p>
                        <span className="self-start bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                            Marketing
                        </span>
                    </div> */}

                </div>
            </div>
        </div>

    )
}