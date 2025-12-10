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
      id: 'introduction',
      label: 'Introduction',
      content: (
        <div className="bg-white rounded-lg p-6 md:p-8 lg:p-12 border border-brown-200 shadow-sm">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold text-brown-900 mb-4 text-center">
              Introduction
            </h2>
            <div className="w-full max-w-4xl mx-auto mb-6">
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  src="https://drive.google.com/file/d/1rNYlkQ9kFj9YtKcDKseiKRSlVLceLQCd/preview"
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  allow="autoplay"
                  allowFullScreen
                />
              </div>
            </div>
            <p className="text-brown-700 leading-relaxed">
              Feeling that your family is safe is important for one's well-being, and thus is a crucial factor when deciding on where to settle down. However, doing research on crime data for every single county can be a long and tedious process. Our website seeks to trivialize this process by instantly presenting all necessary insights to any viewer of the webpage, as a fully interactive map. This not only greatly saves time for everyone, but also gives peace of mind that they can make a life-changing decision backed by solid evidence of metrics and trends, and not purely based on hearsay.
            </p>
            
            <p className="text-brown-700 leading-relaxed">
              Our project sources crime data straight from the <a href="https://openjustice.doj.ca.gov/" target="_blank" rel="noopener noreferrer" className="text-brown-600 hover:text-brown-800 underline transition-colors">California Department of Justice's OpenJustice page</a>, as well as relevant population data straight from the <a href="https://www.census.gov/" target="_blank" rel="noopener noreferrer" className="text-brown-600 hover:text-brown-800 underline transition-colors">US Census Bureau</a>. By utilizing government sources instead of for-profit third-parties, we ensure that we are receiving the most reputable data possible. For forecasting, our team used Prophet, a forecasting procedure sourced straight from <a href="https://github.com/facebook/prophet" target="_blank" rel="noopener noreferrer" className="text-brown-600 hover:text-brown-800 underline transition-colors">Meta Open Source</a>. Its backing by such a massive company yields confidence in the capabilities of the package, and thus further confidence in the reliability of the data presented.
            </p>
            
            <p className="text-brown-700 leading-relaxed">
              At a quick glance, our interactive map has areas with higher reported crime rates shaded darker, and hovering over each county will give the most up-to-date metrics on crime and population. Specific insights for each county have also been compiled and are available by clicking on the corresponding county on the map, or searching by name via our search tool.
            </p>
            
            <p className="text-brown-700 leading-relaxed">
              Overall, we found an overall downtrend of crime in the last 10 years across the state, predating the sharp drop during the pandemic and slight resurgence after the fact. We also found that highly populated counties such as the San Francisco and Los Angeles counties actually have some of the lowest rates of crime per-capita, despite what their reputation may otherwise indicate thanks to mass media. Ultimately, affluent counties, such as all of those in the Bay Area, have a noticeably lower crime rate than that of other counties, especially those in Northern California. Ultimately, the best counties based on raw metrics and no other assumptions appear to be Contra Costa and Alameda at about 15 crimes per 1000 capita annually, with Plumas as an honorable mention at just 7 crimes per 1000 capita, but discarded due to an insufficient sample size of both crimes of population.
            </p>
          </div>
        </div>
      ),
    },
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
          <Tabs tabs={tabs} defaultTab="introduction" />
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
