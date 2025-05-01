'use client';

import { useState } from "react";
import { loginAPI } from "../api/api.users";
import { useAuth } from "../contexts/AuthProvider";
import { LoginRequestDto } from "../dtos/login-request-dto";
import Navbar from "../ui/navbar";

export default function Page() {

    const { authProviderLogin } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLoginUser = async () => {

        var newUser = new LoginRequestDto();
        newUser.email = email;
        newUser.password = password;

        var result = await loginAPI(newUser);

        authProviderLogin(result.token, result.userId);

        //localStorage.setItem('token', result.token);
        //localStorage.setItem('email', result.email);
    }

    return (
        <div className="mt-16">
            <Navbar />
            <div className="preview-container">
                <div className="flex flex-row justify-center">
                    <h4 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login into your account</h4>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="w-full flex items-center flex-col">
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            type="text" placeholder="Name" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            type="password" placeholder="Password" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <button
                            onClick={() => handleLoginUser()}
                            type="button"
                            className="w-1/4 mt-4 text-dark bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-slate-200 dark:hover:bg-slate-700 dark:focus:ring-slate-300">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


