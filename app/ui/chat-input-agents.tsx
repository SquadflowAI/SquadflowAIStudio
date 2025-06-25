'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatInput() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const suggestions = [
    'CRM',
    'Personal Finance',
    'Real Estate Portal',
    'Job Board',
    'Fitness Tracker',
    'E-commerce Store',
  ];

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSend = () => {
    if (!value.trim()) return;
    console.log('Send:', value);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setValue((prev) => (prev ? `${prev} ${text}` : text));
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-4">
      <div className="flex items-end gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-200">
        <textarea
          ref={textAreaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows={3}
          className="flex-1 resize-none overflow-hidden bg-transparent text-base text-gray-800 border-none outline-none focus:ring-0 placeholder:text-gray-400 leading-relaxed"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim()}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-full disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Send
        </button>
      </div>

      {/* Suggestions */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Some ideas to build:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => handleSuggestionClick(item)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
