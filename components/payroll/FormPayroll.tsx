import React, { useState } from 'react';
import Alert from '../Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useMutation } from "@apollo/client";
import { Button } from "../Button";
import { InputField } from "../Input";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { CREATE_EMPLOYEE } from '@/hooks/react-query/mutation/employee';
import { HourReportBody } from '@/interface/Payroll';
import { formatDate } from '@/utils/formatDate';

interface FormPayrollProps {
    idEmployee: string | null;
}

export const FormPayroll = ({ idEmployee }: FormPayrollProps) => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useState({
        initialHour: '',
        finalHour: '',
        date: formatDate(new Date())
    });

    const validationSchema = Yup.object().shape({
        initialHour: Yup.string().required("Ingrese la hora inicial"),
        finalHour: Yup.string().required("Ingrese la hora final"),
        date: Yup.date().required("Ingrese la fecha"),

    });

    const handleSubmit = async (values: HourReportBody) => {
        try {
            await createEmployee({
                variables: { input: values }
            })
            setShowSuccessMessage(true);
            setValues({
                initialHour: '',
                finalHour: '',
                date: formatDate(new Date()),
            });
        } catch (error) {
            return <Alert type='error' onClose={() => setShowSuccessMessage(false)} message='¡Error! Intente Nuevamente' />
        };
    }
    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">

            <Formik
                initialValues={values}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <InputField label="Hora Inicio" name="initialHour" type="time" />
                        <InputField label="Horal Final" name="finalHour" type="time" />
                        <InputField label="Fecha" name="date" type="date" />
                        <div className="flex justify-end mt-6">
                            <Button type="submit">
                                Agregar Horas
                                <MdOutlineFileDownloadDone className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>


                </Form>
            </Formik>
            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='Horas agregadas exitosamente!' />}

        </section>
    );
}
