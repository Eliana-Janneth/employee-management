import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface DropdownFieldProps {
    id: string;
    name: string;
    options: { value: string; label: string }[];
    className?: string;
    // Any other props that you want to explicitly allow can be added here
}

export const DropdownField = ({ id, name, options, className, ...rest }: DropdownFieldProps) => {
    return (
        <div className="flex flex-col">
            <Field
                as="select"
                id={id}
                name={name}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-[#f27777] focus:ring-[#f8a9a9] focus:ring-opacity-40 focus:outline-none focus:ring ${className}`}
                {...rest}
            >
                <option value="" label="Select an option" />
                {options.map((option) => (
                    <option key={option.value} value={option.value} label={option.label}>
                        {option.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
        </div>
    );
};
