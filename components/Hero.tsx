import { signIn } from 'next-auth/react';
import React from 'react';

export const Hero = () => {
    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                    <img className="object-cover object-center rounded" alt="hero" src="foto1.jpg" />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">¡Bienvenido al Sistema de Gestión de Empleados!
                    </h1>
                    <p className="mb-8 leading-relaxed">Optimiza la gestión de recursos humanos de tu empresa con nuestra completa plataforma. Registra horas trabajadas, gestiona nóminas de manera eficiente, evalúa el desempeño del equipo y mucho más, todo en un solo lugar.</p>
                </div>
            </div>
        </section>
    )
};



