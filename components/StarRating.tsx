import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

/*
    Props para el componente de rating.
    rating: Calificación.
    setRating: Función para establecer la calificación.
*/
interface StarRatingProps {
    rating: number;
    setRating: (rating: number) => void;
}

/*
    Componente de rating que se usa para calificar una evaluación de desempeño.
*/
export const StarRating = ({ rating, setRating }: StarRatingProps) => {
    const [hover, setHover] = useState<number>(0);

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={`text-2xl ${starValue <= (hover || rating) ? 'text-[#e74c4c]' : 'text-gray-300'}`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <FaStar />
                    </button>
                );
            })}
        </div>
    );
};

