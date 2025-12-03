import { Link } from 'react-router-dom';
import Logo from './Logo';
import CountyDropdown from './CountyDropdown';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-brown-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Logo variant="light" />
          
          <div className="flex items-center">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-brown-600 hover:text-brown-800 hover:bg-brown-50"
            >
              Home
            </Link>
            <CountyDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}

