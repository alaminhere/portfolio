'use client';

import { ReactNode, useState } from 'react';

import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AdminShell = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar isOpen={isMenuOpen} onToggle={toggleMenu} />

      <div className="flex h-screen min-w-0 flex-1 flex-col">
        <AdminHeader onToggle={toggleMenu} isOpen={isMenuOpen} />

        <main className="min-h-0 flex-1 overflow-y-auto scrollbar-none">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminShell;
