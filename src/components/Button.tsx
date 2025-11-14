import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  to,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 min-h-[44px] sm:min-h-[48px]';
  
  const variantClasses = {
    primary: 'bg-brown-600 text-white hover:bg-brown-700 active:bg-brown-800 focus:ring-brown-500',
    secondary: 'bg-brown-500 text-white hover:bg-brown-600 active:bg-brown-700 focus:ring-brown-400',
    outline: 'border-2 border-brown-600 text-brown-700 hover:bg-brown-50 active:bg-brown-100 focus:ring-brown-500',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

