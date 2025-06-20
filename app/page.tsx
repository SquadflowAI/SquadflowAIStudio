import Image from "next/image";
import Footer from "./ui/footer";
import Navbar from "./ui/navbar";

export default function Home() {
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
        {/* <div className='ml-2 mr-2 text-black text-3xl text-center font-bold'>AI AGENTS</div> */}

        {/* <div className=' text-gray justify-center flex text-xl mt-5 text-center font-bold'>For interested: welcome@legioncode.io</div> */}

        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Use Cases</div>
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
