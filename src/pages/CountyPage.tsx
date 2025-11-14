import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { slugToCounty } from '../data/counties';

export default function CountyPage() {
  const { countySlug } = useParams<{ countySlug: string }>();
  const countyName = countySlug ? slugToCounty(countySlug) : 'Unknown County';

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow bg-brown-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button to="/" variant="outline">
              ← Back to Map
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-brown-200">
            <div className="mb-6 pb-6 border-b border-brown-200">
              <h1 className="text-4xl md:text-5xl font-bold text-brown-900 mb-2">
                {countyName}
              </h1>
              <p className="text-brown-600 text-lg">
                Crime Statistics & Analysis
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-brown-700 leading-relaxed">
                This is the page for {countyName}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

