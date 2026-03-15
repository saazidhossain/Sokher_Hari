import { Search } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/menu';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 pt-14 pb-10 sm:pt-20 sm:pb-14 text-center">
      {/* Eyebrow label */}
      <span className="inline-block mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-[#C84B31] bg-[#C84B31]/10 px-3 py-1 rounded-full">
        🍛 Cloud Kitchen · Dhaka
      </span>

      {/* Headline */}
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4A2511] leading-tight mb-5">
        {BUSINESS_CONFIG.tagline.split(',').map((part, i) => (
          <span key={i}>
            {i > 0 && <>,<br className="sm:hidden" /></>}
            {i === 0 ? part : ` ${part}`}
          </span>
        ))}
      </h2>

      {/* Sub-headline */}
      <p className="text-gray-500 max-w-lg mx-auto mb-8 text-base sm:text-lg leading-relaxed">
        Premium home-cooked Bengali delicacies, snacks &amp; desserts. Order
        fresh from our cloud kitchen — straight to your doorstep.
      </p>

      {/* Search */}
      <div className="max-w-md mx-auto relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            size={17}
            className="text-gray-400 group-focus-within:text-[#C84B31] transition-colors duration-200"
          />
        </div>
        <input
          type="search"
          className="block w-full pl-11 pr-4 py-3.5 border border-[#E8E1D5] rounded-full bg-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#C84B31]/25 focus:border-[#C84B31] transition-all shadow-sm"
          placeholder="Search biryani, momos, sweets…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search menu"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Business hours pill */}
      <p className="mt-5 text-xs text-gray-400 flex items-center justify-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
        {BUSINESS_CONFIG.hours}
      </p>
    </section>
  );
}
