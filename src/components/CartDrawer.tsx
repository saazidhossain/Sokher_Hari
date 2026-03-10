import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, MessageCircle, Info, UtensilsCrossed, Trash2 } from 'lucide-react';
import type { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../data/menu';

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [nameError, setNameError] = useState(false);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    if (!customerName.trim()) {
      setNameError(true);
      return;
    }
    setNameError(false);

    // Build the WhatsApp message
    let msg = `*🥘 Shokher Hadi Order*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Name:* ${customerName.trim()}\n`;
    if (customerAddress.trim()) msg += `*Address:* ${customerAddress.trim()}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Order:*\n`;
    cart.forEach((item) => {
      msg += `  • ${item.qty}× ${item.name} — ৳${item.price * item.qty}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Total: ৳${totalPrice}*\n`;
    if (orderNotes.trim()) msg += `\n*Notes:* ${orderNotes.trim()}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col animate-slide-in"
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E1D5] bg-white">
          <h2 className="text-lg font-serif font-bold text-[#4A2511] flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Order
            {totalItems > 0 && (
              <span className="text-sm font-sans font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Body ─────────────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 opacity-60">
              <UtensilsCrossed size={44} className="text-[#C84B31]" />
              <div>
                <p className="font-semibold text-[#4A2511]">Your Hadi is empty.</p>
                <p className="text-sm text-gray-500 mt-1">Add some delicious items to get started.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Item list */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#E8E1D5] shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg bg-[#E8E1D5] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Name + price */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-[#4A2511] truncate leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-[#C84B31] font-medium text-sm mt-0.5">
                        ৳{item.price * item.qty}
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div className="flex items-center gap-1 bg-[#FDFBF7] border border-[#E8E1D5] rounded-lg p-1 flex-shrink-0">
                      <button
                        onClick={() => onUpdateQty(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#C84B31] transition-colors rounded"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="text-sm font-bold w-5 text-center tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-[#C84B31] transition-colors rounded"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery details form */}
              <div className="border-t border-[#E8E1D5] pt-5 space-y-3">
                <h3 className="font-bold text-[#4A2511] text-sm">Delivery Details</h3>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (e.target.value.trim()) setNameError(false);
                    }}
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 bg-white text-sm transition-all ${
                      nameError
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-[#E8E1D5] focus:ring-[#C84B31]/25 focus:border-[#C84B31]'
                    }`}
                  />
                  {nameError && (
                    <p className="text-red-500 text-xs mt-1 pl-1">Please enter your name.</p>
                  )}
                </div>

                {/* Address */}
                <textarea
                  placeholder="Delivery Address (optional for pickup)"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  rows={2}
                  className="w-full p-3 border border-[#E8E1D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/25 focus:border-[#C84B31] bg-white text-sm resize-none transition-all"
                />

                {/* Notes */}
                <input
                  type="text"
                  placeholder="Special instructions (e.g., less spicy)"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full p-3 border border-[#E8E1D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/25 focus:border-[#C84B31] bg-white text-sm transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        {cart.length > 0 && (
          <div className="px-5 py-4 bg-white border-t border-[#E8E1D5] shadow-[0_-8px_24px_-10px_rgba(0,0,0,0.08)]">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">Total Amount</span>
              <span className="font-serif font-bold text-2xl text-[#C84B31]">৳{totalPrice}</span>
            </div>

            {/* CTA */}
            <button
              onClick={handleCheckout}
              className="btn-primary w-full bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1aa84f] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={19} />
              Order via WhatsApp
            </button>

            <p className="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1">
              <Info size={11} />
              Opens WhatsApp with your pre-filled order
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
