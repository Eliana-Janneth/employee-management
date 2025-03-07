import React from "react";

/*
    Componente de spinner que se muestra mientras se cargan los datos.
*/
export const Spinner = () => {
    return (
        <div className="flex justify-center items-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
        </div>
    );
};
