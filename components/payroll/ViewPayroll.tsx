import { TbCalendarTime } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa6";
import { FormPayroll } from "./FormPayroll";
import { SetStateAction, useState } from "react";
import { Modal } from "../Modal";
import { ChartPayroll } from "./ChartPayroll";
import { TablePayroll } from "./TablePayroll";
import { TfiMoney } from "react-icons/tfi";


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

                <button
                    className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-b border-gray-300 sm:px-4 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${selectedOption === 'workHour' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleOptionClick('workHour')}>
                    <GrUserWorker size={30} />
                    <span className="mx-1 text-sm sm:text-base">
                        Horas Trabajadas
                    </span>
                </button>
                <button
                    className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 border border-b-0 border-gray-300 sm:px-4 rounded-t-md whitespace-nowrap focus:outline-none ${selectedOption === 'reportHours' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleOptionClick('reportHours')}>
                    <TbCalendarTime size={30} />
                    <span className="mx-1 text-sm sm:text-base">
                        Reportar Horas
                    </span>
                </button>
                <button
                    className={`inline-flex items-center h-12 px-2 py-2 text-center text-gray-700 bg-transparent border-b border-gray-300 sm:px-4 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 ${selectedOption === 'summary' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleOptionClick('summary')}>
                    <FaChartPie size={30} />
                    <span className="mx-1 text-sm sm:text-base">
                        Resumen
                    </span>
                </button>
            </div>
            {
                idEmployee &&
                <div className="mt-4">
                    {selectedOption === 'workHour' && (
                        <div>
                            <TablePayroll idHour={idHour} setIsModalDeleteOpen={setIsModalHourOpen} setRowId={setIdHour} />
                        </div>
                    )}
                    {selectedOption === 'reportHours' && (
                        <div>
                            <FormPayroll idEmployee={idEmployee} />
                        </div>
                    )}
                    {selectedOption === 'summary' && (
                        <div>
                            <ChartPayroll idEmployee={idEmployee} />
                        </div>
                    )}
                </div>
            }
            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border border-green-400 mt-6 rounded-xl">
                <div className="flex items-center">

                    <TfiMoney size={50} className="text-green-500" />
                    <div className="flex flex-col items-center mx-5 space-y-1">
                        <h2 className="text-lg font-medium text-gray-700 sm:text-2xl ">Horas trabajadas</h2>
                        <div className="px-2 text-xs text-green-500 bg-gray-100 rounded-full sm:px-4 sm:py-1 ">
                            100 Horas
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold text-green-600 sm:text-4xl">$99 <span className="text-base font-medium">/Month</span></h2>
            </div>

        </>
    );
};
