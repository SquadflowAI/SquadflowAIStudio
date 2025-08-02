'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ui/chat-input";
import Footer from "./ui/footer";
import Navbar from "./ui/navbar";

export default function Home() {
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (

    <main className="flex flex-col p-6">
      <Navbar></Navbar>
      <div className='min-h-screen home-page-body'>
        <div className="text-5xl font-black text-center justify-center flex 
          bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 
          bg-clip-text text-transparent">
          Build AI Agents and Websites
        </div>
        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Re-Gain hundreds of hours for your business</div>
        <div className="flex flex-row justify-center mt-4">
          <div className="flex flex-row w-1/4">
            <button className="px-3 mr-1 py-1 w-1/2 text-xl bg-black hover:bg-gray-200 text-white rounded-full transition"
            > Website
            </button>
            <button className="px-3 w-1/2 py-1 text-xl bg-black hover:bg-gray-200 text-white rounded-full transition"
            > Agents
            </button>
          </div>

        </div>
        <ChatInput></ChatInput>
        {/* <div className='ml-2 mr-2 text-black text-3xl text-center font-bold'>AI AGENTS</div> */}

        {/* <div className=' text-gray justify-center flex text-xl mt-5 text-center font-bold'>For interested: welcome@legioncode.io</div> */}

        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Use Cases</div>
        <div className="flex flex-row">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition hover:shadow-md">
            <img
              src="yoo"
              alt="yoo"
              className="w-full h-40 object-cover"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Email</h3>
                <p className="text-sm text-gray-600">yoo</p>
              </div>
              <p className="mt-4 text-xs text-gray-400">yoo</p>
            </div>
          </div>

        </div>
        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Features</div>
        Build your own custom AI Agents
        <div className="flex flex-row">
          <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Accounting</div>
          <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Mortgage Lending</div>
        </div>

        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Templates</div>
      </div>
      <Footer></Footer>
    </main>


  );
}
