import { UtensilsCrossed } from 'lucide-react';
import type { MenuItem } from '../types';
import type { CartItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuGridProps {
  items: MenuItem[];
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
}

export default function MenuGrid({ items, cart, onAdd }: MenuGridProps) {
  const cartIds = new Set(cart.map((c) => c.id));

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <UtensilsCrossed size={40} className="text-[#E8E1D5] mb-4" />
        <p className="text-gray-400 text-base font-medium">No dishes found.</p>
        <p className="text-gray-400 text-sm mt-1">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={onAdd}
          isInCart={cartIds.has(item.id)}
        />
      ))}
    </div>
  );
}
