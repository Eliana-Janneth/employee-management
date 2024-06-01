import { useQuery } from "@apollo/client";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Spinner from "../Spinner";
import { GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE } from "@/hooks/react-query/query/performance-evaluation";

interface ViewEvaluationProps {
    idEvaluation: number | null;
    idEmployee: string | null;

}

export const ViewEvaluation = ({ idEvaluation, idEmployee }: ViewEvaluationProps) => {
    const { data, loading } = useQuery(GET_PERFORMANCE_EVALUATION_BY_EMPLOYEE, {
        variables: { id: idEvaluation, employeeId: idEmployee },
    });

    const currentEvaluation = data?.performanceEvaluationByEmployee;
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {
                        currentEvaluation && currentEvaluation.length && (
                            <div className="space-y-8">
                                <div className="flex items-start justify-between">

                                    <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                                        Fecha de Ingreso: <strong>{new Date(currentEvaluation.initialDate).toLocaleDateString()}</strong>
                                    </span>
                                    <span className="mx-2 text-gray-700 truncate rounded-xl px-2 bg-blue-300 w-min">
                                        Fecha de Ingreso: <strong>{new Date(currentEvaluation.finalDate).toLocaleDateString()}</strong>
                                    </span>
                                </div>
                                <div className="flex flex-col space-y-4 text-gray-700">

                                    <p className="flex items-center space-x-2">
                                        <IoLocationOutline className="text-blue-400 w-7 h-7" />
                                        <span className="text-gray-900 truncate w-fit">{currentEvaluation.improvementOpportunities}</span>
                                    </p>
                                    <p className="flex items-center space-x-2">
                                        <FiPhone className="text-blue-400 w-7 h-7" />
                                        <span className="truncate w-fit">{currentEvaluation.description}</span>
                                    </p>

                                    <div className="flex flex-col space-y-1">
                                        <span className="truncate w-fit">
                                            <strong>Registrado Por:</strong> {currentEvaluation.createdBy.name}
                                        </span>
                                        <span className="truncate w-fit">{currentEvaluation.createdBy.email}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </>

            )}
        </>
    );
};
