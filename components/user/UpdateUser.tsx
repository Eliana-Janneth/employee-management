import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GrAddCircle } from "react-icons/gr";
import { Button } from "../Button";
import Alert from '../Alert';
import { UPDATE_ROLE_USER } from '@/hooks/react-query/mutation/user';
import { DropdownField } from '../DropdownField';
import { RxUpdate } from 'react-icons/rx';

interface UpdateUserProps {
    idUser: any
}

export const UpdateUser = ({ idUser }: UpdateUserProps) => {

    const [updateUser] = useMutation(UPDATE_ROLE_USER);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const roles = [
        { value: 'USER', label: 'USER' },
        { value: 'ADMIN', label: 'ADMIN' },
    ];

    const initialValues: User = {
        id: idUser,
        role: roles[0].value,
    };


    const validationSchema = Yup.object().shape({
        role: Yup.string().required("El rol es obligatorio"),
    });

    const handleSubmit = async (values: User) => {
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
            <h2 className="text-xl font-semibold text-[#e74c4c] capitalize">Actualizar Usuario</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 ">
                        <DropdownField options={roles} name='role' />
                        <div className="flex justify-end mt-4">
                            <Button type="submit">
                                Actualizar Rol
                                <RxUpdate className="h-6 w-6" />
                            </Button>
                        </div>
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
