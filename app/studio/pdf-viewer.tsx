'use client';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { X } from 'lucide-react';

interface PdfModalProps {
  fileUrl: string;
  onClose: () => void;
}

export default function PdfModal({ fileUrl, onClose }: PdfModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-5xl h-[90vh] rounded-xl shadow-lg border border-gray-300 overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 bg-white p-1 rounded-full shadow hover:bg-gray-100"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* PDF Viewer */}
        <div className="h-full">
          <iframe
            src={fileUrl}
            width="100%"
            height="90vh"
            style={{ border: 'none' }}
            title="PDF Viewer"
          />
          {/* <Worker workerUrl="/pdf.worker.min.js">                
            <Viewer fileUrl={fileUrl} />
          </Worker> */}
        </div>
      </div>
    </div>
  );
}
