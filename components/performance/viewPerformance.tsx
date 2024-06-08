import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { SetStateAction, useState } from "react";
import { MenuButton } from "@/components/MenuButton";
import { FormPerformance } from "./FormPerformance";
import { GET_PERFORMANCE_EVALUATIONS_BY_EMPLOYEE } from "@/hooks/react-query/query/performance-evaluation";
import { useQuery } from "@apollo/client";
import { TablePerformance } from "./TablePerformance";
import { DeleteEvaluation } from "./DeleteEvaluation";
import { ViewEvaluation } from "./ViewEvaluation";

interface ViewPerformanceProps {
    idEmployee?: string | null;
    user: string | null;
}

/*
    Componente de evaluaciones de desempeño
    Muestra un menú con dos opciones: Evaluaciones y Agregar Evaluación
    Muestra una tabla con las evaluaciones de desempeño de un empleado
    Muestra un formulario para agregar una evaluación de desempeño
    Muestra un modal para eliminar una evaluación de desempeño
    Muestra un modal para ver una evaluación de desempeño
*/  
export const ViewPerformance = ({ idEmployee, user }: ViewPerformanceProps) => {
    const [selectedOption, setSelectedOption] = useState('addEvaluation');
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [idEvaluation, setIdEvaluation] = useState('');
    const [openModalView, setOpenModalView] = useState(false);

    const { data: evaluations, refetch: refetchEvaluations } = useQuery(GET_PERFORMANCE_EVALUATIONS_BY_EMPLOYEE, { variables: { employeeId: idEmployee } });
    const handleOptionClick = (option: SetStateAction<string>) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="flex overflow-x-auto whitespace-nowrap w-full">
                <MenuButton
                    icon={GrUserWorker}
                    label="Evaluaciones"
                    selected={selectedOption === 'evaluations'}
                    onClick={() => handleOptionClick('evaluations')}
                />
                <MenuButton
                    icon={TbCalendarTime}
                    label="Agregar Evaluación"
                    selected={selectedOption === 'addEvaluation'}
                    onClick={() => handleOptionClick('addEvaluation')}
                />

            </div>

            {idEmployee && (
                <div className="mt-4">
                    {selectedOption === 'evaluations' && (
                        <TablePerformance evaluations={evaluations?.performanceEvaluationsByEmployee} setIdEvaluation={setIdEvaluation} setOpenModalDelete={setOpenModalDelete} setOpenModalView={setOpenModalView} />

                    )}
                    {selectedOption === 'addEvaluation' && (
                        <FormPerformance idEmployee={idEmployee} user={user} refetchEvaluations={refetchEvaluations} />

                    )}
                </div>
            )}

            {openModalDelete && (
                <DeleteEvaluation idEvaluation={idEvaluation} setOpenModalDelete={setOpenModalDelete} refetchEvaluation={refetchEvaluations} />
            )}

            {openModalView && (
                <ViewEvaluation idEvaluation={idEvaluation} idEmployee={String(idEmployee)} setOpenModalView={setOpenModalView} />
            )}
        </>
    );
};
