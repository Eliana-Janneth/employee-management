import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
export const Navbar = () => {

    return (
        <header className="text-[#b22323] body-font bg-red-200">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">

                    <img src="icon.svg" alt="logo" className="w-10 h-10" />
                    <span className="ml-3 text-xl">EMS</span>
                </Link>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/employee" className="mr-5 hover:text-[#e74c4c]">Empleados</Link>
                    <Link href="/payroll" className="mr-5 hover:text-[#e74c4c]">Nómina</Link>
                    <Link href="/performance" className="mr-5 hover:text-[#e74c4c]">Desempeño</Link>
                    <Link href="/user" className="mr-5 hover:text-[#e74c4c]">Usuarios</Link>
                </nav>
                <button className="inline-flex items-center bg-[#b22323] text-[#fdf3f3] border-0 py-1 px-3 focus:outline-none hover:bg-[#e74c4c] rounded text-base mt-4 md:mt-0">Login
                    <FaArrowRight />
                </button>
            </div>
        </header>
    );
};