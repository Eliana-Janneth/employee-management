import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }: any) => {
  return (
    <div className='w-full' >
      <Navbar/>
      <main className='h-screen w-full justify-center'>
      {children}

      </main>
      <Footer />
    </div>
  );
};

export default Layout;