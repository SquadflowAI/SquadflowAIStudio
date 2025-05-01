'use client';

import { useState } from "react";
import { createUserAPI } from "../api/api.users";
import { CreateUserDto } from "../dtos/create-user-dto";
import Navbar from "../ui/navbar";

export default function Page() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfrimPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleCreateUser = async () => {
        if (password !== confirmPassword) {
            throw console.error();
        }
        var newUser = new CreateUserDto();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.confirmPassword = confirmPassword;

        await createUserAPI(newUser);
    }

    return (
        <div className="mt-16">
            <Navbar />
            <div className="preview-container">
                <div className="flex flex-row justify-center">
                    <h4 className="mt-12 mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create new account</h4>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="w-full flex items-center flex-col">
                        <input
                            value={name}
                            onChange={handleNameChange}
                            type="text" placeholder="Name" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <input
                            value={email}
                            onChange={handleEmailChange}
                            type="text" placeholder="Email" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <input
                            value={password}
                            onChange={handlePasswordChange}
                            type="text" placeholder="Password" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <input
                            value={confirmPassword}
                            onChange={handleConfrimPasswordChange}
                            type="text" placeholder="Confirm Password" className="mt-2 w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </input>
                        <button
                            onClick={() => handleCreateUser()}
                            type="button"
                            className="w-1/4 mt-4 text-black bg-slate-300 hover:bg-slate-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
