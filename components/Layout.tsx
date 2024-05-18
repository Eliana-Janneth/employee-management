import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Layout = ({ children }: any) => {
  return (
    <div className='w-full' >
      <Navbar/>
      <main className='h-full w-full justify-center container'>
      {children}

      </main>
      <Footer />
    </div>
  );
};

export default Layout;