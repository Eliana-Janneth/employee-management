import React, { useState } from 'react';
import Alert from '../Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Button } from "../Button";
import { InputField } from "../Input";
import { GrAddCircle } from "react-icons/gr";
import { userDataProps } from '@/pages/api/create-user';

export const FormUser = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        connection: "Username-Password-Authentication",
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string().email("Formato de correo electrónico inválido").required("El correo es obligatorio"),
        password: Yup.string().required("La contraseña es obligatoria"),
    });

    const handleSubmit = async (values: userDataProps, { resetForm }: { resetForm: () => void }) => {
        console.log(values);
        try {
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setShowSuccessMessage(true);
            resetForm();
        } catch (error) {
            return <Alert type='error' onClose={() => setShowSuccessMessage(false)} message='¡Error! Intente Nuevamente' />
        };
    }
    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#e74c4c] capitalize">Registrar Usuario</h2>

            <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <InputField label="Nombre Completo" name="name" type="text" />
                        <InputField label="Correo" name="email" type="email" />
                        <InputField label="Contraseña" name="password" type="password" />
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                            Registrar Usuario
                            <GrAddCircle className="h-6 w-6" />
                        </Button>
                    </div>
                </Form>
            </Formik>
            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='¡Usuario creado exitosamente! Para aparecer en el listado de Usuarios, se debe iniciar sesión por primera vez' />}

        </section>
    );
}
