import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

interface TableProps {
    hours: any;
    setRowId:React.Dispatch<React.SetStateAction<string>>;
    idEmployee?: string | null;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TablePayroll = ({ setRowId, hours, setOpenModal }: TableProps) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const changePerPage = (newPerPage: number) => {
        setPerPage(newPerPage);
        setPage(Math.floor(startIndex / newPerPage) + 1);
    };


    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    const currentData = hours?.slice(startIndex, endIndex);

    const changePage = (newPage: number) => {
        setPage(newPage);
    };

    const openModalDelete = () => {
        setOpenModal(true)
    }

    const nameDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return (
        <>
            {currentData && currentData?.length > 0 ? (
                <section className="container px-4 mx-auto">
                    <div className="flex items-center justify-between" >
                        <div className="flex gap-x-3">
                            <h2 className="text-lg font-medium text-[#b22323]  ">Cantidad de días </h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">{hours.length}</span>
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <label htmlFor="perPage" className="mr-2">Items por página:</label>
                            <select
                                id="perPage"
                                value={perPage}
                                onChange={(e) => changePerPage(Number(e.target.value))}
                                className="p-2 border rounded"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>

                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className="bg-gray-50 ">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-12 text-sm font-normal text-center rtl:text-right text-gray-500">
                                                    <div className="flex items-center gap-x-2">
                                                        <span>Fecha</span>
                                                    </div>
                                                </th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Horas</span>
                                                    </button>
                                                </th>


                                                <th scope="col" className="relative py-3.5 px-4">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {currentData.map((item: any) => (

                                                <tr key={item.id}>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center gap-x-3">
                                                            <h2 className="font-medium text-gray-800 ">{nameDays[new Date(item.date).getDay()] + ' ' + item.date.split('-')[2]}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-orange-300">

                                                            <h2 className="text-sm font-normal text-gray-700">{item.hours}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                        <div className="flex items-center gap-x-6">
                                                            <button
                                                                onClick={() => {
                                                                    setRowId(item.id);
                                                                    openModalDelete();
                                                                }}
                                                                className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                                                                <RiDeleteBinLine className="w-5 h-5" />
                                                            </button>
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
                            {Array.from({ length: Math.ceil(hours.length / perPage) }).map((_, i) => (
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
                            disabled={endIndex >= hours.length}
                            onClick={() => changePage(page + 1)}
                            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ">
                            <span>
                                Siguiente
                            </span>

                            <FaLongArrowAltRight />

                        </button>
                    </div>
                </section>
            ) : (
                <div className="flex items-center justify-center h-72">
                    <h2 className="text-lg text-gray-500">No hay datos para mostrar</h2>
                </div>
            )}
        </>
    )
}