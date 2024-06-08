import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

/*  
    Props para el componente de Layout.
    children: Contenido de la aplicación.
*/
type Props = {
  children: React.ReactNode;
}

/*
    Layout de la aplicación que contiene la barra de navegación y el footer.
*/
export const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Navbar />
      <main className='w-full flex-1 p-2 max-w-full'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

