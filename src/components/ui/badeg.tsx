import { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

interface VariantClasses {
  success: string;
  warning: string;
  danger: string;
  techStack: string;
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  variant?: keyof VariantClasses;
}

const Badeg = ({
  children,
  className,
  variant = 'success',
  ...props
}: Props) => {
  const variantClasses: VariantClasses = {
    success:
      'bg-success-bg border-success/20  px-2 py-0.5 text-[10px] text-success',
    warning:
      'bg-warning-bg border-warning/20  px-2 py-0.5 text-[10px] text-warning',
    danger:
      'bg-danger-bg border-danger/20  px-2 py-0.5 text-[10px] text-danger',
    techStack:
      'bg-surface border border-border  px-3 py-1 text-[13px] text-text transition-colors',
  };

  const selectedVariantClass = variantClasses[variant];

  return (
    <span
      className={clsx(
        'inline-flex items-center tracking-wider font-normal capitalize rounded-lg border',
        className,
        selectedVariantClass,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badeg;
