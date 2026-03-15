import { CATEGORIES } from '../data/menu';
import type { CategoryFilter } from '../data/menu';

interface CategoryTabsProps {
  active: CategoryFilter;
  onChange: (c: CategoryFilter) => void;
}

export default function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C84B31] ${
            active === cat
              ? 'bg-[#4A2511] text-white shadow-md'
              : 'bg-white border border-[#E8E1D5] text-gray-600 hover:border-[#C84B31] hover:text-[#C84B31]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
