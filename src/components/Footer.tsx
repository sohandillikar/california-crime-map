export default function Footer() {
  return (
    <footer className="bg-brown-900 text-brown-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">CrimeMap, CA</h3>
            <p className="text-brown-200 text-sm">
              A Data Science Capstone Project exploring crime rate trends across California counties.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Project</h4>
            <ul className="space-y-2 text-sm text-brown-200">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Data</h4>
            <p className="text-brown-200 text-sm">
              California county boundaries and crime statistics.
            </p>
          </div>
        </div>
        
        <div className="border-t border-brown-800 mt-8 pt-6 text-center text-sm text-brown-300">
          <p>&copy; {new Date().getFullYear()} CrimeMap, CA. Data Science Capstone Project.</p>
        </div>
      </div>
    </footer>
  );
}

