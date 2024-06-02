import React from 'react';
import { Navbar } from './Navbar';


import { Footer } from './Footer';

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }:  Props ) => {
  return (
    <div className='flex flex-col min-h-screen w-full'>
      <Navbar />
      <main className='flex-1 p-2'>
        {children}
      </main>
      <Footer />
    </div>
  );
};

