// ─── Core menu item model ────────────────────────────────────────────────────

export type TagLabel =
  | 'Popular'
  | 'New'
  | 'Special'
  | 'Pre-order'
  | 'Seasonal'
  | 'Non-Veg'
  | 'Veg'
  | 'Spicy'
  | 'Best Seller';

export type Category = 'Mains' | 'Snacks' | 'Desserts' | 'Family Packs';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags: TagLabel[];
  /** Fully-qualified image URL or local path */
  image: string;
  isAvailable: boolean;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export interface CartItem extends MenuItem {
  qty: number;
}
