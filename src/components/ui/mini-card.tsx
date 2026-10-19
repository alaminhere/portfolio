import { ReactNode } from 'react';
import clsx from 'clsx';

const MiniCard = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        'bg-background p-4 border border-border rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MiniCard;