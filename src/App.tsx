import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import CaliforniaMap from './components/CaliforniaMap';
import CountyPage from './pages/CountyPage';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <main className="flex-grow bg-brown-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-brown-900 mb-4 text-center">
              Interactive County Map
            </h2>
            <p className="text-brown-700 text-center mb-8 max-w-2xl mx-auto">
              Select any county on the map to explore detailed crime statistics and trends.
            </p>
          </section>
          <CaliforniaMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:countySlug" element={<CountyPage />} />
    </Routes>
  );
}

export default App;
