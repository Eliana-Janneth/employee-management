import React, { useState } from 'react';
import { Alert } from '@/components/Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useMutation } from "@apollo/client";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { GrAddCircle } from "react-icons/gr";
import { EmployeeBody } from '@/interface/employee';
import { CREATE_EMPLOYEE } from '@/hooks/react-query/mutation/employee';

interface FormEmployeeProps {
    user: string | null;
}

/*
    Componente de formulario para agregar un empleado
*/
export const FormEmployee = ({ user }: FormEmployeeProps) => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values] = useState({
        id: "",
        name: "",
        baseSalary: 0,
        phone: "",
        email: "",
        address: "",
        userId: user
    });

    /*
        Validación de los campos del formulario
    */
    const validationSchema = Yup.object().shape({
        id: Yup.string().required("La cédula es obligatoria"),
        name: Yup.string().required("El nombre es obligatorio"),
        baseSalary: Yup.number().required("El salario es obligatorio"),
        phone: Yup.string().required("El teléfono es obligatorio"),
        address: Yup.string().required("La dirección es obligatoria"),
        email: Yup.string().email("Formato de correo electrónico inválido").required("El correo es obligatorio"),
    });

    const handleSubmit = async (values: EmployeeBody, { resetForm }: { resetForm: () => void }) => {
        try {
            await createEmployee({
                variables: { input: values }
            })

            setShowSuccessMessage(true);
            resetForm();

        } catch (error) {
            return <Alert type='error' onClose={() => setShowSuccessMessage(false)} message='¡Error! Intente Nuevamente' />
        }
    }
    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <h2 className="text-xl font-semibold text-[#e74c4c] capitalize">Registrar Empleado</h2>

            <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <InputField label="Cédula" name="id" type="text" id="id"/>
                        <InputField label="Nombre Completo" name="name" type="text" id="name"/>
                        <InputField label="Salario Base" name="baseSalary" type="number" id="baseSalary"/>
                        <InputField label="Teléfono" name="phone" type="text" id="phone"/>
                        <InputField label="Correo" name="email" type="email" id="email"/>
                        <InputField label="Dirección" name="address" type="text" id="address"/>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="submit">
                            Registrar Empleado
                            <GrAddCircle className="h-6 w-6" />
                        </Button>
                    </div>
                </Form>
            </Formik>
            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='¡Empleado creado exitosamente!' />}

        </section>
    );
}
