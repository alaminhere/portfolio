import { InputHTMLAttributes } from 'react';
import { FieldError, Merge } from 'react-hook-form';
import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  error?: FieldError | Merge<FieldError, (FieldError | undefined)[]>;
}

const Input = ({ className, label, error, ...props }: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-normal capitalize text-text">
          {label}
        </label>
      )}

      <input
        className={clsx(
          'w-full border border-border rounded-md px-4 py-2.5',
          'outline-none focus:ring-1 ring-primary disabled:opacity-60',
          'disabled:cursor-not-allowed',
          error && 'border-danger ring-danger',
          className,
        )}
        {...props}
      />

      {error && (
        <span className="text-[14px] capitalize text-danger">
          {error?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
