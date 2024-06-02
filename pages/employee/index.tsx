import { useState } from "react";
import { useQuery } from "@apollo/client";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa6";
import Dropdown from "@/components/Dropdown";
import Spinner from "@/components/Spinner";
import { Modal } from "@/components/Modal";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { FormEmployee } from "@/components/employee/FormEmployee";
import { ViewEmployee } from "@/components/employee/ViewEmployee";
import { UpdateEmployee } from "@/components/employee/UpdateEmployee";
import { DeleteEmployee } from "@/components/employee/DeleteEmployee";
import { ViewPayroll } from "@/components/payroll/ViewPayroll";
import { DeleteHour } from "@/components/payroll/DeleteHour";
import { GET_EMPLOYEES } from "@/hooks/react-query/query/employee";
import { signIn, useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { getUserID } from "@/utils/getUserID";
import { ViewPerformance } from "@/components/performance/viewPerformance";
import { ViewEvaluation } from "@/components/performance/ViewEvaluation";

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    const userId = await getUserID(session?.user?.email);
    return {
        props: { userId },
    };
}

interface EmployeeProps {
    userId: string | null;
}

const Employee = ({ userId }: EmployeeProps) => {
    const { data, loading, refetch } = useQuery(GET_EMPLOYEES);
    const employees = data ? data.employees : [];
    const [idEmployee, setIdEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [popupComponent, setPopupComponent] = useState<string>('');
    const [popupComponentTable, setPopupComponentTable] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalTable, setOpenModalTable] = useState(false);

    const { data: session, status } = useSession();



    const selectEmployee = (selectedOption: any) => {
        setSelectedEmployeeId(selectedOption.id);
    }

    const formEmployee = () => {
        setPopupComponent('formEmployee');
        setOpenModal(true);
    };

    const closeModal = () => {
        refetch();
        setOpenModal(false);
    };

    const closeModalTable = () => {
        refetch();
        setOpenModalTable(false);
    }

    const POPUP_COMPONENTS = {
        formEmployee: <FormEmployee user={userId} />,
        updateEmployee: <UpdateEmployee idEmployee={idEmployee} />,
        deleteEmployee: <DeleteEmployee idEmployee={idEmployee} closeModal={closeModal} />,
    };

    const POPUP_COMPONENTS_TABLE = {
        viewPayroll: <ViewPayroll idEmployee={idEmployee} user={userId}  />,
        viewEmployee: <ViewEmployee idEmployee={idEmployee} setOpenModal={setOpenModal} setPopupComponent={setPopupComponent} closeModalTable={closeModalTable} />,
        viewPerformance: <ViewPerformance idEmployee={idEmployee} user={userId} />
    };

    if (!session) {
        signIn("auth0");
    } 
    else {
        return (
            <div className="container my-4 sm:mx-10">
                <div className="flex flex-col justify-between sm:flex-row space-y-2 mb-2 items-center">
                    <div className="sm:w-1/2 w-full">
                        <label className="text-[#b22323] font-medium text-lg">Buscar Empleado</label>
                        <Dropdown
                            placeholder="Selecciona o escribe el nombre del empleado"
                            options={employees}
                            loading={loading}
                            action={selectEmployee}
                        />
                    </div>
                    <button
                        onClick={() => formEmployee()}
                        className="px-6 py-2 flex items-center gap-2 h-12 font-medium tracking-wide text-[#fdf3f3] capitalize transition-colors duration-300 transform bg-[#e74c4c] rounded-lg hover:bg-[#d32f2f] focus:outline-none focus:ring focus:ring-[#f8a9a9] focus:ring-opacity-80"
                    >
                        Agregar Empleado
                        <IoPersonAddSharp />
                    </button>
                </div>
                {loading && <Spinner />}
                {data ? (
                    <TableEmployee
                        employees={employees}
                        setPopupComponent={setPopupComponentTable}
                        setOpenModalTable={setOpenModalTable}
                        setRowId={setIdEmployee}
                        idEmployee={selectedEmployeeId} />
                ) : (
                    <div className="flex mt-10 justify-center items-center gap-4 text-gray-600 ">
                        <FaUsersSlash className="h-20 w-20" />
                        <p className="text-2xl">No hay empleados registrados</p>
                    </div>
                )}

                <Modal isOpen={openModal} closeModal={closeModal}>
                    {POPUP_COMPONENTS[popupComponent as keyof typeof POPUP_COMPONENTS]}
                </Modal>
                <Modal isOpen={openModalTable} closeModal={closeModalTable} >
                    {POPUP_COMPONENTS_TABLE[popupComponentTable as keyof typeof POPUP_COMPONENTS_TABLE]}
                </Modal>
              
            </div>
        );
    }
}

export default Employee;
