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

const Employee = () => {
    const { data, loading, refetch } = useQuery(GET_EMPLOYEES);
    const employees = data ? data.employees : [];

    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [idEmployee, setIdEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    const selectEmployee = (selectedOption: any) => {
        setSelectedEmployeeId(selectedOption.id);
    }

    const openModal = () => {
        setIsModalFormOpen(true);
    };

    const closeModal = () => {
        setIsModalFormOpen(false);
        setIsModalViewOpen(false);
        setIsModalUpdateOpen(false);
        setIsModalDeleteOpen(false);
        refetch();
    };

    return (
        <div className="mx-10 my-4 container">
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
            <TableEmployee
                employees={employees}
                setIsModaViewOpen={setIsModalViewOpen}
                setIsModaEditOpen={setIsModalUpdateOpen}
                setIsModalDeleteOpen={setIsModalDeleteOpen}
                setRowId={setIdEmployee}
                idEmployee={selectedEmployeeId} />

            <Modal isOpen={isModalFormOpen} closeModal={closeModal}>
                <FormEmployee />
            </Modal>
            <Modal isOpen={isModalViewOpen} closeModal={closeModal}>
                <ViewEmployee idEmployee={idEmployee} />
            </Modal>
            <Modal isOpen={isModalUpdateOpen} closeModal={closeModal}>
                <UpdateEmployee idEmployee={idEmployee} />
            </Modal>
            <Modal isOpen={isModalDeleteOpen} closeModal={closeModal}>
                <DeleteEmployee idEmployee={idEmployee} closeModal={closeModal} />
            </Modal>
        </div>
    )
}


export default Employee;