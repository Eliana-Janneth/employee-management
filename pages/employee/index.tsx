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

export const getServerSideProps = async (context: any) => {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        };
    }
    const userId = await getUserID(session.user?.email);

    return {
        props: { userId },
    };
}

interface EmployeeProps {
    userId: string | null;
}

const Employee = ( {userId}: EmployeeProps) => {
    const { data, loading, refetch } = useQuery(GET_EMPLOYEES);
    const employees = data ? data.employees : [];
    const [isModalFormOpen, setIsModalFormOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalPayrollOpen, setIsModalPayrollOpen] = useState(false);
    const [isModalPerformanceOpen, setIsModalPerformanceOpen] = useState(false);
    const [idEmployee, setIdEmployee] = useState(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isModalHourOpen, setIsModalHourOpen] = useState(false);

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Spinner />;
    }

    const selectEmployee = (selectedOption: any) => {
        setSelectedEmployeeId(selectedOption.id);
    }

    const openModal = () => {
        setIsModalFormOpen(true);
    };

    const closeModal = () => {
        setIsModalFormOpen(false);
        setIsModalUpdateOpen(false);
        setIsModalDeleteOpen(false);
        setIsModalHourOpen(false);
        refetch();
    };
    const closeModalTable = () => {
        setIsModalViewOpen(false);
        setIsModalPayrollOpen(false);
        setIsModalPerformanceOpen(false);
        refetch();
    }

    if (!session) {
        signIn("auth0");
    } else {
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
                        onClick={() => openModal()}
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
                        setIsModaViewOpen={setIsModalViewOpen}
                        setIsModalPayrollOpen={setIsModalPayrollOpen}
                        setIsModalPerformanceOpen={setIsModalPerformanceOpen}
                        setRowId={setIdEmployee}
                        idEmployee={selectedEmployeeId} />
                ) : (
                    <div className="flex mt-10 justify-center items-center gap-4 text-gray-600 ">
                        <FaUsersSlash className="h-20 w-20" />
                        <p className="text-2xl">No hay empleados registrados</p>
                    </div>
                )}

                <Modal isOpen={isModalFormOpen} closeModal={closeModal}>
                    <FormEmployee user={userId}/>
                </Modal>
                <Modal isOpen={isModalViewOpen} closeModal={closeModal} closeModalTable={closeModalTable}>
                    <ViewEmployee
                        idEmployee={idEmployee}
                        setIsModaEditOpen={setIsModalUpdateOpen}
                        setIsModalDeleteOpen={setIsModalDeleteOpen} />
                </Modal>
                <Modal isOpen={isModalUpdateOpen} closeModal={closeModal}>
                    <UpdateEmployee idEmployee={idEmployee} />
                </Modal>
                <Modal isOpen={isModalDeleteOpen} closeModal={closeModal}>
                    <DeleteEmployee idEmployee={idEmployee} closeModal={closeModal} />
                </Modal>
                <Modal isOpen={isModalPayrollOpen} closeModal={closeModal} closeModalTable={closeModalTable} >
                    <ViewPayroll idEmployee={idEmployee} user={userId} setIsModalHourOpen={setIsModalHourOpen} />
                </Modal>
                <Modal isOpen={isModalDeleteOpen} closeModal={closeModal}>
                    <DeleteHour idEmployee={idEmployee} closeModal={closeModal} />
                </Modal>
                <Modal isOpen={isModalPerformanceOpen} closeModal={closeModal} closeModalTable={closeModalTable}>
                    <ViewPerformance idEmployee={idEmployee} user={userId}/>
                </Modal>

            </div>
        )
    }

}

export default Employee;