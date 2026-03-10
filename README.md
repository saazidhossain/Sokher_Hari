# শখের হাঁড়ি — Shokher Hadi

> **Premium Bengali Cloud Kitchen Web Portal**

A production-ready, mobile-first web ordering portal for Shokher Hadi — a homestyle Bengali cloud kitchen based in Dhaka, Bangladesh.

---

## ✨ Features

- **Full menu** with real dish photos, descriptions, tags, and prices
- **Search & filter** by category (Mains, Snacks, Desserts, Family Packs) or keyword
- **Cart system** with quantity controls, item removal, and live totals
- **WhatsApp order flow** — generates a beautifully structured order message and opens WhatsApp with one tap
- **Customer details form** with inline validation (name, delivery address, special instructions)
- **Mobile-first** design with floating cart bar on small screens
- **Graceful fallback** when images are unavailable (emoji placeholder)
- **Accessible** — all interactive elements have ARIA labels

---

## 🛠 Tech Stack

| Layer        | Technology                         |
|:-------------|:-----------------------------------|
| Framework    | React 19 + TypeScript              |
| Build tool   | Vite 7                             |
| Styling      | Tailwind CSS v4 (@tailwindcss/vite)|
| Icons        | lucide-react                       |
| Order flow   | WhatsApp `wa.me` deep link         |

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open http://localhost:5173
```

### Build for production

```bash
npm run build      # Outputs to dist/
npm run preview    # Preview production build locally
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky header with cart badge
│   ├── Hero.tsx            # Hero section with search bar
│   ├── CategoryTabs.tsx    # Horizontal scrollable category filter
│   ├── MenuGrid.tsx        # Responsive menu item grid
│   ├── MenuItemCard.tsx    # Individual dish card with add-to-cart
│   ├── CartDrawer.tsx      # Slide-in cart with checkout form
│   ├── FloatingCartBar.tsx # Mobile bottom cart bar
│   └── Footer.tsx          # Footer with contact & hours
├── data/
│   └── menu.ts             # All menu items, categories & config
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Root component & state management
├── main.tsx                # React entry point
└── index.css               # Global styles + Tailwind directives
```

---

## 📋 Updating the Menu

Edit **`src/data/menu.ts`** — no code changes required elsewhere.

```typescript
// Example: add a new dish
{
  id: 'new1',
  name: 'Your Dish Name',
  description: 'A short, appetizing description.',
  price: 200,
  category: 'Mains',      // 'Mains' | 'Snacks' | 'Desserts' | 'Family Packs'
  tags: ['New', 'Popular'],
  image: 'https://your-image-url.jpg',
  isAvailable: true,
}
```

---

## 📞 Contact & Order

Orders are placed via **WhatsApp** at [+8801799667018](https://wa.me/8801799667018).
