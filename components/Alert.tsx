import React from 'react';

/*
    Props para el componente de alerta.
    onClose: Función que se ejecuta al cerrar el alerta.
    message: Mensaje que se muestra en el alerta.
    type: Tipo de alerta (success o error).
    */
interface AlertProps {
    onClose: () => void;
    message: string;
    type: 'success' | 'error';
}

/*
 Componente de alerta que se muestra en la parte central de la pantalla.
*/
export const Alert = ({ onClose, message, type }: AlertProps) => {
    const alertClassName = type === 'success' ? 'text-green-600' : 'text-red-600';

    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className={`text-lg font-semibold ${alertClassName} mb-4`}>{message}</p>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    onClick={onClose}>Cerrar
                </button>
            </div>
        </div>
    );
};