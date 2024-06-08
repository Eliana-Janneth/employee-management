import { useMutation } from "@apollo/client";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { DELETE_EMPLOYEE } from "@/hooks/react-query/mutation/employee";
import { useState } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";

interface DeleteEmployeeProps {
    idEmployee: string | null;
    closeModal: () => void;
}
/*
    Componente de eliminación de empleado
*/
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
            return (
                <>
                    {showSuccessMessage && <Alert message="Ocurrió un error, intente nuevamente!!" type='error' onClose={closeModal} />}
                </>
            )
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