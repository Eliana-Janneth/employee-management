import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface InputFieldProps {
    label: string;
    id?: string;
    name: string;
    type: string;
    [key: string]: any;
}

export const InputField = ({ label, id, name, type, ...rest }: InputFieldProps) => {
    return (
        <div className="flex flex-col">
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        {type === 'textarea' ? (
            <Field
                as="textarea"
                id={id}
                name={name}
                {...rest}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-[#f27777] focus:ring-[#f8a9a9] focus:ring-opacity-40 focus:outline-none focus:ring`}
            />
        ) : (
            <Field
                id={id}
                name={name}
                type={type}
                {...rest}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-[#f27777] focus:ring-[#f8a9a9] focus:ring-opacity-40 focus:outline-none focus:ring`}
            />
        )}
        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
    );
};
