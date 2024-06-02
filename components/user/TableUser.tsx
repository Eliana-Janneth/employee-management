import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { TooltipButton } from "../TooltipButton";

interface TableProps {
    users: any;
    setIsModaViewOpen: any;
    setRowId: any;
    idUser?: number | null;
    setPopupComponent:React.Dispatch<React.SetStateAction<string>>;
}

export const TableUser = ({ users, setIsModaViewOpen, setRowId, idUser, setPopupComponent }: TableProps) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const changePerPage = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(Math.floor(startIndex / newPerPage) + 1);
    };

    const filteredData = idUser ? users.filter((employee: any) => employee.id === idUser) : users;

    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const changePage = (newPage: number) => {
        setPage(newPage);
    };
    const openModalView = () => {
        setPopupComponent('updateUser');
        setIsModaViewOpen(true);
    };


    return (
        <>
            {currentData.length > 0 && (
                <section className="container px-4 mx-auto">
                    <div className="flex items-center flex-col sm:flex-row justify-between" >
                        <div className="flex gap-x-3 items-center">
                            <h2 className="sm:text-lg text-md font-medium text-[#b22323]">Cantidad de Usuarios:</h2>
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
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Email</th>

                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Rol</th>

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
                                                                <img className="object-cover w-10 h-10 rounded-full" src={item.image} alt="" />
                                                                <div className="truncate">
                                                                    <h2 className="font-medium text-gray-800 ">{item.name}</h2>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                        <p className="text-sm font-normal text-gray-600">{item.email}</p>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap ">
                                                        <p className="text-sm font-normal text-gray-600">{item.role === 'ADMIN' ? 'Administrador' : 'Usuario'}</p>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">

                                                            <TooltipButton tooltipText="Editar Rol"
                                                                onClick={() => {
                                                                    openModalView();
                                                                    setRowId(item.id);
                                                                }}
                                                                icon={<FaPencil className="w-5 h-5" />}
                                                                color="hover:text-blue-500" />
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