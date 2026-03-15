import { ShoppingBag } from 'lucide-react';

interface FloatingCartBarProps {
  totalItems: number;
  totalPrice: number;
  onOpen: () => void;
}

export default function FloatingCartBar({
  totalItems,
  totalPrice,
  onOpen,
}: FloatingCartBarProps) {
  if (totalItems === 0) return null;

  return (
    /* Only visible on mobile (sm:hidden), appears above bottom safe area */
    <div className="fixed bottom-6 inset-x-0 flex justify-center z-30 px-4 sm:hidden pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full max-w-sm bg-[#4A2511] text-white rounded-full py-4 px-6 shadow-2xl flex items-center justify-between font-semibold active:scale-95 transition-transform duration-150 animate-slide-up"
        aria-label="View your order"
      >
        {/* Left: item count */}
        <div className="flex items-center gap-3">
          <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            {totalItems}
          </div>
          <span className="text-sm">View Order</span>
        </div>

        {/* Right: total */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">৳{totalPrice}</span>
          <ShoppingBag size={16} />
        </div>
      </button>
    </div>
  );
}
