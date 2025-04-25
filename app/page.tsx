import Image from "next/image";
import Footer from "./ui/footer";
import Navbar from "./ui/navbar";

export default function Home() {
  return (

    <main className="flex flex-col p-6">
      <Navbar></Navbar>
      <div className='min-h-screen home-page-body'>
        <div className=' text-purple-700 justify-center flex text-5xl font-black text-center'>Build Websites and Build AI Agents</div>
        <div className='text-slate-400 justify-center flex text-3xl mt-5 text-center font-bold'>Building towards most complete <div className='ml-2 mr-2 text-black text-3xl text-center font-bold'>NO CODE</div> platform</div>

        {/* <div className=' text-gray justify-center flex text-xl mt-5 text-center font-bold'>For interested: welcome@legioncode.io</div> */}
      </div>
      <Footer></Footer>
    </main>


  );
}
