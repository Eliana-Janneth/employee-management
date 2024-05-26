import { signIn } from 'next-auth/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from "react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    if (!session) {
        return (
            <header className="bg-[#b22323] text-red-200 body-font w-full">
                <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
                    <Link href='/' className="flex title-font font-medium items-center text-[#fde3e3] mb-4 md:mb-0">
                        <img src="icon.svg" alt="logo" className="w-10 h-10" />
                        <span className="ml-3 text-xl">EMS</span>
                    </Link>
                    <button 
                        className="hover:text-[#f27777]" 
                        onClick={() => signIn('auth0')}
                    >
                        Iniciar sesión
                    </button>
                </div>
            </header>
        );
    }

    const { user } = session;

    return (
        <header className="bg-[#b22323] text-red-200 body-font w-full">
            <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
                <Link href='/' className="flex title-font font-medium items-center text-[#fde3e3] mb-4 md:mb-0">
                    <img src="icon.svg" alt="logo" className="w-10 h-10" />
                    <span className="ml-3 text-xl">EMS</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/employee" className="mr-5 hover:text-[#f27777]">Empleados</Link>
                    <Link href="/user" className="mr-5 hover:text-[#f27777]">Usuarios</Link>
                </nav>
                <div className="relative inline-block">
                    <button 
                        onClick={toggleDropdown} 
                        className="relative z-10 flex items-center p-2 text-sm text-[#fdf3f3] bg-[#b22323] border border-transparent rounded-md focus:outline-none"
                    >
                        <span className="mx-1">{user?.name}</span>
                        <svg className="w-5 h-5 mx-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z" fill="currentColor"></path>
                        </svg>
                    </button>
                    {isOpen && (
                        <div
                            onClick={closeDropdown}
                            className="absolute text-[#fdf3f3] right-0 z-20 w-56 py-2 mt-2 bg-[#b22323] rounded-md shadow-xl"
                        >
                            <a href="#" className="flex items-center p-3 -mt-2 text-sm transition-colors duration-300 transform hover:bg-[#e74c4c]">
                                <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src={user?.image || '#'} alt="username" />
                                <div className="mx-1 truncate">
                                    <h1 className="text-sm font-semibold">{user?.name}</h1>
                                    <p className="text-xs">{user?.email}</p>
                                </div>
                            </a>
                            <hr className="border-gray-200" />
                            <button 
                                onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })} 
                                className="block w-full px-4 py-3 text-sm text-left capitalize transition-colors duration-300 transform hover:bg-[#e74c4c]"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};