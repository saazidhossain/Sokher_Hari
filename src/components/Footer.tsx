import { MessageCircle, Clock, MapPin, Instagram } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/menu';

export default function Footer() {
  const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent('Hi! I would like to place an order from Shokher Hadi \uD83E\uDD58')}`;

  return (
    <footer className="bg-[#4A2511] text-white mt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold">{BUSINESS_CONFIG.nameBn}</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {BUSINESS_CONFIG.tagline}<br />
              Homestyle Bengali cooking with heart.
            </p>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/40">Info</h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 text-[#EDBB42] flex-shrink-0" />
                {BUSINESS_CONFIG.hours}
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 text-[#EDBB42] flex-shrink-0" />
                {BUSINESS_CONFIG.location}
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/40">Contact</h4>
            <div className="space-y-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-2.5 rounded-xl font-semibold transition-colors w-fit"
              >
                <MessageCircle size={16} />
                Order on WhatsApp
              </a>
              {BUSINESS_CONFIG.instagram && (
                <a
                  href={`https://instagram.com/${BUSINESS_CONFIG.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Instagram size={15} />
                  @{BUSINESS_CONFIG.instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/30">
          © {new Date().getFullYear()} {BUSINESS_CONFIG.name} · Made with ❤️ in Dhaka
        </div>
      </div>
    </footer>
  );
}
