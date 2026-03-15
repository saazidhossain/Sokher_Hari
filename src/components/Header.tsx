import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/menu';

interface HeaderProps {
  totalItems: number;
  onCartOpen: () => void;
}

export default function Header({ totalItems, onCartOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/85 backdrop-blur-md border-b border-[#E8E1D5]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#C84B31] text-white flex items-center justify-center shadow-sm">
            <UtensilsCrossed size={18} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-serif font-bold text-[#4A2511] tracking-tight">
              {BUSINESS_CONFIG.nameBn}
            </span>
            <span className="text-[10px] font-sans text-[#C84B31] tracking-widest uppercase hidden sm:block">
              {BUSINESS_CONFIG.name}
            </span>
          </div>
        </div>

        {/* Cart Button */}
        <button
          onClick={onCartOpen}
          aria-label={`Open cart, ${totalItems} items`}
          className="relative p-2.5 text-[#4A2511] hover:bg-[#E8E1D5] rounded-full transition-colors duration-200"
        >
          <ShoppingBag size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#C84B31] text-white text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center rounded-full border-2 border-[#FDFBF7] animate-pulse-badge px-1">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
