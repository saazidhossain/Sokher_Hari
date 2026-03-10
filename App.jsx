import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, Search, MessageCircle, Info, UtensilsCrossed, CheckCircle2, Sparkles, Loader2, Gift, MapPin, Clock, Truck, ChefHat } from 'lucide-react';

// --- DATA MODEL (Expanded & Categorized) ---
const MENU_DATA = [
  // --- Customized Thali ---
  {
    id: 't1',
    name: 'Premium Biye-Bari Thali',
    description: 'বিয়ে বাড়ির স্বাদের পোলাও, চিকেন রোস্ট, গরুর রেজালা, জালি কাবাব, বোরহানি ও জর্দা। (১ জনের কাস্টোমাইজড প্লেটার)',
    price: 450,
    category: 'কাস্টোমাইজড থালী',
    tags: ['Best Seller'],
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },
  {
    id: 't2',
    name: 'Corporate Lunch Thali',
    description: 'সাদা ভাত, মুরগির ঝোল, ডাল, সবজি ও ২ পদের ভর্তা। স্বাস্থ্যকর ও ঘরোয়া স্বাদের কর্পোরেট লাঞ্চ।',
    price: 220,
    category: 'কাস্টোমাইজড থালী',
    tags: ['Daily'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },
  
  // --- Frozen Foods ---
  {
    id: 'fr1',
    name: 'Frozen Beef Shami Kebab',
    description: 'খাঁটি গরুর মাংস ও স্পেশাল মশলায় তৈরি ফ্রোজেন শামী কাবাব। শুধু ভেজে খাওয়ার জন্য প্রস্তুত। (১০ পিস)',
    price: 350,
    category: 'ফ্রোজেন ফুড',
    tags: ['Ready to Fry'],
    image: 'https://images.unsplash.com/photo-1599487405270-45052009f470?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },
  {
    id: 'fr2',
    name: 'Frozen Chicken Samosa',
    description: 'চিকেন কিমা ও স্পেশাল মশলার পুরে ভরা ক্রিস্পি ফ্রোজেন সিঙ্গারা। (১২ পিস)',
    price: 200,
    category: 'ফ্রোজেন ফুড',
    tags: ['Hot'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },
  {
    id: 'fr3',
    name: 'Frozen Dal Puri',
    description: 'স্পেশাল ডালের পুর দেওয়া ফ্রোজেন ডাল পুরি। বিকেলের নাস্তায় পারফেক্ট। (১০ পিস)',
    price: 150,
    category: 'ফ্রোজেন ফুড',
    tags: [],
    image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },

  // --- Mains & Family Packs ---
  {
    id: 'f1',
    name: 'Royal Polao Feast Platter',
    description: 'বিশাল পোলাও প্ল্যাটার। চিকেন রোস্ট, গরুর রেজালা, টিকিয়া এবং ডিম। (৪-৫ জনের ফ্যামিলি প্যাক)',
    price: 1250,
    category: 'ফ্যামিলি প্যাক',
    tags: ['Pre-order'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600', 
    isAvailable: true
  },
  {
    id: 'm2',
    name: 'Shahi Chicken Roast',
    description: 'বিয়ে বাড়ির স্বাদের চিকেন রোস্ট। ঘন এবং স্পাইসি গ্রেভি।',
    price: 180,
    category: 'মেইন কোর্স',
    tags: ['Popular'],
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
    isAvailable: true
  },

  // --- Snacks ---
  {
    id: 's1',
    name: 'Envelope Samosas (খাম সিঙ্গারা)',
    description: 'ייחודי ফোল্ড করা ক্রিস্পি খাম সিঙ্গারা। ভেতরে মজাদার কিমার পুর। (৫ পিস)',
    price: 100,
    category: 'স্ন্যাকস',
    tags: ['Crispy'],
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600',
    isAvailable: true
  },

  // --- Pitha & Sweets ---
  {
    id: 'p1',
    name: 'Shahi Mishti Doi (হাঁড়ির দই)',
    description: 'ঐতিহ্যবাহী মাটির হাঁড়িতে পাতা প্রিমিয়াম মানের ঘন ও সুস্বাদু মিষ্টি দই।',
    price: 250,
    category: 'পিঠা ও মিষ্টি',
    tags: ['Special'],
    image: 'https://images.unsplash.com/photo-1511853406236-41f23b207eb4?auto=format&fit=crop&q=80&w=600',
    isAvailable: true
  },
  {
    id: 'p2',
    name: 'Patishapta Pitha (পাটিসাপটা)',
    description: 'ক্ষীরসা ও নারকেলের পুরে ভরা নরম পাটিসাপটা পিঠা। স্পেশাল ডিজাইনে তৈরি। (৬ পিস)',
    price: 180,
    category: 'পিঠা ও মিষ্টি',
    tags: ['Popular'],
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=600',
    isAvailable: true
  },
  {
    id: 'p3',
    name: 'Assorted Halwa Platter',
    description: 'গাজর, সুজি এবং বুটের ডালের প্রিমিয়াম হালুয়া। বাদাম ও কিসমিস দিয়ে সাজানো।',
    price: 450,
    category: 'পিঠা ও মিষ্টি',
    tags: ['Festive'],
    image: 'https://images.unsplash.com/photo-1605197136056-5606df8ed24a?auto=format&fit=crop&q=80&w=600',
    isAvailable: true
  }
];

const CATEGORIES = ['সব খাবার', 'কাস্টোমাইজড থালী', 'ফ্রোজেন ফুড', 'ফ্যামিলি প্যাক', 'মেইন কোর্স', 'স্ন্যাকস', 'পিঠা ও মিষ্টি'];
const WHATSAPP_NUMBER = '8801820057581';
const FREE_DELIVERY_THRESHOLD = 1500;

// --- DELIVERY ZONES & FEES ---
const DELIVERY_ZONES = [
  { name: 'এলাকা নির্বাচন করুন', fee: 0 },
  { name: 'মিরপুর', fee: 60 },
  { name: 'মোহাম্মদপুর / ধানমন্ডি', fee: 80 },
  { name: 'গুলশান / বনানী / বাড্ডা', fee: 100 },
  { name: 'উত্তরা', fee: 120 },
  { name: 'অন্যান্য (লোকেশন অনুযায়ী)', fee: 100 },
  { name: 'নিজে এসে নিয়ে যাব (Pickup)', fee: 0 }
];

const DELIVERY_TIMES = ['যত দ্রুত সম্ভব (ASAP)', 'আজ দুপুরে (১টা - ৩টা)', 'আজ সন্ধ্যায় (৬টা - ৮টা)', 'আগামীকাল দুপুরে', 'আগামীকাল সন্ধ্যায়'];
const QUICK_TAGS = ['🌶️ ঝাল কম', '🧅 পেঁয়াজ ছাড়া', '🧻 এক্সট্রা টিস্যু', '⏱️ দ্রুত ডেলিভারি'];

// --- PREMIUM IMAGE COMPONENT ---
const PremiumImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className="relative w-full h-full bg-[#E8E1D5] overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#E8E1D5] via-[#FDFBF7] to-[#E8E1D5] animate-[pulse_1.5s_ease-in-out_infinite] bg-[length:200%_100%]" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-700 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setImgSrc('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600');
          setIsLoaded(true);
        }}
      />
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('সব খাবার');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shokher_hadi_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedZone, setSelectedZone] = useState(DELIVERY_ZONES[0]);
  const [selectedTime, setSelectedTime] = useState(DELIVERY_TIMES[0]);

  // AI States
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [heritageModalOpen, setHeritageModalOpen] = useState(false);
  const [activeDish, setActiveDish] = useState(null);
  const [heritageText, setHeritageText] = useState('');
  const [isHeritageLoading, setIsHeritageLoading] = useState(false);

  const [showGiftUI, setShowGiftUI] = useState(false);
  const [giftPrompt, setGiftPrompt] = useState('');
  const [isGiftGenerating, setIsGiftGenerating] = useState(false);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'শুভ সকাল';
    if (hour >= 12 && hour < 17) return 'শুভ দুপুর';
    if (hour >= 17 && hour < 20) return 'শুভ সন্ধ্যা';
    return 'শুভ রাত্রি';
  }, []);

  useEffect(() => {
    localStorage.setItem('shokher_hadi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (isCartOpen || heritageModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isCartOpen, heritageModalOpen]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // --- API CALLS ---
  const callGeminiAPI = async (prompt, instruction, retries = 3) => {
    const apiKey = ""; 
    if(!apiKey) return "AI ফিচারটি বর্তমানে আপগ্রেড চলছে। দয়া করে কিছুক্ষণ পর চেষ্টা করুন।";

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: instruction }] }
        })
      });
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (retries > 0) return callGeminiAPI(prompt, instruction, retries - 1);
      return "দুঃখিত, কোনো একটি সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।";
    }
  };

  const fetchGeminiRecommendation = async (text) => {
    const menuContext = MENU_DATA.map(item => `${item.name} (৳${item.price}) - ${item.category} - ${item.description}`).join('\n');
    const instruction = `You are a friendly Bengali food assistant for 'Shokher Hadi' cloud kitchen (Founder: Nusrat Jahan). Recommend 1 or 2 items from this menu based on user input. Menu:\n${menuContext}\nRules: 1. Bengali language only. 2. Warm, short (2 sentences). 3. Only use provided menu. No markdown. Use emojis.`;
    return await callGeminiAPI(text, instruction);
  };

  const fetchDishHeritage = async (dishName) => {
    const instruction = `Culinary expert in Bengali cuisine. Describe the heritage, freshness, and taste profile of ${dishName} in 2 poetic, premium Bengali sentences. Make it sound irresistible. No markdown.`;
    return await callGeminiAPI(dishName, instruction);
  };

  const handleGiftMessageGenerate = async (e) => {
    e.preventDefault();
    if (!giftPrompt.trim()) return;
    setIsGiftGenerating(true);
    const instruction = `Write a short, touching personalized gift message (1-2 sentences) in Bengali based on the user's prompt to send with food delivery. No markdown. Use emojis.`;
    const generatedMessage = await callGeminiAPI(giftPrompt, instruction);
    
    if (generatedMessage && !generatedMessage.includes("সমস্যা হয়েছে")) {
      setOrderNotes(prev => prev.trim() ? `${prev}\n\n🎁 উপহারের বার্তা: "${generatedMessage}"` : `🎁 উপহারের বার্তা: "${generatedMessage}"`);
      setShowGiftUI(false);
      setGiftPrompt('');
      setToastMessage("উপহারের বার্তা যুক্ত করা হয়েছে!");
    } else {
      setToastMessage("মেসেজ জেনারেট করা যায়নি।");
    }
    setIsGiftGenerating(false);
  };

  // --- HANDLERS ---
  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    const response = await fetchGeminiRecommendation(aiPrompt);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  const openHeritageModal = async (item) => {
    setActiveDish(item);
    setHeritageModalOpen(true);
    setIsHeritageLoading(true);
    const text = await fetchDishHeritage(item.name);
    setHeritageText(text);
    setIsHeritageLoading(false);
  };

  const handleQuickTag = (tag) => {
    setOrderNotes(prev => prev.includes(tag) ? prev : prev.trim() ? `${prev}, ${tag}` : tag);
  };

  // --- CART & CHECKOUT LOGIC ---
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cItem => cItem.id === item.id);
      if (existing) return prev.map(cItem => cItem.id === item.id ? { ...cItem, qty: cItem.qty + 1 } : cItem);
      return [...prev, { ...item, qty: 1 }];
    });
    setToastMessage(`${item.name} কার্টে যোগ করা হয়েছে!`);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }).filter(item => item.qty > 0));
  };

  const clearCart = () => {
    if(window.confirm("আপনি কি কার্ট খালি করতে চান?")) setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const isFreeDeliveryEligible = cartSubtotal >= FREE_DELIVERY_THRESHOLD;
  const effectiveDeliveryFee = (isFreeDeliveryEligible || selectedZone.name === 'নিজে এসে নিয়ে যাব (Pickup)') ? 0 : selectedZone.fee;
  const totalAmount = cartSubtotal + effectiveDeliveryFee;
  const progressPercent = Math.min((cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  const handleCheckout = () => {
    if (!customerName.trim()) {
      alert("অর্ডার কনফার্ম করতে আপনার নাম লিখুন।");
      return;
    }
    if (selectedZone.name === 'এলাকা নির্বাচন করুন') {
      alert("ডেলিভারি চার্জ হিসাব করতে একটি এলাকা নির্বাচন করুন।");
      return;
    }
    
    setIsCheckingOut(true);

    let message = `*Shokher Hadi Order* 🥘\n`;
    message += `*নাম:* ${customerName.trim()}\n`;
    message += `*ডেলিভারি সময়:* ${selectedTime}\n`;
    message += `*লোকেশন:* ${selectedZone.name}\n`;
    if (customerAddress.trim()) message += `*বিস্তারিত ঠিকানা:* ${customerAddress.trim()}\n`;
    message += `---------------------------\n`;
    
    cart.forEach(item => {
      message += `${item.qty}x ${item.name} - ৳${item.price * item.qty}\n`;
    });
    
    message += `---------------------------\n`;
    message += `*সাবটোটাল:* ৳${cartSubtotal}\n`;
    message += `*ডেলিভারি চার্জ:* ${effectiveDeliveryFee === 0 ? 'ফ্রি' : `৳${effectiveDeliveryFee}`}\n`;
    message += `*সর্বমোট বিল: ৳${totalAmount}*\n`;
    
    if (orderNotes.trim()) message += `\n*নোটস:* \n${orderNotes.trim()}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setIsCheckingOut(false);
    }, 1000);
  };

  const filteredMenu = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = activeCategory === 'সব খাবার' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#C84B31] selection:text-white pb-24 relative overflow-hidden">
      
      {/* --- LIVE ANNOUNCEMENT BANNER --- */}
      <div className="bg-[#4A2511] text-white/90 text-[11px] sm:text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={12} className="text-[#EDBB42]" /> 
        টাটকা ও স্বাস্থ্যকর ফ্রোজেন ফুড এবং লাঞ্চ থালীর জন্য আজই অর্ডার করুন!
        <Sparkles size={12} className="text-[#EDBB42]" />
      </div>

      {/* --- TOAST NOTIFICATION --- */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="bg-[#1A1A1A] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-medium border border-gray-700 backdrop-blur-md bg-opacity-90 whitespace-nowrap">
          <CheckCircle2 size={18} className="text-[#25D366]" />
          {toastMessage}
        </div>
      </div>

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-lg border-b border-[#E8E1D5] transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C84B31] to-[#A03018] text-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:rotate-12">
              <UtensilsCrossed size={18} />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#4A2511]">
              শখের হাঁড়ি
            </h1>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#4A2511] hover:bg-[#E8E1D5] rounded-full transition-all duration-200 active:scale-90"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#C84B31] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FDFBF7] shadow-sm animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-8 sm:pt-20 sm:pb-12 text-center relative">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#C84B31]/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#EDBB42]/10 rounded-full blur-3xl -z-10"></div>

        {/* ENTREPRENEUR BADGE (Top 1% Aesthetic) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50/80 border border-orange-100 text-[#C84B31] text-xs sm:text-sm font-bold tracking-wide mb-6 shadow-sm backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <ChefHat size={16} />
          উদ্যোক্তা: নুসরাত জাহান
        </div>

        {/* Dynamic Time Greeting */}
        <p className="text-[#C84B31] font-bold tracking-wider mb-2 text-sm sm:text-base flex items-center justify-center gap-2">
           {greeting}!
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#4A2511] mb-5 leading-tight">
          ভালোবাসায় তৈরি, <br className="sm:hidden" /> পরম যত্নে পরিবেশিত।
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-base sm:text-lg lg:text-xl font-medium px-2">
          ঘরোয়া পরিবেশে তৈরি স্বাস্থ্যসম্মত থালী, ফ্রোজেন ফুড এবং সুস্বাদু স্ন্যাকস।
        </p>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400 group-focus-within:text-[#C84B31] transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3.5 sm:py-4 border border-[#E8E1D5] rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C84B31]/30 focus:border-[#C84B31] transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
            placeholder="থালী, সমুচা, বিরিয়ানি খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* --- AI GEMINI RECOMMENDER SECTION ✨ --- */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
        <div className="bg-gradient-to-br from-orange-50 to-rose-50 rounded-3xl p-5 sm:p-8 border border-orange-100 shadow-sm relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 text-orange-300 opacity-50" size={48} />
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-bold text-[#4A2511] flex items-center gap-2 mb-2">
              <Sparkles className="text-[#C84B31]" size={20} /> কী খাবেন বুঝতে পারছেন না?
            </h3>
            <p className="text-gray-600 mb-5 text-sm sm:text-base">
              আপনার মুড বা কী খেতে ইচ্ছে করছে তা লিখুন, আমাদের AI আপনাকে সেরা খাবারটি সাজেস্ট করবে!
            </p>

            <form onSubmit={handleAiSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="যেমন: অফিসের জন্য লাঞ্চ থালী..." 
                className="flex-1 px-4 py-3 text-sm sm:text-base rounded-xl border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 bg-white/80 backdrop-blur-sm"
                required
              />
              <button 
                type="submit" 
                disabled={isAiLoading || !aiPrompt.trim()}
                className="bg-[#C84B31] hover:bg-[#A03018] text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-md shadow-[#C84B31]/20 whitespace-nowrap text-sm sm:text-base"
              >
                {isAiLoading ? <Loader2 className="animate-spin" size={20} /> : <><Sparkles size={18} /> ম্যাজিক দেখুন</>}
              </button>
            </form>

            {aiResponse && (
              <div className="mt-5 p-4 bg-white rounded-xl border border-orange-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                <p className="text-[#4A2511] text-sm sm:text-base font-medium leading-relaxed">
                  <span className="font-bold text-[#C84B31]">Shokher AI ✨ :</span> {aiResponse}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- MENU SECTION --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[#4A2511] text-white shadow-lg shadow-[#4A2511]/20 scale-105' 
                  : 'bg-white border border-[#E8E1D5] text-gray-600 hover:border-[#C84B31] hover:text-[#C84B31] hover:bg-orange-50/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-[#E8E1D5]">
            <UtensilsCrossed size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium text-base sm:text-lg">দুঃখিত, কোনো খাবার পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredMenu.map(item => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col transform hover:-translate-y-1">
                
                <div className="h-48 sm:h-56 bg-[#E8E1D5] relative overflow-hidden group/img">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-70 group-hover/img:opacity-50 transition-opacity duration-500 pointer-events-none"></div>
                  <PremiumImage src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110" />
                  
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md backdrop-blur-md ${tag === 'Best Seller' ? 'bg-[#EDBB42]/90 text-[#4A2511]' : tag === 'Ready to Fry' ? 'bg-[#25D366]/90 text-white' : tag === 'Special' ? 'bg-[#C84B31]/90 text-white' : 'bg-white/80 text-[#4A2511]'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-lg border border-white/20 text-[#C84B31] font-bold text-sm sm:text-lg">
                    ৳{item.price}
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white z-20">
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4A2511] leading-tight mb-2 group-hover:text-[#C84B31] transition-colors">{item.name}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">{item.description}</p>
                    
                    <button 
                      onClick={() => openHeritageModal(item)}
                      className="text-[#C84B31] text-[11px] sm:text-xs font-bold flex items-center gap-1.5 mb-5 hover:text-[#4A2511] active:scale-95 transition-all w-fit"
                    >
                      <Sparkles size={14} /> এআই ইনসাইট ✨
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full py-3 sm:py-3.5 rounded-2xl border-2 border-[#C84B31] text-[#C84B31] text-sm sm:text-base font-bold hover:bg-[#C84B31] hover:text-white transition-all duration-300 active:scale-[0.97] flex justify-center items-center gap-2 group/btn"
                  >
                    <Plus size={18} className="group-hover/btn:rotate-90 transition-transform duration-300" /> কার্টে যোগ করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- FLOATING CART BUTTON (Mobile) --- */}
      {totalItems > 0 && !isCartOpen && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-30 px-4 sm:hidden pointer-events-none animate-in slide-in-from-bottom-10 duration-500">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="pointer-events-auto w-full max-w-sm bg-gradient-to-r from-[#4A2511] to-[#6b3519] text-white rounded-full py-4 px-6 shadow-2xl flex items-center justify-between font-bold active:scale-95 transition-transform border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-3.5 py-1.5 rounded-full text-sm backdrop-blur-md">{totalItems}</div>
              <span className="text-sm">অর্ডার দেখুন</span>
            </div>
            <span className="text-base">৳{totalAmount}</span>
          </button>
        </div>
      )}

      {/* --- CART DRAWER OVERLAY --- */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsCartOpen(false)} />
        
        <div className={`relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col transition-transform duration-500 ease-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E8E1D5] bg-white/80 backdrop-blur-lg sticky top-0 z-10">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#4A2511] flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#C84B31]" /> আপনার অর্ডার
            </h2>
            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-[11px] sm:text-xs font-bold text-gray-400 hover:text-red-500 px-2 py-1 rounded">খালি করুন</button>
              )}
              <button onClick={() => setIsCartOpen(false)} className="p-2 text-gray-400 hover:text-[#C84B31] hover:bg-orange-50 rounded-full transition-all duration-200 active:scale-90">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar pb-40">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60 space-y-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-50 rounded-full flex items-center justify-center mb-2">
                  <UtensilsCrossed size={40} className="text-[#C84B31]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#4A2511]">হাঁড়ি একদম ফাঁকা!</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-[250px]">মজাদার সব খাবার দিয়ে আপনার হাঁড়ি পূর্ণ করুন।</p>
              </div>
            ) : (
              <div className="space-y-5 sm:space-y-6">
                
                {/* Free Delivery Gamification Progress Bar */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-3 sm:p-4 rounded-2xl border border-orange-200 shadow-sm">
                  <div className="flex justify-between text-[11px] sm:text-xs font-bold mb-2">
                    <span className="text-[#4A2511] flex items-center gap-1"><Truck size={14} className="text-[#C84B31]"/> ফ্রি ডেলিভারি টার্গেট</span>
                    <span className="text-[#C84B31]">৳{FREE_DELIVERY_THRESHOLD}</span>
                  </div>
                  <div className="w-full bg-orange-200/50 rounded-full h-2 mb-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#EDBB42] to-[#C84B31] h-2 rounded-full transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-600 font-medium text-center">
                    {isFreeDeliveryEligible 
                      ? <span className="text-green-600 flex items-center justify-center gap-1"><CheckCircle2 size={12}/> অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন।</span> 
                      : `আর মাত্র ৳${FREE_DELIVERY_THRESHOLD - cartSubtotal} টাকার খাবার যোগ করলেই ফ্রি ডেলিভারি!`}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 sm:gap-4 bg-white p-2.5 sm:p-3 rounded-2xl border border-[#E8E1D5] shadow-sm animate-in slide-in-from-right-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-[#E8E1D5]">
                        <PremiumImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 py-1">
                        <h4 className="font-bold text-[#4A2511] text-xs sm:text-sm truncate mb-1">{item.name}</h4>
                        <p className="text-[#C84B31] font-bold text-xs sm:text-sm">৳{item.price}</p>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-[#FDFBF7] border border-[#E8E1D5] rounded-xl p-1 shadow-inner">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                        <span className="text-xs sm:text-sm font-bold w-4 sm:w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Form & Smart Calculator */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E8E1D5] shadow-sm space-y-4 sm:space-y-5">
                  <h3 className="font-bold text-[#4A2511] text-sm sm:text-base flex items-center gap-2 border-b border-gray-100 pb-2">
                    <Info size={16} className="text-[#C84B31]" /> ডেলিভারি তথ্য
                  </h3>
                  
                  {/* Smart Time Selector */}
                  <div className="relative">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5"><Clock size={12}/> কখন ডেলিভারি চান?</label>
                    <div className="relative">
                      <select 
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 sm:py-3 border border-[#E8E1D5] rounded-xl bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 text-[#4A2511]"
                      >
                        {DELIVERY_TIMES.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* Smart Zone Selector */}
                  <div className="relative">
                    <label className="text-[11px] sm:text-xs font-bold text-gray-500 mb-1.5 flex items-center gap-1.5"><MapPin size={12}/> ডেলিভারি এলাকা নির্বাচন করুন</label>
                    <div className="relative">
                      <select 
                        value={selectedZone.name}
                        onChange={(e) => setSelectedZone(DELIVERY_ZONES.find(z => z.name === e.target.value))}
                        className="w-full appearance-none px-4 py-2.5 sm:py-3 border border-orange-200 rounded-xl bg-orange-50/30 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 text-[#4A2511]"
                      >
                        {DELIVERY_ZONES.map(zone => (
                          <option key={zone.name} value={zone.name}>{zone.name} {zone.fee > 0 ? `(৳${zone.fee})` : ''}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <input type="text" id="name" placeholder=" " value={customerName} onChange={e => setCustomerName(e.target.value)} className="block text-sm sm:text-base w-full px-4 pt-5 pb-2 border border-[#E8E1D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 bg-transparent peer" />
                    <label htmlFor="name" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#C84B31] pointer-events-none bg-white px-1 text-xs sm:text-sm">আপনার নাম *</label>
                  </div>

                  <div className="relative">
                    <textarea id="address" placeholder=" " value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} className="block text-sm sm:text-base w-full px-4 pt-5 pb-2 border border-[#E8E1D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 bg-transparent peer resize-none h-16" />
                    <label htmlFor="address" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#C84B31] pointer-events-none bg-white px-1 text-xs sm:text-sm">বিস্তারিত ঠিকানা</label>
                  </div>

                  {/* Special Notes & Quick Tags */}
                  <div className="relative">
                    <textarea id="notes" placeholder=" " value={orderNotes} onChange={e => setOrderNotes(e.target.value)} className="block text-sm sm:text-base w-full px-4 pt-5 pb-2 border border-[#E8E1D5] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 bg-transparent peer resize-none h-20" />
                    <label htmlFor="notes" className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#C84B31] pointer-events-none bg-white px-1 text-xs sm:text-sm">বিশেষ নির্দেশনা / নোট</label>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {QUICK_TAGS.map(tag => (
                        <button key={tag} onClick={() => handleQuickTag(tag)} className="text-[10px] sm:text-[11px] font-medium bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-full hover:border-[#C84B31] hover:text-[#C84B31] transition-colors flex items-center gap-1 active:scale-95">
                           {tag} <Plus size={10}/>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* AI Gift Message */}
                  <div className="pt-2">
                    {!showGiftUI ? (
                      <button onClick={() => setShowGiftUI(true)} className="text-xs sm:text-sm font-bold text-[#C84B31] flex items-center gap-1.5 hover:text-[#A03018] transition-colors bg-orange-50 px-3 py-2.5 rounded-xl border border-orange-100 w-full justify-center">
                        <Gift size={16} /> প্রিয়জনকে পাঠাচ্ছেন? AI শুভেচ্ছা লিখুন ✨
                      </button>
                    ) : (
                      <div className="bg-gradient-to-br from-orange-50 to-rose-50 p-3 sm:p-4 rounded-xl border border-orange-200 flex flex-col gap-2 sm:gap-3 animate-in fade-in slide-in-from-top-2 shadow-inner">
                        <label className="text-[11px] sm:text-xs font-bold text-[#4A2511]">কাকে পাঠাচ্ছেন এবং উপলক্ষ্য কী?</label>
                        <input type="text" placeholder="যেমন: মায়ের জন্মদিনে সারপ্রাইজ..." value={giftPrompt} onChange={e => setGiftPrompt(e.target.value)} className="w-full text-xs sm:text-sm p-2.5 sm:p-3 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-[#C84B31]/40 bg-white" />
                        <div className="flex justify-end gap-2 mt-1">
                          <button onClick={() => setShowGiftUI(false)} className="text-[11px] sm:text-xs font-bold text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2">বাতিল</button>
                          <button onClick={handleGiftMessageGenerate} disabled={isGiftGenerating || !giftPrompt.trim()} className="bg-[#C84B31] text-white text-[11px] sm:text-xs font-bold px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1.5 disabled:opacity-50 shadow-md">
                            {isGiftGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12}/>} {isGiftGenerating ? 'লিখছে...' : 'ম্যাজিক দেখুন'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer (Sticky Bottom) */}
          {cart.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-white border-t border-[#E8E1D5] shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.1)] rounded-t-3xl z-20">
              
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 font-medium">
                  <span>সাবটোটাল</span>
                  <span>৳{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 font-medium pb-1.5 sm:pb-2 border-b border-gray-100">
                  <span>ডেলিভারি চার্জ</span>
                  <span>
                    {selectedZone.name === 'এলাকা নির্বাচন করুন' ? '৳0' : 
                     effectiveDeliveryFee === 0 ? <span className="text-green-600 font-bold">ফ্রি! <span className="line-through text-gray-400 font-normal text-[10px] sm:text-xs">৳{selectedZone.fee}</span></span> : 
                     `৳${effectiveDeliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-1">
                  <span className="font-bold text-gray-600 text-sm sm:text-base">সর্বমোট বিল</span>
                  <span className="font-serif font-bold text-2xl sm:text-3xl text-[#C84B31] leading-none">৳{totalAmount}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg active:scale-[0.98] ${
                  isCheckingOut ? 'bg-gray-400 cursor-not-allowed text-white shadow-none' : 'bg-gradient-to-r from-[#25D366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1da851] text-white shadow-[#25D366]/30'
                }`}
              >
                {isCheckingOut ? <span className="animate-pulse">প্রসেসিং হচ্ছে...</span> : <><MessageCircle size={20} /> হোয়াটসঅ্যাপে অর্ডার করুন</>}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- AI HERITAGE MODAL --- */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${heritageModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm" onClick={() => setHeritageModalOpen(false)} />
        <div className={`relative w-full max-w-sm bg-[#FDFBF7] rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 transform ${heritageModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
          <div className="h-40 sm:h-44 relative">
            {activeDish && <PremiumImage src={activeDish.image} alt={activeDish.name} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/20 to-transparent"></div>
            <button onClick={() => setHeritageModalOpen(false)} className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-[#4A2511] hover:bg-red-50 hover:text-red-500 shadow-sm transition-colors"><X size={16} /></button>
          </div>
          
          <div className="px-5 sm:px-6 pb-6 sm:pb-8 pt-2 text-center relative">
            <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-[#FDFBF7]">
              <Sparkles className="text-[#C84B31]" size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#4A2511] mt-4 sm:mt-5 mb-1">{activeDish?.name}</h3>
            <p className="text-[#C84B31] text-[10px] sm:text-xs font-bold tracking-wider mb-4 sm:mb-5 uppercase">AI Culinary Insights ✨</p>
            <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-4 sm:p-5 min-h-[100px] sm:min-h-[120px] flex items-center justify-center shadow-inner relative">
              {isHeritageLoading ? (
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-gray-500"><Loader2 className="animate-spin text-[#C84B31]" size={24} /><span className="text-xs sm:text-sm font-medium animate-pulse">খুঁজে বের করা হচ্ছে...</span></div>
              ) : (
                <p className="text-[#4A2511] leading-relaxed text-xs sm:text-sm italic font-medium">"{heritageText}"</p>
              )}
            </div>
            <button onClick={() => { addToCart(activeDish); setHeritageModalOpen(false); }} className="mt-5 sm:mt-6 w-full bg-gradient-to-r from-[#4A2511] to-[#6b3519] hover:from-[#31180b] hover:to-[#4A2511] text-white py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2">
              <Plus size={16} /> হাঁড়িতে যোগ করুন (৳{activeDish?.price})
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}