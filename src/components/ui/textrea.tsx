import { TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import clsx from 'clsx';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  error?: FieldError;
}

const Textarea = ({ label, error, className, ...props }: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-normal capitalize text-text">
          {label}
        </label>
      )}

      <textarea
        className={clsx(
          'w-full border border-border rounded-md px-4 py-1.5',
          'outline-none focus:ring-1 ring-primary disabled:opacity-60',
          'disabled:cursor-not-allowed',
          error && 'border-danger ring-danger',
          className,
        )}
        {...props}
      />

      {error && (
        <span className="text-[14px] capitalize text-danger">
          {error.message}
        </span>
      )}
    </div>
  );
};


export default Textarea;