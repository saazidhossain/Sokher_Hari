import { useState, useMemo, useEffect, useCallback } from 'react';
import type { CartItem } from './types';
import type { MenuItem } from './types';
import type { CategoryFilter } from './data/menu';
import { MENU_ITEMS } from './data/menu';

import Header from './components/Header';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import MenuGrid from './components/MenuGrid';
import CartDrawer from './components/CartDrawer';
import FloatingCartBar from './components/FloatingCartBar';
import Footer from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ── Lock body scroll when cart is open ──────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  // ── Cart operations ──────────────────────────────────────────────────────
  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // ── Derived totals ───────────────────────────────────────────────────────
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // ── Filtered menu ────────────────────────────────────────────────────────
  const filteredMenu = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return MENU_ITEMS.filter((item) => {
      if (!item.isAvailable) return false;
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] selection:bg-[#C84B31] selection:text-white pb-24">

      {/* Sticky header */}
      <Header totalItems={totalItems} onCartOpen={() => setIsCartOpen(true)} />

      {/* Hero + search */}
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Menu section */}
      <main className="max-w-5xl mx-auto px-4 pb-16">
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <MenuGrid items={filteredMenu} cart={cart} onAdd={addToCart} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile floating cart bar */}
      <FloatingCartBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        onOpen={() => setIsCartOpen(true)}
      />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
}
