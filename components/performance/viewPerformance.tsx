import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { SetStateAction, useState } from "react";
import { MenuButton } from "../MenuButton";
import { ChartPayroll } from "../payroll/ChartPayroll";
import { FormPerformance } from "./FormPerformance";
import { GET_PERFORMANCE_EVALUATIONS_BY_EMPLOYEE } from "@/hooks/react-query/query/performance-evaluation";
import { useQuery } from "@apollo/client";
import { TablePerformance } from "./TablePerformance";

interface ViewPerformanceProps {
    idEmployee?: string | null;
    setIsModalHourOpen?: any;
    user: string | null;
}

export const ViewPerformance = ({ idEmployee, setIsModalHourOpen, user }: ViewPerformanceProps) => {
    const [selectedOption, setSelectedOption] = useState('addEvaluation');
    const [idHour, setIdHour] = useState(null);
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

            {idEmployee  && (
                <div className="mt-4">
                    {selectedOption === 'evaluations' && (
                        <TablePerformance idEmployee={idEmployee} evaluations={evaluations.performanceEvaluationsByEmployee} />

                    )}
                    {selectedOption === 'addEvaluation' && (
                        <FormPerformance idEmployee={idEmployee} user={user} refetchEvaluations={refetchEvaluations} />

                    )}
                </div>
            )}
        </>
    );
};
