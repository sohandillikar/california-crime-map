import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import CaliforniaMap from './components/CaliforniaMap';
import CountyPage from './pages/CountyPage';
import CountyList from './components/CountyList';
import Tabs from './components/Tabs';

function HomePage() {
  const tabs = [
    {
      id: 'map',
      label: 'Interactive Map',
      content: (
        <div>
          <h2 className="text-2xl font-semibold text-brown-900 mb-4 text-center">
            Interactive County Map
          </h2>
          <p className="text-brown-700 text-center mb-8 max-w-2xl mx-auto">
            Select any county on the map to explore detailed crime statistics and trends.
          </p>
          <CaliforniaMap />
        </div>
      ),
    },
    {
      id: 'search',
      label: 'Search County',
      content: (
        <div>
          <h2 className="text-2xl font-semibold text-brown-900 mb-4 text-center">
            Browse All Counties
          </h2>
          <p className="text-brown-700 text-center mb-6 max-w-2xl mx-auto">
            Search and select any county to view detailed crime statistics and trends.
          </p>
          <div className="bg-white rounded-lg p-6 border border-brown-200 shadow-sm">
            <CountyList searchable={true} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <HeroSection />
      <main className="flex-grow bg-brown-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs tabs={tabs} defaultTab="map" />
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
