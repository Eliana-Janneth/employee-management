import React from 'react';
interface AlertProps {
    onClose: () => void;
    message: string;
}

const Alert = ({ onClose, message }: AlertProps) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg font-semibold text-green-600 mb-4">{message}</p>
                <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
                    onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Alert;
