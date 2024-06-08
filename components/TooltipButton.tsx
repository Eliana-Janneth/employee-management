import React, { useState, ReactNode } from 'react';

/*
    Props para el componente de botón con tooltip.
    tooltipText: Texto que se muestra en el tooltip.
    onClick: Función que se ejecuta al hacer click en el botón.
    icon: Icono del botón.
    color: Color del botón.
*/
interface TooltipButtonProps {
    tooltipText: string;
    onClick: () => void;
    icon: ReactNode;
    color: string;
}

/*
    Componente de botón con tooltip que se usa para mostrar información adicional al hacer hover.
*/
export const TooltipButton = ({ tooltipText, onClick, icon, color }: TooltipButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                className={`text-gray-500 transition-colors duration-200 focus:outline-none ${color}`}>
                {icon}
            </button>
            {isHovered && (
                <p className="absolute w-fit px-5 py-3 text-center text-white truncate -translate-x-1/2 bg-[#e74c4c] rounded-lg shadow-lg -top-14 left-1/2 shadow-gray-200">
                    {tooltipText}
                </p>
            )}
        </div>
    );
};
