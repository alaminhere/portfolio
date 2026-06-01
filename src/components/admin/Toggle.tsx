'use client';

import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'flex h-6 w-10 shrink-0 items-center rounded-full px-0.5 transition-colors duration-200',
        checked ? 'justify-end bg-primary' : 'justify-start bg-border',
      )}
    >
      <span className="block h-5 w-5 rounded-full bg-text" />
    </button>
  );
}
