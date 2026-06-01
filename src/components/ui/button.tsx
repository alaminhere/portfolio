import { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { Loader } from 'lucide-react';

interface VariantClass {
  primary: string;
  secondary: string;
}

interface SizeClass {
  md: string;
  sm: string;
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: keyof SizeClass;
  variant?: keyof VariantClass;
  disabled?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  className,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  ...props
}: Props) => {
  const variantClass: VariantClass = {
    primary: 'bg-btn-bg text-btn-text hover:bg-btn-bg-hover',
    secondary:
      'bg-transparent border border-border text-text hover:border-border-hover',
  };

  const sizeClass: SizeClass = {
    md: 'px-5 py-2 text-[14px]',
    sm: 'px-4 py-1.5 text-[12px]',
  };

  const selectedVariant = variantClass[variant];
  const selectedSize = sizeClass[size];

  return (
    <button
      className={clsx(
        'flex items-center justify-center gap-2 tracking-wide font-normal font-secondary uppercase rounded-md',
        'active:scale-90 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-300',
        selectedSize,
        selectedVariant,
        className,
        loading ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
      disabled={disabled || loading}
      {...props}
      type={type}
    >
      {loading && <Loader size={18} className='animate-spin'/>}

      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
