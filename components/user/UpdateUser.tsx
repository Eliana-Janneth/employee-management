import React, { useState } from 'react';
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { Formik, Form } from 'formik';
import { Button } from "@/components/Button";
import { UPDATE_ROLE_USER } from '@/hooks/react-query/mutation/user';
import { DropdownField } from '@/components/DropdownField';
import { RxUpdate } from 'react-icons/rx';
import { Alert } from '@/components/Alert';
import { UserBody } from '@/interface/user';

interface UpdateUserProps {
    idUser: string;
}

export const UpdateUser = ({ idUser }: UpdateUserProps) => {
    const [updateUser] = useMutation(UPDATE_ROLE_USER);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const roles = [
        { value: 'USER', label: 'USER' },
        { value: 'ADMIN', label: 'ADMIN' },
    ];

    const initialValues: UserBody = {
        id: idUser,
        role: roles[0].value,
    };

    const validationSchema = Yup.object().shape({
        role: Yup.string().required("El rol es obligatorio"),
    });

    const handleSubmit = async (values: UserBody) => {
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
                        <DropdownField options={roles} name='role' id='role'/>
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
