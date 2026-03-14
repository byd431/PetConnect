import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = ({ className, hoverEffect = true, children, ...props }: CardProps) => {
  return (
    <div
      className={twMerge(
        'rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden transition-all duration-300',
        hoverEffect ? 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
