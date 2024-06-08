import { useState } from "react";
import { useQuery } from "@apollo/client";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaUsersSlash } from "react-icons/fa6";
import { Dropdown } from "@/components/Dropdown";
import { Spinner } from '@/components/Spinner';
import { Modal } from "@/components/Modal";
import { TableEmployee } from "@/components/employee/TableEmployee";
import { FormEmployee } from "@/components/employee/FormEmployee";
import { ViewEmployee } from "@/components/employee/ViewEmployee";
import { UpdateEmployee } from "@/components/employee/UpdateEmployee";
import { DeleteEmployee } from "@/components/employee/DeleteEmployee";
import { ViewPayroll } from "@/components/payroll/ViewPayroll";
import { GET_EMPLOYEES } from "@/hooks/react-query/query/employee";
import { getSession, signIn, useSession } from 'next-auth/react';
import { ViewPerformance } from "@/components/performance/viewPerformance";
import { GET_USER } from "@/hooks/react-query/query/user";
import { GetServerSidePropsContext } from "next";
import { getUserID } from "@/utils/getUserID";


/*
    Función que obtiene el id del usuario logueado
*/
export const getServerSideProps = async (context: GetServerSidePropsContext ) => {
    const session = await getSession(context);
    const userId = await getUserID(session?.user?.email);
    return {
        props: { userId },
    };
}

/*
    Interfaz de opciones
*/
interface Option {
    id: string;
    name: string;
}

/*
    Componente de empleados
    Contiene la tabla de empleados y el formulario para agregar empleados
    Hace llamados a Querys de GraphQL para obtener los empleados
    Tiene un modal que muestra formularios para agregar, actualizar y eliminar empleados
    Tiene un modal para agregar las horas trabajadas, ver la nómina
    ver las evaluaciones de desempeño de un empleado
*/
const Employee = () => {
    const { data, loading, refetch } = useQuery(GET_EMPLOYEES);
    const { data: session } = useSession();
    const employees = data ? data.employees : [];
    const [idEmployee, setIdEmployee] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [popupComponent, setPopupComponent] = useState<string>('');
    const [popupComponentTable, setPopupComponentTable] = useState<string>('');
    const [openModal, setOpenModal] = useState(false);
    const [openModalTable, setOpenModalTable] = useState(false);

    const { data: userData } = useQuery(GET_USER, {
        variables: { email: session?.user?.email },
    });

    const userId = userData?.user?.id;

    const selectEmployee = (selectedOption: Option | unknown) => {
        setSelectedEmployeeId((selectedOption as Option)?.id);
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
        updateEmployee: <UpdateEmployee idEmployee={String(idEmployee)} />,
        deleteEmployee: <DeleteEmployee idEmployee={idEmployee} closeModal={closeModal} />,
    };

    const POPUP_COMPONENTS_TABLE = {
        viewPayroll: <ViewPayroll idEmployee={idEmployee} user={userId} />,
        viewEmployee: <ViewEmployee idEmployee={idEmployee} setOpenModal={setOpenModal} setPopupComponent={setPopupComponent} closeModalTable={closeModalTable} />,
        viewPerformance: <ViewPerformance idEmployee={idEmployee} user={userId} />
    };

    if (!session) {
        signIn("auth0");
    }
    else {


        return (
            <div className="my-4 sm:mx-10">
                <div className="flex flex-col justify-between sm:flex-row space-y-2 mb-2 items-center">
                    <div className="sm:w-1/2 w-full">
                        <span className="text-[#b22323] font-medium text-lg">Buscar Empleado</span>
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
