import { useMutation } from "@apollo/client";
import Alert from "../Alert";
import { Button } from "../Button";
import { DELETE_EMPLOYEE } from "@/hooks/react-query/mutation/employee";
import { useState } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { DELETE_HOURS_WORKED } from "@/hooks/react-query/mutation/hours-worked";

interface DeleteHourProps {
    idEmployee: string | null;
    closeModal: () => void;
}

export const DeleteHour = ({ idEmployee, closeModal }: DeleteHourProps) => {
    const [deleteHour] = useMutation(DELETE_HOURS_WORKED);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteHour({
                variables: { id: idEmployee }
            })
            setShowSuccessMessage(true);

        } catch (error) {
            console.error("Error al eliminar empleado:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p>¿ Esta seguro(a) que desea eliminar el empleado <strong>{idEmployee}</strong> ?</p>

            <Button
                onClick={handleDelete}
            >
                <TiUserDeleteOutline className="w-5 h-5" />
                Eliminar
            </Button>
            {showSuccessMessage && <Alert message="Empleado eliminado con éxito" type='success' onClose={closeModal} />}
        </div>
    );
}