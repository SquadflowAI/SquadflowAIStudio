'use client';

import { useState, useRef, useEffect } from 'react';

export default function PageLayout() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex home-page-body flex-col bg-gray-100">
      {/* Global Top Bar */}
      <div className="flex justify-between items-center border-b border-gray-300 px-4 py-2 bg-white">
        <div className="flex gap-2">
          <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition">
            Studio
          </button>
          <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition">
            Workspace
          </button>
        </div>
        <div className="flex gap-2">
          <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-gray-200 hover:bg-gray-300 transition">
            Preview
          </button>
          <button className="text-sm font-medium px-3 py-1.5 rounded-md bg-black text-white hover:bg-gray-900 transition">
            Publish
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left Panel */}
        <div className="w-full md:w-1/3 border-r border-gray-300 flex flex-col p-4 bg-white">
          <h2 className="text-lg font-semibold mb-4">Describe what you want to build</h2>

          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="bg-gray-200 text-sm p-2 rounded-md text-gray-800">
                {msg}
              </div>
            ))}
          </div>

          <div className="border border-gray-300 rounded-2xl p-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-100">
            <textarea
              ref={textAreaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. I want to build a CRM for freelancers..."
              rows={3}
              className="w-full resize-none overflow-hidden bg-transparent text-sm text-gray-800 border-none outline-none focus:ring-0 p-2"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-300 hover:bg-gray-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3 flex flex-col bg-gray-50 p-6 overflow-auto">
          <p className="text-sm text-gray-500 text-center">
            This is the preview area. It will update based on what you describe.
          </p>
        </div>
      </div>
    </div>
  );
}
