import { ReactNode } from 'react';
import Lable from './lable';

const InputCard = ({
  children,
  className,
  lable,
}: {
  children: ReactNode;
  className?: string;
  lable?: string;
}) => {
  return (
    <div className="w-full">
      <Lable>{lable}</Lable>
      <div
        className={`w-full bg-surface/20 mt-2 p-5 border border-border rounded-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default InputCard;