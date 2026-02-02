export default function GuideCard({ guide }) {
  return (
    <a href={`/guide/${guide.slug}`} className="group block bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {guide.category === 'buying' ? 'Buying Guide' : 'Selling Guide'}
          </span>
          <span className="text-xs text-gray-400">{guide.readTime} min read</span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
          {guide.shortTitle}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {guide.tldr}
        </p>
        
        <div className="flex items-center text-sm font-medium text-gray-900">
          Read Guide
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
