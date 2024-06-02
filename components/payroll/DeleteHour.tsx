import { useMutation } from "@apollo/client";
import Alert from "../Alert";
import { Button } from "../Button";
import { useState } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { DELETE_HOURS_WORKED } from "@/hooks/react-query/mutation/hours-worked";
import { MdOutlineCancel } from "react-icons/md";

interface DeleteHourProps {
    idHour: string | null;
    closeModal?: () => void;
    setOpenModalDelete?: any;
    refetchHours: () => void;
}

export const DeleteHour = ({ idHour, setOpenModalDelete, refetchHours }: DeleteHourProps) => {
    const [deleteHour] = useMutation(DELETE_HOURS_WORKED);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteHour({
                variables: { id: idHour }
            })
            setShowSuccessMessage(true);
            refetchHours();

        } catch (error) {
            console.error("Error al eliminar empleado:", error);
        }
    };

    const closeModal = () => {
        setShowSuccessMessage(false);
        setOpenModalDelete(false);
    }
    return (

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-md shadow-md">
                <p>¿ Esta seguro(a) que desea eliminar esta hora?</p>
                <div className="flex gap-2">

                    <button
                        className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80"
                        onClick={closeModal}
                    >
                        <MdOutlineCancel className="w-5 h-5" />
                        Cancelar
                    </button>
                    <Button
                        onClick={handleDelete}
                    >
                        <TiUserDeleteOutline className="w-5 h-5" />
                        Eliminar
                    </Button>
                </div>
                {showSuccessMessage && <Alert message="Registro de hora eliminada con éxito" type='success' onClose={closeModal} />}
            </div>
        </div>
    );
}