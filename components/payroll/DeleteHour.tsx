import { useMutation } from "@apollo/client";
import Alert from "../Alert";
import { Button } from "../Button";
import { useState } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { DELETE_HOURS_WORKED } from "@/hooks/react-query/mutation/hours-worked";

interface DeleteHourProps {
    idHour: string | null;
    closeModal?: () => void;
    setOpenModalDelete?: any;
}

export const DeleteHour = ({ idHour, setOpenModalDelete}: DeleteHourProps) => {
    const [deleteHour] = useMutation(DELETE_HOURS_WORKED);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    console.log(idHour)
    const handleDelete = async () => {
        try {
            await deleteHour({
                variables: { id: idHour }
            })
            setShowSuccessMessage(true);

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
            <div className="bg-white p-6 rounded-md shadow-md">
                <div className="flex flex-col justify-center items-center gap-2">
                    <p>¿ Esta seguro(a) que desea eliminar esta hora?</p>

                    <Button
                        onClick={handleDelete}
                    >
                        <TiUserDeleteOutline className="w-5 h-5" />
                        Eliminar
                    </Button>
                    <Button
                        onClick={closeModal}
                    >
                        <TiUserDeleteOutline className="w-5 h-5" />
                        Cancelar
                    </Button>
                    {showSuccessMessage && <Alert message="Empleado eliminado con éxito" type='success' onClose={closeModal} />}
                </div>
            </div>
        </div>
    );
}