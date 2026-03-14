import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const baseStyles = 'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 hover:shadow-blue-500/40',
      secondary: 'bg-gradient-to-br from-teal-400 to-teal-500 text-white shadow-lg shadow-teal-500/30 hover:-translate-y-0.5 hover:shadow-teal-500/40',
      outline: 'border-2 border-slate-200 bg-transparent text-slate-700 hover:border-blue-500 hover:text-blue-600',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    return (
      <button
        ref={ref}
        className={twMerge(baseStyles, variants[variant], sizes[size], className)}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 animate-spin">⏳</span>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
