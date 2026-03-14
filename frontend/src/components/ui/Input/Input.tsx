import React from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-bold text-slate-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(
            'w-full rounded-2xl border-2 border-transparent bg-slate-100 px-5 py-3 text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10',
            error ? 'border-red-500 bg-red-50 focus:border-red-500' : '',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
