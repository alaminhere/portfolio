'use client';

import { useSession } from 'next-auth/react';

import DeskTopMenu from './DeskTopMenu';
import MobileMenu from './MobileMenu';

const HeaderActions = () => {
  const { data } = useSession();

  const menu = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  if (data?.user) {
    menu.push({
      name: 'Admin',
      href: '/admin',
    });
  }

  return (
    <div className="flex items-center justify-end gap-5 md:gap-7">
      <DeskTopMenu menu={menu} />

      <MobileMenu menu={menu} />
    </div>
  );
};

export default HeaderActions;
