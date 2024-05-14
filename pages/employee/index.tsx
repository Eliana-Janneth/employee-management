import { Modal } from "@/components/Modal";
import { Table } from "@/components/Table";
import { FormEmployee } from "@/components/forms/employee";
import { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { Form } from "react-router-dom";

const Employee = () => {
    const data = [
        {
            name: 'Arthur Melo',
            username: 'authurmelo',
            image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
            salary: '$3000000',
            hours: '20',
            payment: '$4000000',
            date: '20/enero/2023'
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

            <Table data={data} />

            <Modal isOpen={isModalOpen} closeModal={closeModal}>
               <FormEmployee/>
            </Modal>
        </div>
    )
}


export default Employee;