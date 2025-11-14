import Logo from './Logo';

export default function HeroSection() {
  return (
    <div className="bg-brown-800 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 fade-in">
            <Logo variant="dark" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            CrimeMap, CA
          </h1>
          <p className="text-xl md:text-2xl text-brown-100 max-w-3xl mx-auto leading-relaxed">
            Explore crime rate trends across California counties. Click any county below to view its page.
          </p>
        </div>
      </div>
    </div>
  );
}

