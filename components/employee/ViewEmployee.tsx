import { useQuery } from "@apollo/client";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { Spinner } from "@/components/Spinner";
import { GET_EMPLOYEE } from "@/hooks/react-query/query/employee";

interface ViewEmployeeProps {
    idEmployee: string;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setPopupComponent: React.Dispatch<React.SetStateAction<string>>;
    closeModalTable: () => void;
}

/*
    Componente de visualización de empleado
    Muestra la información de un empleado
*/
export const ViewEmployee = ({ idEmployee, setOpenModal, setPopupComponent, closeModalTable }: ViewEmployeeProps) => {
    const { data, loading } = useQuery(GET_EMPLOYEE, {
        variables: { id: idEmployee },
    });

    const openModalEdit = () => {
        setPopupComponent('updateEmployee');
        setOpenModal(true);
        closeModalTable()
    }

    const openModalDelete = () => {
        setPopupComponent('deleteEmployee');
        setOpenModal(true);
        closeModalTable()
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className="space-y-8">
                    <div className="flex items-start justify-between">
                        <div className="flex space-x-2 text-gray-500 transition-colors duration-200">
                            <button
                                onClick={openModalEdit}
                                className="hover:text-yellow-500 focus:outline-none"
                            >
                                <FaRegEdit className="w-8 h-8" />
                            </button>
                            <button
                                onClick={openModalDelete}
                                className="hover:text-red-500 focus:outline-none"
                            >
                                <RiDeleteBinLine className="w-8 h-8" />
                            </button>
                        </div>
                        <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                            Fecha de Ingreso: <strong>{new Date(data?.employee.createdAt).toLocaleDateString()}</strong>
                        </span>
                    </div>
                    <div className="flex flex-col space-y-4 text-gray-700">
                        <div className="flex justify-between items-center space-x-2">
                            <p className="flex flex-col ">
                                <span className=" truncate w-fit font-bold">{data?.employee.name}</span>
                                <span className="truncate w-fit"><strong>C.c</strong> {data?.employee.id}</span>
                            </p>
                            <span className="px-2 bg-green-400 w-fit h-fit rounded-xl font-semibold">
                                $ {data?.employee.baseSalary}
                            </span>
                        </div>
                        <p className="flex items-center space-x-2">
                            <IoLocationOutline className="text-blue-400 w-7 h-7" />
                            <span className="text-gray-900 truncate w-fit">{data?.employee.address}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <FiPhone className="text-blue-400 w-7 h-7" />
                            <span className="truncate w-fit">{data?.employee.phone}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                            <MdOutlineMail className="text-blue-400 w-7 h-7" />
                            <span className="truncate w-fit">{data?.employee.email}</span>
                        </p>
                        <div className="flex flex-col space-y-1">
                            <span className="truncate w-fit">
                                <strong>Registrado Por:</strong> {data?.employee.createdBy.name}
                            </span>
                            <span className="truncate w-fit">{data?.employee.createdBy.email}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
