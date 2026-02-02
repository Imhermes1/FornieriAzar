import { getAllGuides } from '@/lib/content/guides-data';
import GuideCard from '@/app/components/GuideCard';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Real Estate Guides | Fornieri & Azar',
  description: 'Expert guides for buying and selling property in Melbourne. From first-home buyers to seasoned investors, get the knowledge you need to succeed.',
  openGraph: {
    title: 'Real Estate Guides | Fornieri & Azar',
    description: 'Expert guides for buying and selling property in Melbourne.',
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const buyingGuides = guides.filter(g => g.category === 'buying');
  const sellingGuides = guides.filter(g => g.category === 'selling');

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-5xl font-semibold text-gray-900 mb-6">
              Real Estate Guides
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Expert insights for buying and selling property in Melbourne. 
              Backed by real data and years of experience.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Buying Guides</h2>
              <p className="text-gray-600">Everything you need to know about purchasing property</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-20">
              {buyingGuides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Selling Guides</h2>
              <p className="text-gray-600">Maximise your sale price with proven strategies</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sellingGuides.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
