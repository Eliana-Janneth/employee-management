import { useState } from "react";
import { useQuery } from "@apollo/client";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa6";
import Dropdown from "@/components/Dropdown";
import Spinner from "@/components/Spinner";
import { Modal } from "@/components/Modal";
import { UpdateEmployee } from "@/components/employee/UpdateEmployee";
import { DeleteEmployee } from "@/components/employee/DeleteEmployee";
import { DeleteHour } from "@/components/payroll/DeleteHour";
import { signIn, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { getUserID } from "@/utils/getUserID";
import { TableUser } from "@/components/user/TableUser";
import { GET_USERS } from "@/hooks/react-query/query/user";
import { FormUser } from "@/components/user/FormUser";

const User = () => {
    const { data, loading, refetch } = useQuery(GET_USERS);
    const users = data ? data.users : [];
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [idUser, setIdUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Spinner />;
    }

    const selectUser = (selectedOption: any) => {
        setSelectedUserId(selectedOption.id);
    }

    const openModal = () => {
        setIsModalFormOpen(true);
    };

    const closeModal = () => {
        setIsModalFormOpen(false);
        setIsModalUpdateOpen(false);
        setIsModalDeleteOpen(false);
        refetch();
    };
    const closeModalTable = () => {
        setIsModalViewOpen(false);
        refetch();
    }

    if (!session) {
        signIn("auth0");
    }
    const { user } = session;
    if (user?.role !== "ADMIN") {
        setTimeout(() => {
            window.location.href = "/404";
        }, 1000);
    } else {
        return (
            <div className="container my-4 sm:mx-10">
                <div className="flex flex-col justify-between sm:flex-row space-y-2 mb-2 items-center">
                    <div className="sm:w-1/2 w-full">
                        <label className="text-[#b22323] font-medium text-lg">Buscar Usuario</label>
                        <Dropdown
                            placeholder="Selecciona o escribe el nombre del usuario"
                            options={users}
                            loading={loading}
                            action={selectUser}
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-[#e74c4c] rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80"
                    >
                        Agregar Usuario
                        <IoPersonAddSharp />
                    </button>
                </div>
                {loading && <Spinner />}
                {data ? (
                    <TableUser
                        users={users}
                        setIsModaViewOpen={setIsModalViewOpen}
                        setRowId={setIdUser}
                        idEmployee={selectedUserId} />
                ) : (
                    <div className="flex mt-10 justify-center items-center gap-4 text-gray-600 ">
                        <FaUsersSlash className="h-20 w-20" />
                        <p className="text-2xl">No hay usuarios registrados</p>
                    </div>
                )}
                <Modal isOpen={isModalFormOpen} closeModal={closeModal}>
                    <FormUser />
                </Modal>
                <Modal isOpen={isModalUpdateOpen} closeModal={closeModal}>
                    <UpdateEmployee idEmployee={idUser} />
                </Modal>
                <Modal isOpen={isModalDeleteOpen} closeModal={closeModal}>
                    <DeleteEmployee idEmployee={idUser} closeModal={closeModal} />
                </Modal>
                <Modal isOpen={isModalDeleteOpen} closeModal={closeModal}>
                    <DeleteHour idEmployee={idUser} closeModal={closeModal} />
                </Modal>
            </div>
        )
    }

}

export default User;