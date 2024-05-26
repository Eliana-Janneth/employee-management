import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { PiEyeBold } from "react-icons/pi";
import { FaChartColumn } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { TooltipButton } from "../TooltipButton";

interface TableProps {
    users: any;
    setIsModaViewOpen: any;
    setIsModalPayrollOpen: any;
    setIsModalPerformanceOpen: any;
    setRowId: any;
    idEmployee?: number | null;
}

export const TableUser = ({ users, setIsModaViewOpen, setIsModalPayrollOpen, setIsModalPerformanceOpen, setRowId, idEmployee }: TableProps) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isHovered, setIsHovered] = useState(false);

    const changePerPage = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(Math.floor(startIndex / newPerPage) + 1);
    };

    const filteredData = idEmployee ? users.filter((employee: any) => employee.id === idEmployee) : users;

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const changePage = (newPage: number) => {
        setPage(newPage);
    };
    const openModalView = () => {
        setIsModaViewOpen(true);
    };
    const openModalPayroll = () => {
        setIsModalPayrollOpen(true);
    };
    const openModalPerformance = () => {
        setIsModalPerformanceOpen(true);
    }

    return (
        <>
            {currentData.length > 0 && (
                <section className="container px-4 mx-auto">
                    <div className="flex items-center flex-col sm:flex-row justify-between" >
                        <div className="flex gap-x-3 items-center">
                            <h2 className="sm:text-lg text-md font-medium text-[#b22323]">Cantidad de Empleados:</h2>
                            <span className="px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full ">{users.length}</span>
                        </div>

                        <div className="flex items-center justify-end mt-4 font-medium text-[#b22323] ">
                            <label htmlFor="perPage" className="mr-2">Items por página:</label>
                            <select
                                id="perPage"
                                value={perPage}
                                onChange={(e) => changePerPage(Number(e.target.value))}
                                className="p-2 border rounded">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <div className="flex items-center gap-x-3">
                                                        <span>Nombre</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Cédula</th>

                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Salario Base</span>

                                                        <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Teléfono</th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Fecha de ingreso</th>

                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentData.map((item: any) => (

                                                <tr key={item.id}>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3 ">
                                                            <div className="flex items-center gap-x-2 ">
                                                                <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                                                                <div className="truncate">
                                                                    <h2 className="font-medium text-gray-800 ">{item.name}</h2>
                                                                    <p className="text-sm font-normal text-gray-600">{item.email}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{item.id}</td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                                                            <span className=" text-emerald-500 font-bold">$</span>
                                                            <h2 className="text-sm font-normal text-emerald-500">{item.baseSalary}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{item.phone}</td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-2">
                                                            <p className="px-3 py-1 text-xs text-blue-500 rounded-full bg-blue-100/60">{new Date(item.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">

                                                            <TooltipButton tooltipText="Información"
                                                                onClick={() => {
                                                                    openModalView();
                                                                    setRowId(item.id);
                                                                }}
                                                                icon={<PiEyeBold className="w-5 h-5" />}
                                                                color="hover:text-blue-500" />
                                                            <TooltipButton tooltipText="Nómina"
                                                                onClick={() => {
                                                                    openModalPayroll();
                                                                    setRowId(item.id);
                                                                }}
                                                                icon={<TbReportMoney className="w-5 h-5" />}
                                                                color="hover:text-green-500" />

                                                            <TooltipButton tooltipText="Desempeño"
                                                                onClick={() => {
                                                                    openModalPerformance();
                                                                    setRowId(item.id);
                                                                }}
                                                                icon={<FaChartColumn className="w-5 h-5" />}
                                                                color="hover:text-orange-500" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <button
                            disabled={page === 1}
                            onClick={() => changePage(page - 1)}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100">
                            <FaLongArrowAltLeft />
                            <span>
                                Atrás
                            </span>

                        </button>

                        <div className="items-center hidden lg:flex gap-x-3">
                            {Array.from({ length: Math.ceil(users.length / perPage) }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => changePage(i + 1)}
                                    className={`px-2 py-1 text-sm rounded-md ${i + 1 === page
                                        ? 'text-blue-500 bg-blue-100'
                                        : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={endIndex >= users.length}
                            onClick={() => changePage(page + 1)}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
                            <span>
                                Siguiente
                            </span>

                            <FaLongArrowAltRight />

                        </button>
                    </div>
                </section>
            )}

        </>
    )
}