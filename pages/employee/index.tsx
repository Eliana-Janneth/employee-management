import Dropdown from "@/components/Dropdown";
import { Modal } from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { FormEmployee } from "@/components/employee/FormEmployee";
import { ViewEmployee } from "@/components/employee/ViewEmployee";
import { GET_EMPLOYEES } from "@/hooks/react-query/employee/query/employee";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

const Employee = () => {
    const { data, loading } = useQuery(GET_EMPLOYEES);
    const employees = data ? data.employees : [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [idEmployee, setIdEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const selectEmployee = (selectedOption: any) => {
        setSelectedEmployeeId(selectedOption.id);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalViewOpen(false);
    };

    return (
        <div className="mx-10 my-4">
            <div className='flex justify-between '>
                <div className="w-1/2">
                    <label className="text-[#b22323] font-medium text-lg" >Buscar Empleado</label>
                    <Dropdown placeholder="Selecciona o escribe el nombre del empleado" options={employees} loading={loading} action={selectEmployee} />
                </div>

                <button
                    onClick={openModal}
                    className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-[#e74c4c] rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80">
                    Agregar Empleado
                    <IoPersonAddSharp />
                </button>
            </div>
            {loading && <Spinner />}
            <TableEmployee employees={employees} setIsModalOpen={setIsModalViewOpen} setRowId={setIdEmployee} idEmployee={selectedEmployeeId} />

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <FormEmployee />
            </Modal>
            <Modal isOpen={isModalViewOpen} closeModal={closeModal}>
                <ViewEmployee idEmployee={idEmployee} />
            </Modal>
        </div>
    )
}


export default Employee;