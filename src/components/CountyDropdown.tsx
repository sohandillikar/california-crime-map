import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';
import CountyList from './CountyList';

export default function CountyDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isOpen
            ? 'text-brown-700 bg-brown-50'
            : 'text-brown-600 hover:text-brown-800 hover:bg-brown-50'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Browse counties"
      >
        Counties
        <HiChevronDown className={`ml-1 inline-block transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-brown-200 rounded-lg shadow-lg z-50 max-h-[600px] overflow-hidden flex flex-col">
          <div className="p-4 border-b border-brown-200 bg-brown-50">
            <h3 className="text-lg font-semibold text-brown-900">Browse Counties</h3>
            <p className="text-sm text-brown-600 mt-1">Select a county to view details</p>
          </div>
          <div className="overflow-y-auto p-4 flex-1">
            <CountyList searchable={true} />
          </div>
        </div>
      )}
    </div>
  );
}

