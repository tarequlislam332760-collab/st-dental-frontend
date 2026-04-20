import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Globe, ShoppingBag, CalendarDays, Search, 
  ChevronDown, Menu, X, Image as ImageIcon, 
  LayoutDashboard, Star, MessageSquare 
} from 'lucide-react';

const Navbar = ({ scrolled, setLang }) => { // এখানে setLang প্রপস হিসেবে নেওয়া হয়েছে
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'AR', name: 'العربية' },
    { code: 'TR', name: 'Türkçe' },
  ];

  const menuLinks = [
    { key: 'home', path: '/' },
    { key: 'services', path: '/services' },
    { key: 'before_after', path: '/before-after', icon: <ImageIcon size={16}/> },
    { key: 'pricing', path: '/pricing' },
    { key: 'blog', path: '/blog' },
    { key: 'testimonials', path: '/testimonials', icon: <MessageSquare size={16}/> },
  ];

  const changeLanguage = (code) => {
    const lowerCode = code.toLowerCase();
    i18n.changeLanguage(lowerCode);
    
    // মেইন ল্যাঙ্গুয়েজ স্টেট আপডেট করা (Home.jsx এর জন্য)
    if (setLang) {
      setLang(lowerCode);
    }
    
    document.body.dir = code === 'AR' ? 'rtl' : 'ltr';
    setIsSidebarOpen(false);
  };

  // স্ক্রল লক করার জন্য যখন সাইডবার ওপেন থাকে
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  return (
    <>
      <nav className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* ১. লোগো সেকশন */}
          <Link to="/" className="flex items-center gap-3 group outline-none z-[110]">
             <div className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-xl shadow-md transition-transform group-hover:rotate-[360deg] duration-1000">
               ST
             </div>
             <div className="flex flex-col border-l-2 border-gray-100 pl-3">
               <span className="font-black text-lg md:text-2xl tracking-tighter text-[#1a1a1a] uppercase leading-none">
                 S T <span className="text-[#D4AF37]">LESSER</span>
               </span>
               <span className="text-[7px] md:text-[9px] font-black text-gray-400 uppercase tracking-[2px] mt-1 italic">
                 Dental & Aesthetic Skin Care
               </span>
             </div>
          </Link>

          {/* ২. মেইন মেনু (Desktop) */}
          <div className="hidden xl:flex items-center gap-8 text-[#1a1a1a] font-bold uppercase text-[11px] tracking-widest">
            {menuLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path} 
                className={({ isActive }) => 
                  `relative py-2 transition-all duration-300 flex items-center gap-1 ${
                    isActive ? 'text-[#D4AF37]' : 'text-[#1a1a1a] hover:text-[#D4AF37]'
                  }`
                }
              >
                {t(link.key) || link.key.replace('_', ' ')}
              </NavLink>
            ))}

            {/* ট্রিটমেন্ট ড্রপডাউন */}
            <div className="group relative cursor-pointer flex items-center gap-1 hover:text-[#D4AF37] transition-colors py-2">
              {t('treatment')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-4 rounded-b-2xl animate-in fade-in slide-in-from-top-2">
                 <NavLink to="/dental-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all border-b border-gray-50">{t('dental')}</NavLink>
                 <NavLink to="/skin-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all border-b border-gray-50">{t('skin')}</NavLink>
                 <NavLink to="/maxillofacial" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all">Maxillofacial Surgery</NavLink>
              </div>
            </div>
          </div>

          {/* ৩. রাইট আইকন এবং বাটন */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-5 text-gray-400 border-r border-gray-100 pr-5">
               <Search size={18} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
               <div className="relative cursor-pointer group">
                  <ShoppingBag size={18} className="group-hover:text-[#D4AF37] transition-colors" />
                  <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">0</span>
               </div>
            </div>

            {/* ল্যাঙ্গুয়েজ (Desktop) */}
            <div className="hidden lg:block group relative">
              <button className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full text-[10px] font-black border border-gray-200 hover:border-[#D4AF37] transition-all">
                <Globe size={14} className="text-[#D4AF37]" />
                <span className="uppercase">{i18n.language}</span>
              </button>
              <div className="absolute top-full right-0 hidden group-hover:block w-36 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-2 mt-1 rounded-xl z-[120]">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-gray-50 transition-colors uppercase"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
            
            <Link 
              to="/appointment" 
              className="hidden sm:flex bg-black text-[#D4AF37] px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black shadow-xl transition-all items-center gap-2 border border-[#D4AF37]/20"
            >
               <CalendarDays size={16}/> {t('book_now') || 'Book Now'}
            </Link>

            {/* মোবাইল মেনু বাটন */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="xl:hidden p-2 text-black hover:text-[#D4AF37] transition-colors z-[120]"
            >
              {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 📱 ৪. মোবাইল সাইডবার */}
      <div className={`fixed inset-0 z-[90] transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} p-8 flex flex-col`}>
          <div className="mt-20 flex flex-col gap-6">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] border-b border-gray-100 pb-2">Main Menu</h3>
            {menuLinks.map((link) => (
              <NavLink 
                key={link.path}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className="text-lg font-black text-[#1a1a1a] hover:text-[#D4AF37] transition-colors flex items-center gap-3"
              >
                {link.icon} {t(link.key) || link.key.replace('_', ' ')}
              </NavLink>
            ))}
            
            <div className="h-[1px] bg-gray-100 my-4"></div>
            
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[4px] border-b border-gray-100 pb-2">Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((langItem) => (
                <button 
                  key={langItem.code}
                  onClick={() => changeLanguage(langItem.code)}
                  className={`text-[10px] font-black p-2 rounded-lg border ${i18n.language.toUpperCase() === langItem.code ? 'bg-[#D4AF37] border-[#D4AF37] text-white' : 'border-gray-100 text-gray-600'}`}
                >
                  {langItem.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
             <Link 
                to="/appointment"
                onClick={() => setIsSidebarOpen(false)}
                className="w-full bg-black text-[#D4AF37] py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest"
             >
                <CalendarDays size={18}/> {t('book_now') || 'Book Now'}
             </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;