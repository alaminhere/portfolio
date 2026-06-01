import { ReactNode } from 'react';

const Lable = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <label className={`text-sm text-primary uppercase ${className}`}>
      {children}
    </label>
  );
};

export default Lable;
