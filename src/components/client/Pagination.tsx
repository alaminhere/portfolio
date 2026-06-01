'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

const Pagination = ({ page }: { page: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const pages = Array.from({ length: page }, (_, index) => index + 1);

  const handlePagination = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 px-5 py-8">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePagination(currentPage - 1)}
        className={clsx(
          'w-9 h-9 rounded-md flex items-center justify-center text-sm text-text',
          currentPage === 1
            ? 'cursor-not-allowed bg-primary/10'
            : 'bg-primary/10 cursor-pointer',
        )}
      >
        {'<'}
      </button>

      {pages.map(item => (
        <button
          key={item}
          onClick={() => handlePagination(item)}
          className={clsx(
            'w-9 h-9 rounded-md flex items-center justify-center text-sm cursor-pointer',
            currentPage === item
              ? 'bg-primary/30 text-text'
              : 'bg-primary/10 border border-border text-text',
          )}
        >
          {item}
        </button>
      ))}

      <button
        disabled={currentPage === page}
        onClick={() => handlePagination(currentPage + 1)}
        className={clsx(
          'w-9 h-9 rounded-md flex items-center justify-center text-sm text-text',
          currentPage === page
            ? 'cursor-not-allowed bg-primary/10'
            : 'bg-primary/10 cursor-pointer',
        )}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
