import { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import type { MenuItem } from '../types';
import type { TagLabel } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  isInCart: boolean;
}

/** Colour mapping for badge tags */
const TAG_STYLES: Record<TagLabel, string> = {
  Popular:       'bg-[#EDBB42] text-[#4A2511]',
  'Best Seller': 'bg-[#C84B31] text-white',
  New:           'bg-[#2D6A4F] text-white',
  Special:       'bg-[#4A2511] text-white',
  'Pre-order':   'bg-gray-700 text-white',
  Seasonal:      'bg-sky-600 text-white',
  'Non-Veg':     'bg-red-100 text-red-700',
  Veg:           'bg-green-100 text-green-700',
  Spicy:         'bg-orange-100 text-orange-700',
};

/** Only show the top 2 most important tags on the card */
const TAG_PRIORITY: TagLabel[] = [
  'Best Seller', 'Popular', 'New', 'Special', 'Pre-order', 'Seasonal', 'Spicy', 'Non-Veg', 'Veg',
];

export default function MenuItemCard({ item, onAdd, isInCart }: MenuItemCardProps) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const prioritisedTags = TAG_PRIORITY.filter((t) => item.tags.includes(t)).slice(0, 2);

  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-md transition-shadow duration-300 group flex flex-col">
      {/* ── Image ───────────────────────────────────────────────────── */}
      <div className="relative h-48 bg-[#E8E1D5] overflow-hidden">
        {imgError ? (
          /* Tasteful fallback when image can't load */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5EFE6] to-[#E8E1D5]">
            <span className="text-4xl">🍲</span>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}

        {/* Tag badges */}
        {prioritisedTags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {prioritisedTags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm ${TAG_STYLES[tag] ?? 'bg-white/90 text-[#4A2511]'}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* In-cart indicator */}
        {isInCart && (
          <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#C84B31] flex items-center justify-center shadow">
            <Check size={13} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-1.5">
          <h3 className="font-serif font-bold text-[17px] text-[#4A2511] leading-snug">
            {item.name}
          </h3>
          <span className="font-bold text-[#C84B31] whitespace-nowrap text-base pt-0.5">
            ৳{item.price}
          </span>
        </div>

        <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1">
          {item.description}
        </p>

        <button
          onClick={handleAdd}
          className={`btn-primary w-full py-2.5 rounded-xl border-2 font-semibold text-sm flex justify-center items-center gap-2 transition-all duration-200 ${
            added
              ? 'bg-[#4A2511] border-[#4A2511] text-white'
              : 'border-[#C84B31] text-[#C84B31] hover:bg-[#C84B31] hover:text-white'
          }`}
          aria-label={`Add ${item.name} to cart`}
        >
          {added ? (
            <>
              <Check size={16} strokeWidth={3} />
              Added!
            </>
          ) : (
            <>
              <Plus size={16} />
              Add to Order
            </>
          )}
        </button>
      </div>
    </article>
  );
}
