import React, { useState } from 'react';
import Alert from '../Alert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useMutation } from "@apollo/client";
import { Button } from "../Button";
import { InputField } from "../Input";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { HourReportBody } from '@/interface/payroll';
import { formatDate } from '@/utils/formatDate';
import { CREATE_HOURS_WORKED } from '@/hooks/react-query/mutation/hours-worked';
import { parse, differenceInMinutes, addMinutes } from 'date-fns';

interface FormPayrollProps {
    idEmployee: string | null;
    user: string | null;
    refetchHours: () => void;
    refetchhoursWorked: () => void;
}

export const FormPayroll = ({ idEmployee, user, refetchHours, refetchhoursWorked }: FormPayrollProps) => {
    const [createHoursWorked] = useMutation(CREATE_HOURS_WORKED);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useState({
        initialHour: '',
        finalHour: '',
        date: formatDate(new Date()),
        userId: user,
        employeeId: idEmployee
    });

    const validationSchema = Yup.object().shape({
        initialHour: Yup.string().required("Ingrese la hora inicial"),
        finalHour: Yup.string().required("Ingrese la hora final"),
        date: Yup.date().required("Ingrese la fecha"),
    });

    const calculateHoursWorked = (initialHour: string, finalHour: string) => {
        const start = parse(initialHour, 'HH:mm', new Date());
        let end = parse(finalHour, 'HH:mm', new Date());
        if (end < start) {
            end = addMinutes(end, 24 * 60);
        }
        const diffMinutes = differenceInMinutes(end, start);
        const diffHours = diffMinutes / 60;
        return Math.ceil(diffHours);
    };

    const handleSubmit = async (values: HourReportBody, { resetForm }: { resetForm: () => void }) => {
        const hoursWorked = calculateHoursWorked(values.initialHour, values.finalHour);
        const { initialHour, finalHour, ...rest } = values;
        try {
            await createHoursWorked({
                variables: { input: { ...rest, hours: hoursWorked } }
            })
            setShowSuccessMessage(true);
            resetForm();
            refetchHours()
            refetchhoursWorked()
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
