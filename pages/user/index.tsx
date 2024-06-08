import { useState } from "react";
import { useQuery } from "@apollo/client";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa6";
import { Modal } from "@/components/Modal";
import { signIn, useSession } from 'next-auth/react';
import { TableUser } from "@/components/user/TableUser";
import { GET_USERS } from "@/hooks/react-query/query/user";
import { FormUser } from "@/components/user/FormUser";
import { UpdateUser } from "@/components/user/UpdateUser";
import { Dropdown } from "@/components/Dropdown";
import { Spinner } from '@/components/Spinner';

/*
    Interfaz de opciones
*/
interface Option {
    id: string;
    name: string;
}

/*
    Componente de usuarios
    Contiene la tabla de usuarios y el formulario para agregar usuarios
    Hace llamados a Querys de GraphQL para obtener los usuarios desde la base de datos de Auth0
    Tiene un modal que muestra formularios para agregar usuarios
*/
const User = () => {
    const { data, loading, refetch } = useQuery(GET_USERS);
    const users = data ? data.users : [];
    const [idUser, setIdUser] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [popupComponent, setPopupComponent] = useState<string>('');

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Spinner />;
    }

    const selectUser = (selectedOption: Option | unknown) => {
        setSelectedUserId((selectedOption as Option)?.id);
    }

    const openModalForm = () => {
        setPopupComponent('formUser')
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false)
        refetch();
    };


    const POPUP_COMPONENTS = {
        formUser: <FormUser />,
        updateUser: <UpdateUser idUser={idUser} />,
    };


    if (!session) {
        signIn("auth0");
    }
    const { user } = session || {};

    if ((user as { role: string })?.role !== "ADMIN") {
        setTimeout(() => {
            window.location.href = "/404";
        }, 1000);
    } else {
        return (
            <div className="my-4 sm:mx-10">
                <div className="flex flex-col justify-between sm:flex-row space-y-2 mb-2 items-center">
                    <div className="sm:w-1/2 w-full">
                        <span className="text-[#b22323] font-medium text-lg">Buscar Usuario</span>
                        <Dropdown
                            placeholder="Selecciona o escribe el nombre del usuario"
                            options={users}
                            loading={loading}
                            action={selectUser}
                        />
                    </div>
                    <button
                        onClick={() => openModalForm()}
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
                        setIsModaViewOpen={setOpenModal}
                        setRowId={setIdUser}
                        idUser={selectedUserId}
                        setPopupComponent={setPopupComponent} />
                ) : (
                    <div className="flex mt-10 justify-center items-center gap-4 text-gray-600 ">
                        <FaUsersSlash className="h-20 w-20" />
                        <p className="text-2xl">No hay usuarios registrados</p>
                    </div>
                )}


                <Modal isOpen={openModal} closeModal={closeModal}>
                    {POPUP_COMPONENTS[popupComponent as keyof typeof POPUP_COMPONENTS]}
                </Modal>


            </div>
        )
    }

}

export default User;