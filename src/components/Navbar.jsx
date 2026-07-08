import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Globe, ShoppingBag, CalendarDays, Search,
  ChevronDown, Menu, X, Image as ImageIcon,
  MessageSquare, Phone
} from 'lucide-react';

const languages = [
  { code: 'EN', name: 'English',  flag: '🇬🇧' },
  { code: 'BN', name: 'বাংলা',   flag: '🇧🇩' },
  { code: 'AR', name: 'العربية', flag: '🇸🇦' },
  { code: 'HI', name: 'हिन्दी',  flag: '🇮🇳' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'FR', name: 'Français',flag: '🇫🇷' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ZH', name: '中文',    flag: '🇨🇳' },
  { code: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'TR', name: 'Türkçe', flag: '🇹🇷' },
];

const menuLinks = [
  { key: 'home',         path: '/' },
  { key: 'services',     path: '/services' },
  { key: 'before_after', path: '/before-after', icon: <ImageIcon size={16} /> },
  { key: 'pricing',      path: '/pricing' },
  { key: 'blog',         path: '/blog' },
  { key: 'testimonials', path: '/testimonials', icon: <MessageSquare size={16} /> },
];

const CLINIC_PHONE = '01616484616';

const Navbar = ({ scrolled, setLang }) => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [treatmentOpen, setTreatmentOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = languages.find(l => l.code === i18n.language.toUpperCase()) || languages[0];

  const changeLanguage = (code) => {
    const lowerCode = code.toLowerCase();
    i18n.changeLanguage(lowerCode);
    if (setLang) setLang(lowerCode);
    document.body.dir = code === 'AR' ? 'rtl' : 'ltr';
    setIsSidebarOpen(false);
    setLangOpen(false);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.lang-dropdown')) setLangOpen(false);
      if (!e.target.closest('.treatment-dropdown')) setTreatmentOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTreatmentOpen(false);
  };

  return (
    <>
      {/* ────────────── TOP BAR (phone strip) ────────────── */}
      <div className={`fixed w-full z-[101] top-0 bg-[#0F172A] text-white text-[10px] py-1.5 px-4 flex justify-center items-center gap-2 tracking-widest transition-all duration-500 ${scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <Phone size={12} className="text-[#22D3EE]" />
        <a href={`tel:${CLINIC_PHONE}`} className="font-bold hover:text-[#22D3EE] transition-colors">{CLINIC_PHONE}</a>
        <span className="text-white/30 hidden sm:inline">|</span>
        <span className="hidden sm:inline uppercase font-semibold text-white/70">S.T Laser Dental &amp; Skin Care</span>
      </div>

      {/* ────────────── NAVBAR ────────────── */}
      <nav className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled ? 'top-0 bg-white/95 backdrop-blur-md shadow-lg py-2' : 'top-7 bg-white py-3'
      }`}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group outline-none flex-shrink-0">
            <div className="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-[#0891B2] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-black text-base md:text-xl shadow-md transition-transform group-hover:rotate-[360deg] duration-1000">
              ST
            </div>
            <div className="flex flex-col border-l-2 border-gray-100 pl-2 sm:pl-3">
              <span className="font-black text-base md:text-2xl tracking-tighter text-[#0F172A] uppercase leading-none">
                S.T <span className="text-[#0891B2]">LASER</span>
              </span>
              <span className="text-[6px] md:text-[9px] font-black text-gray-400 uppercase tracking-[2px] mt-1 italic hidden sm:block">
                Dental &amp; Skin Care
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-8 text-[#0F172A] font-bold uppercase text-[11px] tracking-widest">
            {menuLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 transition-all duration-300 flex items-center gap-1 ${
                    isActive ? 'text-[#0891B2]' : 'text-[#0F172A] hover:text-[#0891B2]'
                  }`
                }
              >
                {t(link.key) || link.key.replace('_', ' ')}
              </NavLink>
            ))}

            {/* Treatment Dropdown */}
            <div className="treatment-dropdown group relative cursor-pointer flex items-center gap-1 hover:text-[#0891B2] transition-colors py-2">
              {t('treatment')} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white shadow-2xl border-t-4 border-[#0891B2] py-4 rounded-b-2xl z-[110]">
                <NavLink to="/dental-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#0891B2] text-[10px] font-black transition-all border-b border-gray-50">{t('dental')}</NavLink>
                <NavLink to="/skin-care" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#0891B2] text-[10px] font-black transition-all border-b border-gray-50">{t('skin')}</NavLink>
                <NavLink to="/maxillofacial" className="block px-6 py-2.5 hover:bg-gray-50 hover:text-[#0891B2] text-[10px] font-black transition-all">Maxillofacial Surgery</NavLink>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-4 text-gray-400 border-r border-gray-100 pr-4">
              <Search size={18} className="cursor-pointer hover:text-[#0891B2] transition-colors" />
              <div className="relative cursor-pointer group">
                <ShoppingBag size={18} className="group-hover:text-[#0891B2] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-[#0F172A] text-[#22D3EE] text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black">0</span>
              </div>
            </div>

            {/* Language Selector — Desktop */}
            <div className="lang-dropdown hidden lg:block relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full text-[10px] font-black border border-gray-200 hover:border-[#0891B2] transition-all"
              >
                <span className="text-base leading-none">{currentLang.flag}</span>
                <span className="uppercase">{currentLang.code}</span>
                <ChevronDown size={12} className={`text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 w-44 bg-white shadow-xl border-t-2 border-[#0891B2] mt-1 rounded-lg max-h-64 overflow-y-auto z-[120]">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => changeLanguage(l.code)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-2.5 text-[11px] font-bold hover:bg-gray-50 transition-colors ${
                        i18n.language.toUpperCase() === l.code ? 'text-[#0891B2]' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Appointment Button — Desktop */}
            <Link
              to="/appointment"
              className="hidden sm:flex bg-[#0F172A] text-[#22D3EE] px-4 lg:px-6 py-2.5 lg:py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-gradient-to-r hover:from-[#0891B2] hover:to-[#06B6D4] hover:text-white shadow-xl transition-all items-center gap-2 border border-[#0891B2]/20 whitespace-nowrap"
            >
              <CalendarDays size={14} /> {t('book_now') || 'Book Now'}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="xl:hidden p-2 text-[#0F172A] hover:text-[#0891B2] transition-colors flex-shrink-0"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </nav>

      {/* ────────────── MOBILE SIDEBAR ────────────── */}

      <div
        className={`fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[150] shadow-2xl flex flex-col transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0891B2] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-black text-sm">ST</div>
            <span className="font-black text-base text-[#0F172A] uppercase">S.T <span className="text-[#0891B2]">LASER</span></span>
          </div>
          <button onClick={closeSidebar} className="p-2 hover:text-[#0891B2] transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 flex flex-col gap-2">

          {/* Call & Appointment Buttons — TOP */}
          <a
            href={`tel:${CLINIC_PHONE}`}
            className="w-full bg-gray-50 border border-gray-200 text-[#0F172A] py-3 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:border-[#0891B2] hover:text-[#0891B2] transition-all mb-2"
          >
            <Phone size={16} /> {CLINIC_PHONE}
          </a>
          <Link
            to="/appointment"
            onClick={closeSidebar}
            className="w-full bg-[#0F172A] text-[#22D3EE] py-4 rounded-2xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-gradient-to-r hover:from-[#0891B2] hover:to-[#06B6D4] hover:text-white transition-all mb-2 border border-[#0891B2]/30"
          >
            <CalendarDays size={18} /> {t('book_now') || 'Book Now'}
          </Link>

          {/* Nav Links */}
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-2 mb-1">Menu</p>
          {menuLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  isActive ? 'bg-[#0891B2]/10 text-[#0891B2]' : 'text-[#0F172A] hover:bg-gray-50 hover:text-[#0891B2]'
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
              className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl font-bold text-sm text-[#0F172A] hover:bg-gray-50 hover:text-[#0891B2] transition-all"
            >
              {t('treatment') || 'Treatment'}
              <ChevronDown size={16} className={`transition-transform ${treatmentOpen ? 'rotate-180' : ''}`} />
            </button>
            {treatmentOpen && (
              <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-[#0891B2]/30 pl-4">
                <NavLink to="/dental-care" onClick={closeSidebar} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#0891B2] transition-colors">{t('dental') || 'Dental Care'}</NavLink>
                <NavLink to="/skin-care" onClick={closeSidebar} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#0891B2] transition-colors">{t('skin') || 'Skin Care'}</NavLink>
                <NavLink to="/maxillofacial" onClick={closeSidebar} className="py-2.5 text-sm font-bold text-gray-600 hover:text-[#0891B2] transition-colors">Maxillofacial Surgery</NavLink>
              </div>
            )}
          </div>

          <div className="h-[1px] bg-gray-100 my-3" />

          {/* Language Section */}
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[3px] px-2 mb-2">Language</p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => changeLanguage(l.code)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black border-2 transition-all ${
                  i18n.language.toUpperCase() === l.code
                    ? 'bg-gradient-to-r from-[#0891B2] to-[#06B6D4] border-[#0891B2] text-white'
                    : 'border-gray-200 text-gray-600 hover:border-[#0891B2] hover:text-[#0891B2]'
                }`}
              >
                <span className="text-base">{l.flag}</span>
                {l.name}
              </button>
            ))}
          </div>

          <div className="h-[1px] bg-gray-100 my-3" />

          {/* Mobile Search & Shop */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-xs font-black text-gray-600 hover:border-[#0891B2] hover:text-[#0891B2] transition-all">
              <Search size={15} /> Search
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-200 text-xs font-black text-gray-600 hover:border-[#0891B2] hover:text-[#0891B2] transition-all">
              <ShoppingBag size={15} /> Shop
            </button>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
