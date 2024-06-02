import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GrAddCircle } from "react-icons/gr";
import { Button } from "../Button";
import Alert from '../Alert';
import Spinner from '../Spinner';
import { GET_EMPLOYEE } from '@/hooks/react-query/query/employee';
import { UPDATE_ROLE_USER } from '@/hooks/react-query/mutation/user';
import { DropdownField } from '../DropdownField';

interface UpdateUserProps {
    idUser: any
}

export const UpdateUser = ({ idUser }: UpdateUserProps) => {
    const { data, loading, error } = useQuery(GET_EMPLOYEE, {
        variables: { id: idUser }
    });
    const [updateUser] = useMutation(UPDATE_ROLE_USER);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    if (loading) return <div>Cargando... <Spinner /></div>;
    if (error) return <div>Error al cargar los datos del usuario.</div>;

    const initialValues: userUpdate = {
        id: idUser,
        baseSalary: rol
       
    };

    const roles = [
        { value: 'ADMIN', label: 'ADMIN' },
        { value: 'USER', label: 'USER' },
    ];

    const validationSchema = Yup.object().shape({
        id: Yup.string().required("La cédula es obligatoria"),
        baseSalary: Yup.number().required("El salario es obligatorio"),
        phone: Yup.string().required("El teléfono es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        email: Yup.string().email("Formato de correo electrónico inválido").required("El correo es obligatorio"),
    });

    const handleSubmit = async (values: UserUpdate) => {
        try {
            await updateUser({
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
                        <DropdownField label="Rol" options={roles} name='rol'/>
                     
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                            Actualizar Usuario
                            <GrAddCircle className="h-6 w-6" />
                        </Button>
                    </div>
                </Form>
            </Formik>

            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='¡Usuario actualizado exitosamente!' />}
        </section>
    );
};
