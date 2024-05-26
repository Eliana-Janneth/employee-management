import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa6";
import { TfiMoney } from "react-icons/tfi";
import { SetStateAction, useState } from "react";
import { Modal } from "../Modal";
import { FormPayroll } from "./FormPayroll";
import { ChartPayroll } from "./ChartPayroll";
import { TablePayroll } from "./TablePayroll";
import { MenuButton } from "../MenuButton";

interface ViewPayrollProps {
    idEmployee?: string | null;
    setIsModalHourOpen: any;
}



export const ViewPayroll = ({ idEmployee, setIsModalHourOpen }: ViewPayrollProps) => {
    const [selectedOption, setSelectedOption] = useState('reportHours');
    const [idHour, setIdHour] = useState(null);

    const handleOptionClick = (option: SetStateAction<string>) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="flex overflow-x-auto whitespace-nowrap w-full">
                <MenuButton
                    icon={GrUserWorker}
                    label="Horas Trabajadas"
                    selected={selectedOption === 'workHour'}
                    onClick={() => handleOptionClick('workHour')}
                />
                <MenuButton
                    icon={TbCalendarTime}
                    label="Reportar Horas"
                    selected={selectedOption === 'reportHours'}
                    onClick={() => handleOptionClick('reportHours')}
                />
                <MenuButton
                    icon={FaChartPie}
                    label="Resumen"
                    selected={selectedOption === 'summary'}
                    onClick={() => handleOptionClick('summary')}
                />
            </div>

            {idEmployee && (
                <div className="mt-4">
                    {selectedOption === 'workHour' && (
                        <TablePayroll idHour={idHour} setIsModalDeleteOpen={setIsModalHourOpen} setRowId={setIdHour} />
                    )}
                    {selectedOption === 'reportHours' && (
                        <FormPayroll idEmployee={idEmployee} />
                    )}
                    {selectedOption === 'summary' && (
                        <ChartPayroll idEmployee={idEmployee} />
                    )}
                </div>
            )}

            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border border-green-400 mt-6 rounded-xl">
                <div className="flex items-center">
                    <TfiMoney size={50} className="text-green-500" />
                    <div className="flex flex-col items-center mx-5 space-y-1">
                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl">Horas trabajadas</h2>
                        <div className="px-2 text-xs text-green-500 bg-gray-100 rounded-full sm:px-4 sm:py-1">
                            100 Horas
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-green-600 sm:text-4xl">$99 <span className="text-base font-medium">/Month</span></h2>
            </div>
        </>
    );
};
