'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MenuIcon, X } from 'lucide-react';

interface MenuItem {
  name: string;
  href: string;
}

interface Props {
  menu: MenuItem[];
}

const MobileMenu = ({ menu }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        className="p-1.5 border border-border rounded-md cursor-pointer"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={27} /> : <MenuIcon size={27} />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full flex flex-col gap-1 rounded-b-2xl bg-surface z-50 overflow-hidden shadow-sm">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-text text-base border-b border-dashed border-border px-5 py-3"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
