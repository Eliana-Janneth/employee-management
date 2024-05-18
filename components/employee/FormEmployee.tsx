import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { Button } from "../Button";
import { InputField } from "../Input";
import { GrAddCircle } from "react-icons/gr";
import { EmployeeBody } from '@/interface/employee';
import { CREATE_EMPLOYEE } from '@/hooks/react-query/mutation/employee';

export const FormEmployee = () => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const validationSchema = Yup.object().shape({
        id: Yup.string().required("La cédula es obligatoria"),
        name: Yup.string().required("El nombre es obligatorio"),
        baseSalary: Yup.number().required("El salario es obligatorio"),
        phone: Yup.string().required("El teléfono es obligatorio"),
        email: Yup.string().email("Formato de correo electrónico inválido").required("El correo es obligatorio"),
    });

    const initialValues = {
        id: "",
        name: "",
        baseSalary: 0,
        phone: "",
        email: "",
        address: "",
        userId: "0"
    };

    const handleSubmit = async (values: EmployeeBody) => {
        console.log("values", values)
        try {
            await createEmployee({
                variables: { input: values }
            })
            setShowSuccessMessage(true);

            
        } catch (error) {
            console.error("Error al crear empleado:", error);

        }

    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#e74c4c] capitalize">Registrar Empleado</h2>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <InputField label="Cédula" name="id" type="text" />
                        <InputField label="Nombre Completo" name="name" type="text" />
                        <InputField label="Salario Base" name="baseSalary" type="number" />
                        <InputField label="Teléfono" name="phone" type="text" />
                        <InputField label="Correo" name="email" type="email" />
                        <InputField label="Dirección" name="address" type="text" />

                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                            Registrar Empleado
                            <GrAddCircle className="h-6 w-6" />
                        </Button>
                    </div>
                </Form>
            </Formik>
            {showSuccessMessage && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-md">
                        <p className="text-lg font-semibold text-green-600 mb-4">¡Empleado creado exitosamente!</p>
                        <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600" onClick={() => setShowSuccessMessage(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </section>
    );
};
