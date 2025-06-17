import { type } from "os";
import { useEffect, useState } from "react";
import { createIntegrationAPI, getAllIntegrationsByUserIdAPI } from "../api/api.integrations";
import { useAuth } from "../contexts/AuthProvider";
import IntegrationDto from "../dtos/integration-dto";

export default function IntegrationsPage() {
    const { user } = useAuth();
    const [_openAIKey, setOpenAIKey] = useState("");
    const [_serperAPIKey, setSerperAPIKey] = useState("");
    const [_type, setType] = useState("LLMs");


    useEffect(() => {
        async function getIntegrations() {
            try {
                const response = await getAllIntegrationsByUserIdAPI(user.userId);
                if (response.openAIKey) {
                    setOpenAIKey(response.openAIKey);
                }
                if (response.serperAPIKey) {
                    setSerperAPIKey(response.serperAPIKey);
                }
            } catch (error) {
                console.log(error)
            } finally {
            }
        }
        getIntegrations();
    }, []);

    const handleInputChangeOpenAIKey = (e) => {
        setOpenAIKey(e.target.value);
    };

    const handleInputChangeSerperAPIKey = (e) => {
        setSerperAPIKey(e.target.value);
    };

    const createIntegration = () => {

        let integration = new IntegrationDto();

        if (_openAIKey != "") {

            integration.userId = user.userId;
            integration.openAIKey = _openAIKey;

        }

        if (_serperAPIKey != "") {

            integration.userId = user.userId;
            integration.serperAPIKey = _serperAPIKey;

        }

        createIntegrationAPI(integration);

    };


    return (
        <div className="p-4 sm:ml-64">
            <div className="preview-container">
                <div className="flex flex-col ">
                    <h4 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Integrations</h4>
                    <div className="flex flex-row">
                        <button
                            onClick={() => setType("LLMs")}
                            type="button"
                            className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">LLMs</button>
                        <button
                            onClick={() => setType("Tools")}
                            type="button"
                            className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">Tools</button>
                    </div>
                </div>

                <div className="flex flex-col ">
                    {/* OPEN AI API */}
                   {_type == "LLMs" && <div className="mt-4 mb-4 space-y-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OpenAI API Key</label>
                        <input
                            value={_openAIKey}
                            onChange={handleInputChangeOpenAIKey}
                            type="password"
                            placeholder="Key"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                    </div>}
                    {/* SERPER API */}
                    {_type == "Tools" && <div className="p-4 md:p-5 space-y-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Serper API Key</label>
                        <input
                            value={_serperAPIKey}
                            onChange={handleInputChangeSerperAPIKey}
                            type="password"
                            placeholder="Key"
                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                    </div>}
                </div>

                 {/* SAVE */}
                <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={createIntegration}
                    className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Save
                </button>
            </div>
        </div>)
}