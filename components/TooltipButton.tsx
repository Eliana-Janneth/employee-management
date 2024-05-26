import React, { useState, ReactNode } from 'react';

interface TooltipButtonProps {
    tooltipText: string;
    onClick: () => void;
    icon: ReactNode;
    color: string;
}

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
