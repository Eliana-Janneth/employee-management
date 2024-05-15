import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import { FormEmployee } from "@/components/forms/formEmployee";
import { ViewEmployee } from "@/components/forms/viewEmployee";
import { GET_EMPLOYEES } from "@/hooks/react-query/employee/query/employee";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

const Employee = () => {
    const { data, loading, error } = useQuery(GET_EMPLOYEES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [idEmployee, setIdEmployee] = useState(null);
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
                <div>
                    <label className="text-[#b22323] font-medium text-lg" >Buscar Empleado</label>
                    <select id="search" className="block lg:w-96 w-full px-4 py-2 mt-2 text-[#b22323] bg-white border border-[#f8a9a9] rounded-mdbg-gray-800 focus:border-[#e74c4c] focus:ring-[#f8a9a9] focus:ring-opacity-40 focus:outline-none focus:ring" />
                </div>

                <button
                    onClick={openModal}
                    className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-[#e74c4c] rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80">
                    Agregar Empleado
                    <IoPersonAddSharp />
                </button>
            </div>

            <Table data={data} setIsModalOpen={setIsModalViewOpen} setRowId={setIdEmployee} />

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