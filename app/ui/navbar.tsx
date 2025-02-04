'use client';

import Link from "@/node_modules/next/link";
//import { useAuth } from "../contexts/AuthProvider";

export default function Navbar() {
    //const { isAuthenticated, authProviderLogout } = useAuth();
    const isAuthenticated = true;
    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"> */}
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">SquadflowAI</span>
                    </a>

                    {!isAuthenticated ? (
                        <div className="ml-auto"><Link  href="/login">
                            <button
                                type="button"
                                className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">Login</button>
                        </Link><Link href="/sign-up">
                                <button
                                    type="button"
                                    className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">Sign Up</button>
                                    </Link></div>
                    ) : (
                        <Link className="ml-auto" href="/login">
                            <button
                               // onClick={authProviderLogout}
                                type="button"
                                className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">Logout</button>
                                </Link>)}
                    <Link href="/projects">
                        <button
                            type="button"
                            className="mr-2 text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-300 dark:focus:ring-slate-300">Studio</button>
                            </Link>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                    </div>
                </div>
            </nav>
        </div>
    )
}