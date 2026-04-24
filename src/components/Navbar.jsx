import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Globe, ShoppingBag, CalendarDays, Search, 
  ChevronDown, Menu, X, Image as ImageIcon, 
  LayoutDashboard, Star, MessageSquare 
} from 'lucide-react';

const Navbar = ({ scrolled, setLang }) => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

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
    if (setLang) setLang(lowerCode);
    document.body.dir = code === 'AR' ? 'rtl' : 'ltr';
    setIsSidebarOpen(false);
    setLangOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'unset';
  }, [isSidebarOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.lang-dropdown')) setLangOpen(false);
      if (!e.target.closest('.treatment-dropdown')) setTreatmentOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-[100] top-0 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-3'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group outline-none z-[110] flex-shrink-0">
            <div className="w-9 h-9 md:w-12 md:h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-base md:text-xl shadow-md transition-transform group-hover:rotate-[360deg] duration-1000">
              ST
            </div>
            <div className="flex flex-col border-l-2 border-gray-100 pl-2 sm:pl-3">
              <span className="font-black text-base md:text-2xl tracking-tighter text-[#1a1a1a] uppercase leading-none">
                S T <span className="text-[#D4AF37]">LESSER</span>
              </span>
              <span className="text-[6px] md:text-[9px] font-black text-gray-400 uppercase tracking-[2px] mt-1 italic hidden sm:block">
                Dental & Aesthetic Skin Care
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
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

            {/* Treatment Dropdown */}
            <div className="treatment-dropdown group relative cursor-pointer flex items-center gap-1 hover:text-[#D4AF37] transition-colors py-2">
              {t('treatment')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-4 rounded-b-2xl animate-in fade-in slide-in-from-top-2">
                <NavLink to="/dental-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all border-b border-gray-50">{t('dental')}</NavLink>
                <NavLink to="/skin-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all border-b border-gray-50">{t('skin')}</NavLink>
                <NavLink to="/maxillofacial" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#D4AF37] text-[10px] font-black transition-all">Maxillofacial Surgery</NavLink>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4 text-gray-400 border-r border-gray-100 pr-4">
              <Search size={18} className="cursor-pointer hover:text-[#D4AF37] transition-colors" />
              <div className="relative cursor-pointer group">
                <ShoppingBag size={18} className="group-hover:text-[#D4AF37] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-black text-[#D4AF37] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">0</span>
              </div>
            </div>

            {/* Language Selector - Desktop */}
            <div className="lang-dropdown hidden lg:block relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full text-[10px] font-black border border-gray-200 hover:border-[#D4AF37] transition-all"
              >
                <Globe size={14} className="text-[#D4AF37]" />
                <span className="uppercase">{i18n.language}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 w-36 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-2 mt-1 rounded-xl z-[120]">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-[11px] font-bold hover:bg-gray-50 transition-colors uppercase ${i18n.language.toUpperCase() === lang.code ? 'text-[#D4AF37]' : ''}`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Appointment Button - Desktop */}
            <Link
              to="/appointment"
              className="hidden sm:flex bg-black text-[#D4AF37] px-4 lg:px-6 py-2.5 lg:py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black shadow-xl transition-all items-center gap-2 border border-[#D4AF37]/20 whitespace-nowrap"
            >
              <CalendarDays size={14} /> {t('book_now') || 'Book Now'}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="xl:hidden p-2 text-black hover:text-[#D4AF37] transition-colors z-[120] flex-shrink-0"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[90] transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>

        {/* Sidebar Panel */}
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col overflow-y-auto`}>
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-black text-sm">ST</div>
              <span className="font-black text-base text-[#1a1a1a] uppercase">ST <span className="text-[#D4AF37]">LESSER</span></span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:text-[#D4AF37] transition-colors">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-2">

            {/* Book Appointment Button - TOP */}
            <Link
              to="/appointment"
              onClick={() => setIsSidebarOpen(false)}
              className="w-full bg-black text-[#D4AF37] py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all mb-4"
            >
              <CalendarDays size={18} /> {t('book_now') || 'Book Now'}
            </Link>

            {/* Nav Links */}
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-2 mb-1">Menu</p>
            {menuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                    isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-[#1a1a1a] hover:bg-gray-50 hover:text-[#D4AF37]'
                  }`
                }
              >
                {link.icon} {t(link.key) || link.key.replace('_', ' ')}
              </NavLink>
            ))}

            {/* Treatment Submenu */}
            <div>
              <button
                onClick={() => setTreatmentOpen(!treatmentOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm text-[#1a1a1a] hover:bg-gray-50 hover:text-[#D4AF37] transition-all"
              >
                {t('treatment') || 'Treatment'}
                <ChevronDown size={16} className={`transition-transform ${treatmentOpen ? 'rotate-180' : ''}`} />
              </button>
              {treatmentOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-[#D4AF37]/30 pl-4">
                  <NavLink to="/dental-care" onClick={() => setIsSidebarOpen(false)} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#D4AF37] transition-colors">{t('dental') || 'Dental Care'}</NavLink>
                  <NavLink to="/skin-care" onClick={() => setIsSidebarOpen(false)} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#D4AF37] transition-colors">{t('skin') || 'Skin Care'}</NavLink>
                  <NavLink to="/maxillofacial" onClick={() => setIsSidebarOpen(false)} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#D4AF37] transition-colors">Maxillofacial Surgery</NavLink>
                </div>
              )}
            </div>

            <div className="h-[1px] bg-gray-100 my-3"></div>

            {/* Language Section */}
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-2 mb-2">Language</p>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((langItem) => (
                <button
                  key={langItem.code}
                  onClick={() => changeLanguage(langItem.code)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black border-2 transition-all ${
                    i18n.language.toUpperCase() === langItem.code
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                      : 'border-gray-200 text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  <Globe size={13} />
                  {langItem.name}
                </button>
              ))}
            </div>

            {/* Mobile Search & Shop */}
            <div className="h-[1px] bg-gray-100 my-3"></div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-xs font-black text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <Search size={15} /> Search
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-xs font-black text-gray-600 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <ShoppingBag size={15} /> Shop
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;