import React, { useState } from 'react';
import Alert from '../Alert';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from "@apollo/client";
import { Button } from "../Button";
import { InputField } from "../Input";
import { FaCheckDouble } from "react-icons/fa6";
import StarRating from '../StarRating';
import { formatDate } from '@/utils/formatDate';
import { PerformanceBody } from '@/interface/performance';
import { CREATE_PERFORMANCE_EVALUATION } from '@/hooks/react-query/mutation/performance-evaluation';

interface FormPerformanceProps {
    idEmployee: string | null;
    user: string | null;
}

export const FormPerformance = ({ idEmployee, user }: FormPerformanceProps) => {
    const [createPerformanceEvaluation] = useMutation(CREATE_PERFORMANCE_EVALUATION);
    const [calification, setRating] = useState<number>(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const initialValues = {
        initialDate: formatDate(new Date()),
        finalDate: formatDate(new Date()),
        description: '',
        improvementOpportunities: '',
        calification: 0,
        employeeId: idEmployee || '',
        userId: user
    };

    const validationSchema = Yup.object().shape({
        initialDate: Yup.string().required("Ingrese la fecha inicial"),
        finalDate: Yup.string().required("Ingrese la fecha final"),
        description: Yup.string().required("Ingrese la descripción"),
        improvementOpportunities: Yup.string().required("Ingrese las oportunidades de mejora"),
        calification: Yup.number().required("Ingrese la calificación"),
    });

    const handleSubmit = async (values: PerformanceBody, { resetForm }: { resetForm: () => void }) => {
        try {
            await createPerformanceEvaluation({
                variables: { input: values }
            });
            setShowSuccessMessage(true);
            resetForm();
        } catch (error) {
            return <Alert type='error' onClose={() => setShowSuccessMessage(false)} message='¡Error! Intente Nuevamente' />
        }
    }

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <InputField label="Fecha Inicial" name="initialDate" type="date" />
                            <InputField label="Fecha Final" name="finalDate" type="date" />
                            <InputField label="Descripción de la Evaluación" name="description" type="textarea" />
                            <InputField label="Oportunidades de Mejora" name="improvementOpportunities" type="textarea" />
                            <div className="mb-4">
                                <label htmlFor="calification" className="block text-sm font-medium text-gray-700">
                                    Calificación:
                                </label>
                                <StarRating rating={calification} setRating={(value) => {
                                    setRating(value);
                                    setFieldValue('calification', value);
                                }} />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <Button type="submit">
                                Agregar Evaluación
                                <FaCheckDouble className="h-6 w-6" />
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {showSuccessMessage && <Alert
                type='success'
                onClose={() => setShowSuccessMessage(false)}
                message='¡Evaluación creada exitosamente!' />}
        </section>
    );
}
