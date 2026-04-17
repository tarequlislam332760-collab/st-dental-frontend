import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, User, ShoppingBag, CalendarDays, Search, ChevronDown } from 'lucide-react';

const Navbar = ({ scrolled }) => {
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'BN', name: 'বাংলা' },
    { code: 'AR', name: 'العربية' },
    { code: 'HI', name: 'हिन्दी' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ZH', name: '中文' },
    { code: 'RU', name: 'Русский' },
    { code: 'TR', name: 'Türkçe' },
  ];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    document.body.dir = code === 'AR' ? 'rtl' : 'ltr';
  };

  return (
    <nav className={`fixed w-full z-[100] top-0 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex justify-between items-center font-sans">
        
        {/* লোগো সেকশন */}
        <Link to="/" className="flex items-center gap-3 group outline-none">
           <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-xl shadow-md transition-transform group-hover:rotate-[360deg] duration-700">
             ST
           </div>
           <div className="flex flex-col border-l-2 border-gray-100 pl-3">
             <span className="font-black text-xl lg:text-2xl tracking-tighter text-[#1a1a1a] uppercase leading-none">
               S T <span className="text-[#D4AF37]">LESSER</span>
             </span>
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-[2px] mt-1 italic">
               Dental & Aesthetic Skin Care
             </span>
           </div>
        </Link>

        {/* ডাইনামিক মেনু - Testimonials যুক্ত করা হয়েছে */}
        <div className="hidden xl:flex items-center gap-10 text-[#1a1a1a] font-bold uppercase text-[12px] tracking-widest">
          {[
            { key: 'home', path: '/' },
            { key: 'about', path: '/about' },
            { key: 'services', path: '/services' },
            { key: 'pricing', path: '/pricing' },
            { key: 'blog', path: '/blog' },
            { key: 'testimonials', path: '/testimonials' } // নতুন সেকশন
          ].map((link) => (
            <NavLink 
              key={link.path}
              to={link.path} 
              className={({ isActive }) => 
                `relative py-2 transition-all duration-300 ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#1a1a1a] hover:text-[#D4AF37]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(link.key)}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#D4AF37] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          {/* ট্রিটমেন্ট ড্রপডাউন */}
          <div className="group relative cursor-pointer flex items-center gap-1 hover:text-[#D4AF37] transition-colors">
            {t('treatment')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-4 rounded-b-xl animate-in fade-in slide-in-from-top-2">
               <NavLink to="/dental" className="block px-6 py-2 hover:bg-gray-50 hover:text-[#D4AF37]">{t('dental')}</NavLink>
               <NavLink to="/skin" className="block px-6 py-2 hover:bg-gray-50 hover:text-[#D4AF37]">{t('skin')}</NavLink>
            </div>
          </div>
        </div>

        {/* রাইট সেকশন: ল্যাঙ্গুয়েজ ড্রপডাউন এবং বাটন */}
        <div className="flex items-center gap-4 lg:gap-6">
          
          <div className="hidden md:flex items-center gap-5 text-gray-400">
             <Search size={18} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
             <div className="relative cursor-pointer group">
                <ShoppingBag size={18} className="group-hover:text-[#D4AF37] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">0</span>
             </div>
          </div>

          {/* ল্যাঙ্গুয়েজ ড্রপডাউন */}
          <div className="group relative">
            <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-[11px] font-black border border-gray-200 hover:border-[#D4AF37] transition-all outline-none">
              <Globe size={14} className="text-[#D4AF37]" />
              <span className="uppercase">{i18n.language}</span>
              <ChevronDown size={12} className="group-hover:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-full right-0 hidden group-hover:block w-40 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-2 mt-1 rounded-xl max-h-64 overflow-y-auto custom-scrollbar">
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`block w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-gray-50 transition-colors ${
                    i18n.language === lang.code ? 'text-[#D4AF37] bg-gray-50' : 'text-gray-700'
                  }`}
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
             <CalendarDays size={16}/> {t('book_now')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;