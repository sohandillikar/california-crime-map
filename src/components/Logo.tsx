import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
}

export default function Logo({ variant = 'dark' }: LogoProps) {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-brown-900' : 'text-white';
  const subtextColor = isLight ? 'text-brown-600' : 'text-brown-200';
  
  return (
    <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
      <div className="relative">
        {/* Shield/Badge Shape */}
        <svg
          width="40"
          height="48"
          viewBox="0 0 48 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform group-hover:scale-105 w-10 h-12 sm:w-12 sm:h-14"
        >
          {/* Shield outline */}
          <path
            d="M24 0L48 8V24C48 40.5 36 54.5 24 56C12 54.5 0 40.5 0 24V8L24 0Z"
            fill={isLight ? "#6d4c41" : "#8d6e63"}
            className={isLight ? "group-hover:fill-brown-700" : "group-hover:fill-brown-500"}
          />
          {/* Inner shield highlight */}
          <path
            d="M24 4L44 10.5V24C44 37.5 33.5 49.5 24 51C14.5 49.5 4 37.5 4 24V10.5L24 4Z"
            fill={isLight ? "#8d6e63" : "#a1887f"}
          />
          {/* Magnifying glass icon */}
          <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="2" fill="none" />
          <line x1="30" y1="30" x2="36" y2="36" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Map pin dot */}
          <circle cx="24" cy="20" r="2" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`text-lg sm:text-xl font-bold ${textColor} group-hover:opacity-80 transition-opacity`}>
          CrimeMap
        </span>
        <span className={`text-xs font-medium ${subtextColor} uppercase tracking-wide`}>
          California
        </span>
      </div>
    </Link>
  );
}

