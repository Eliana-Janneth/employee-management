import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa6";
import { TfiMoney } from "react-icons/tfi";
import { SetStateAction, useState } from "react";
import { Modal } from "../Modal";
import { MenuButton } from "../MenuButton";
import { FormPayroll } from "../payroll/FormPayroll";
import { ChartPayroll } from "../payroll/ChartPayroll";
import { FormPerformance } from "./FormPerformance";

interface ViewPayrollProps {
    idEmployee?: string | null;
    setIsModalHourOpen?: any;
}

export const ViewPerformance = ({ idEmployee, setIsModalHourOpen }: ViewPayrollProps) => {
    const [selectedOption, setSelectedOption] = useState('evaluations');
    const [idHour, setIdHour] = useState(null);

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
                        <ChartPayroll idEmployee={idEmployee} />

                    )}
                    {selectedOption === 'addEvaluation' && (
                        <FormPerformance idEmployee={idEmployee} />

                    )}
                </div>
            )}
        </>
    );
};
