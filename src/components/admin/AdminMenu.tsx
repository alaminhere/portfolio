'use client';

import clsx from 'clsx';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AdminMenu1, AdminMenu2 } from '@/libs/content';

import Button from '../ui/button';

const AdminMenu = ({ onToggle }: { onToggle: () => void }) => {
  const pathname = usePathname();

  const menuClass = (href: string) =>
    clsx(
      'py-2 px-3 rounded-xl flex justify-start items-center gap-2 text-sidebar-text',
      pathname === href
        ? 'bg-sidebar-active-bg text-primary!'
        : 'hover:bg-surface-hover hover:text-primary',
    );

  return (
    <>
      <div className="space-y-2 mt-5 border-b border-b-border pb-5">
        {AdminMenu1.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              onClick={onToggle}
              href={item.href}
              className={menuClass(item.href)}
            >
              <Icon size={15} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {AdminMenu2.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                onClick={onToggle}
                href={item.href}
                className={menuClass(item.href)}
              >
                <Icon size={15} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <Button
        type="button"
        onClick={() => signOut()}
        className="w-full border-none px-3! py-2! justify-start"
        variant="secondary"
      >
        <LogOut size={15} className="text-danger" />
        Logout
      </Button>
    </>
  );
};

export default AdminMenu;
