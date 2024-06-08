import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GrAddCircle } from "react-icons/gr";
import { EmployeeUpdate } from '@/interface/employee';
import { UPDATE_EMPLOYEE } from '@/hooks/react-query/mutation/employee';
import { InputField } from "@/components/Input";
import { Button } from "@/components/Button";
import { Alert } from '@/components/Alert';
import { Spinner } from '@/components/Spinner';
import { GET_EMPLOYEE } from '@/hooks/react-query/query/employee';

interface UpdateEmployeeProps {
    idEmployee: string;
}

/*
    Componente de actualización de empleado
*/
export const UpdateEmployee = ({ idEmployee }: UpdateEmployeeProps) => {
    const { data, loading, error } = useQuery(GET_EMPLOYEE, {
        variables: { id: idEmployee }
    });
    const [createEmployee] = useMutation(UPDATE_EMPLOYEE);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    if (loading) return <div>Cargando... <Spinner /></div>;
    if (error) return <div>Error al cargar los datos del empleado.</div>;

    const initialValues: EmployeeUpdate = {
        id: idEmployee,
        baseSalary: data.employee.baseSalary || '',
        phone: data.employee.phone || '',
        email: data.employee.email || '',
        address: data.employee.address || ''
    };

    /*
        Validación de los campos del formulario
    */
    const validationSchema = Yup.object().shape({
        id: Yup.string().required("La cédula es obligatoria"),
        baseSalary: Yup.number().required("El salario es obligatorio"),
        phone: Yup.string().required("El teléfono es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        email: Yup.string().email("Formato de correo electrónico inválido").required("El correo es obligatorio"),
    });

    const handleSubmit = async (values: EmployeeUpdate) => {
        try {
            await createEmployee({
                variables: { input: values }
            });
            setShowSuccessMessage(true);
        } catch (error) {
            return <Alert type='error' onClose={() => setShowSuccessMessage(false)} message='¡Error! Intente Nuevamente' />
        }
    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#e74c4c] capitalize">Actualizar Empleado</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <InputField label="Salario Base" name="baseSalary" type="number" id="baseSalary"/>
                        <InputField label="Teléfono" name="phone" type="text" id="phone"/>
                        <InputField label="Correo" name="email" type="email" id="email"/>
                        <InputField label="Dirección" name="address" type="text" id="address"/>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                            Actualizar Empleado
                            <GrAddCircle className="h-6 w-6" />
                        </Button>
                    </div>
                </Form>
            </Formik>

            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='¡Empleado actualizado exitosamente!' />}
        </section>
    );
};
