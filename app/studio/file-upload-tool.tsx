'use client';

import { useState } from 'react';

export default function FileUploadTool({
  nodeId,
  onFileSelect,
}: {
  nodeId: string;
  onFileSelect: (nodeId: string, key: string, file: File | null) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(nodeId, 'pdf', file); // Notify parent
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileSelect(nodeId, 'pdf', null); // Notify parent of removal
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 text-gray-400 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16V4m0 0a4 4 0 014-4h2a4 4 0 014 4v12m-6 4h6m-6 0v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2"
            />
          </svg>
          <p className="mb-1 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-400">PDF only (max 10MB)</p>
        </div>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {selectedFile ? (
        <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
          <span className="text-sm text-gray-800 truncate">{selectedFile.name}</span>
          <button
            onClick={handleRemoveFile}
            className="ml-4 text-red-600 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">No file selected</div>
      )}
    </div>
  );
}
