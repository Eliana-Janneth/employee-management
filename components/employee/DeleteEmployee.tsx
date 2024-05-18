import { useMutation } from "@apollo/client";
import Alert from "../Alert";
import { Button } from "../Button";
import { DELETE_EMPLOYEE } from "@/hooks/react-query/mutation/employee";
import { useState } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";

interface DeleteEmployeeProps {
    idEmployee: string | null;
    closeModal: () => void;
}

export const DeleteEmployee = ({ idEmployee, closeModal }: DeleteEmployeeProps) => {
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteEmployee({
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
            {showSuccessMessage && <Alert message="Empleado eliminado con éxito" onClose={closeModal} />}
        </div>
    );
}