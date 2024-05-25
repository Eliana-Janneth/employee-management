import React, { useState, ReactNode } from 'react';

interface TooltipButtonProps {
    tooltipText: string;
    onClick: () => void;
    icon: ReactNode;
}

export const TooltipButton = ({ tooltipText, onClick, icon }: TooltipButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                className="text-gray-500 transition-colors duration-200 hover:text-blue-500 focus:outline-none">
                {icon}
            </button>
            {isHovered && (
                <p className="absolute w-48 px-5 py-3 text-center text-gray-600 truncate -translate-x-1/2 bg-white rounded-lg shadow-lg -top-14 left-1/2 dark:shadow-none shadow-gray-200">
                    {tooltipText}
                </p>
            )}
        </div>
    );
};
