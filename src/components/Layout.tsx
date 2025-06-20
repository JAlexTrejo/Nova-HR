import React from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
