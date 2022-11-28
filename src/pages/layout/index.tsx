import Header from '@components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer';
import './styles.css';

export interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = (): JSX.Element => {
  return (
    <>
      <Header />
      <main className="mainLayout">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
