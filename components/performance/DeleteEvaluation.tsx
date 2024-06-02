import { useMutation } from "@apollo/client";
import Alert from "../Alert";
import { Button } from "../Button";
import { useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { DELETE_PERFORMANCE_EVALUATION } from "@/hooks/react-query/mutation/performance-evaluation";

interface DeleteEvaluationProps {
    idEvaluation: string | null;
    closeModal?: () => void;
    setOpenModalDelete?: any;
    refetchEvaluation: () => void;
}

export const DeleteEvaluation = ({ idEvaluation, setOpenModalDelete, refetchEvaluation }: DeleteEvaluationProps) => {
    const [DeleteEvaluation] = useMutation(DELETE_PERFORMANCE_EVALUATION);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDelete = async () => {
        try {
            await DeleteEvaluation({
                variables: { id: idEvaluation }
            })
            setShowSuccessMessage(true);
            refetchEvaluation();

        } catch (error) {
            console.error("Error al eliminar la evaluación:", error);
        }
    };

    const closeModal = () => {
        setShowSuccessMessage(false);
        setOpenModalDelete(false);
    }
    return (

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="flex flex-col justify-center items-center gap-2 bg-white p-6 rounded-md shadow-md">
                <p>¿ Esta seguro(a) que desea eliminar esta evaluación?</p>
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
                        <MdOutlineDeleteForever className="w-5 h-5" />
                        Eliminar
                    </Button>
                </div>
                {showSuccessMessage && <Alert message="Evaluación eliminada con éxito" type='success' onClose={closeModal} />}
            </div>
        </div>
    );
}