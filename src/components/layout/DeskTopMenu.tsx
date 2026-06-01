'use client';

import Link from 'next/link';

interface Menu {
  name: string;
  href: string;
}

interface DesktopMenu {
  menu: Menu[];
}

const DeskTopMenu = ({ menu }: DesktopMenu) => {
  return (
    <div className="hidden md:flex gap-5">
      {menu.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="group text-text font-light text-[15px] hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default DeskTopMenu;
