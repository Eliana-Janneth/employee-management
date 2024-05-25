import Dropdown from "@/components/Dropdown";
import Spinner from "@/components/Spinner";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_EMPLOYEES } from "@/hooks/react-query/employee/query/employee";
import { Modal } from "@/components/Modal";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { FormEmployee } from "@/components/employee/FormEmployee";
import { ViewEmployee } from "@/components/employee/ViewEmployee";
import { IoPersonAddSharp } from "react-icons/io5";
import { UpdateEmployee } from "@/components/employee/UpdateEmployee";
import { DeleteEmployee } from "@/components/employee/DeleteEmployee";
import { FaUsersSlash } from "react-icons/fa6";
import { TablePayroll } from "@/components/payroll/TablePayroll";
import { ViewPayroll } from "@/components/payroll/ViewPayroll";

const Payroll = () => {
    const { data, loading, refetch } = useQuery(GET_EMPLOYEES);
    const employees = data ? data.employees : [];

    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [idEmployee, setIdEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const selectEmployee = (selectedOption: any) => {
        setSelectedEmployeeId(selectedOption.id);
    }

    const closeModal = () => {
        setIsModalViewOpen(false);
        refetch();
    };

    return (
        <div className="mx-10 my-4 container">
            <div className='flex justify-between '>
                <div className="w-1/2">
                    <label className="text-[#b22323] font-medium text-lg" >Buscar Empleado</label>
                    <Dropdown placeholder="Selecciona o escribe el nombre del empleado" options={employees} loading={loading} action={selectEmployee} />
                </div>
            </div>
            {loading && <Spinner /> }
            { data ? (
                <TablePayroll
                    employees={employees}
                    setIsModaViewOpen={setIsModalViewOpen}
                    setRowId={setIdEmployee}
                    idEmployee={selectedEmployeeId} />
            ) : (
                <div className="flex mt-10 justify-center items-center gap-4 text-gray-600 ">
                    <FaUsersSlash className="h-20 w-20" />
                    <p className="text-2xl">No hay empleados registrados</p>
                </div>
            )}

            <Modal isOpen={isModalViewOpen} closeModal={closeModal}>
                <ViewPayroll idEmployee={idEmployee} />
            </Modal>
        </div>
    )
}

export default Payroll;