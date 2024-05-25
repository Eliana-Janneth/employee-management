import { useQuery } from "@apollo/client";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import Spinner from "../Spinner";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GET_EMPLOYEE } from "@/hooks/react-query/query/employee";
interface ViewEmployeeProps {
    idEmployee: any;
    setIsModaEditOpen: any;
    setIsModalDeleteOpen: any;
}

export const ViewEmployee = ({ idEmployee, setIsModaEditOpen, setIsModalDeleteOpen }: ViewEmployeeProps) => {
    const { data, loading } = useQuery(GET_EMPLOYEE, {
        variables: { id: idEmployee }
    });
    const openModalEdit = () => {
        setIsModaEditOpen(true);
    };
    const openModalDelete = () => {
        setIsModalDeleteOpen(true);
    }


    return (
        <>
            {loading ? <Spinner />
                : (
                    <div className=" space-y-8 mt-2">

                        <div className="flex items-start justify-between -mx-2">

                            <div className="flex text-gray-500 transition-colors duration-200">
                                <button
                                    onClick={() => {
                                        openModalEdit();
                                    }}
                                    className="hover:text-yellow-500 focus:outline-none">
                                    <FaRegEdit className="w-8 h-8" />
                                </button>
                                <button
                                    onClick={() => {
                                        openModalDelete();
                                    }}
                                    className="hover:text-red-500 focus:outline-none">
                                    <RiDeleteBinLine className="w-8 h-8" />
                                </button>
                            </div>
                            <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                                Fecha de Ingreso: <strong>{new Date(data?.employee.createdAt).toLocaleDateString()}</strong>
                            </span>
                        </div>
                        <p className="flex items-start -mx-2">
                            <span className="mx-2 text-gray-700 truncate w-72 ">
                                {data?.employee.name}
                            </span>
                            <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-green-400 w-min font-semibold">
                                $ {data?.employee.baseSalary}
                            </span>
                        </p>
                        <p className="flex items-start -mx-2">
                            <IoLocationOutline className="text-blue-400 w-7 h-7" />
                            <span className="mx-2 text-gray-900 truncate w-72 ">
                                {data?.employee.address}
                            </span>
                        </p>

                        <p className="flex items-start -mx-2">
                            <FiPhone className="text-blue-400 w-7 h-7" />
                            <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.phone}</span>
                        </p>

                        <p className="flex items-start -mx-2">
                            <MdOutlineMail className="text-blue-400 w-7 h-7" />
                            <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.email}</span>

                        </p>
                        <p className="flex flex-col items-start -mx-2">
                            <span className="mx-2 text-gray-700 truncate w-72 "><strong>Registrado Por:</strong> {data?.employee.createdBy.name}</span>
                            <span className="mx-2 text-gray-700 truncate w-72 ">{data?.employee.createdBy.email}</span>
                        </p>

                    </div>
                )}
        </>
    )
}