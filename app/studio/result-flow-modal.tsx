
import React, { useState } from "react";

const ResultFlowModal = ({ isOpen, onClose, result }) => {
    if (!isOpen) return null;

    const [pageName, setPageName] = useState("");

    const handlePageInputChange = (e) => {
        setPageName(e.target.value);
    };

    const handleAddPage = () => {
     //   onAddPage(pageName); // Send the input name to the parent component
        setPageName("");
        onClose(); // Close the modal after adding
    }

    return (
        <div>
            <div
                id="default-modal"
                tabIndex="-1"
                className="fixed  inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Result
                            </h3>
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="default-modal"
                            >
                                <svg
                                    className="w-3 h-3"

                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
            
                        {result}

                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResultFlowModal;
