'use client';

import Link from 'next/link';
import { MenuIcon, X } from 'lucide-react';

const AdminHeader = ({
  onToggle,
  isOpen,
}: {
  onToggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 md:hidden px-5 py-3 flex justify-between items-center bg-surface z-10">
      <Link href="/">
        <div className="flex items-end justify-center gap-0.5 font-primary text-4xl font-semibold">
          <span className="bg-linear-to-r from-text to-primary bg-clip-text text-transparent">
            alamin
          </span>

          <div className="mb-1.5 h-2 w-2 rounded-full bg-text" />
        </div>
      </Link>

      <button
        className="p-1.5 border border-border rounded-md cursor-pointer"
        onClick={onToggle}
      >
        {isOpen ? <X size={27} /> : <MenuIcon size={27} />}
      </button>
    </div>
  );
};

export default AdminHeader;
