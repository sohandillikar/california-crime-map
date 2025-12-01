import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { slugToCounty } from '../data/counties';

export default function CountyPage() {
  const { countySlug } = useParams<{ countySlug: string }>();
  const county = countySlug ? slugToCounty(countySlug) : undefined;
  const countyName = county?.name || 'Unknown County';

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
          
          <div className="bg-white rounded-lg p-8 md:p-12 border border-brown-200">
            <div className="mb-6 pb-6 border-b border-brown-200">
              <h1 className="text-4xl md:text-5xl font-bold text-brown-900 mb-2">
                {countyName}
              </h1>
              <p className="text-brown-600 text-lg">
                Crime Statistics & Analysis {county && `(${county.year})`}
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none">
              {county ? (
                <div className="space-y-4">
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded border border-brown-200">
                        <p className="text-sm text-brown-600 mb-1">Felonies per 1,000 Population</p>
                        <p className="text-3xl font-bold text-brown-900">{county.felonies_per_1k_pop.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-white rounded border border-brown-200">
                        <p className="text-sm text-brown-600 mb-1">Misdemeanors per 1,000 Population</p>
                        <p className="text-3xl font-bold text-brown-900">{county.misdeamors_per_1k_pop.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded border border-brown-200">
                      <p className="text-sm text-brown-600 mb-1">Total Crimes per 1,000 Population</p>
                      <p className="text-3xl font-bold text-brown-900">
                        {(county.felonies_per_1k_pop + county.misdeamors_per_1k_pop).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xl text-brown-700 leading-relaxed">
                  County not found.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

