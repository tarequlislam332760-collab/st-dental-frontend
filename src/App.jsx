import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Blog from './pages/Blog';
import WhatsAppWidget from './components/WhatsAppWidget';
import Appointment from './pages/Appointment';
import Services from './sections/Services';
import About from './sections/About';
import Contact from './sections/Contact';
import DentalCare from './sections/DentalCare';
import SkinCare from './sections/SkinCare';
import Testimonials from './sections/Testimonials';
import TransformSlider from './components/TransformSlider.jsx';
import BeforeAfterSlider from './components/BeforeAfterSlider.jsx';
import AdminPanel from './admin/AdminPanel';
import Login from './admin/Login';
import ProtectedRoute from './admin/ProtectedRoute';

// ── Brand colors (logo-matched)
// Primary: #0891B2 (cyan-600)  Secondary: #0F172A (slate-900)  Accent: #06B6D4 (cyan-400)

const SafeIcon = ({ name, size = 20, className = '' }) => {
  const IC = Lucide[name] || Lucide.HelpCircle;
  return <IC size={size} className={className} />;
};

const translations = {
  bn: {
    home: 'হোম', services: 'সেবা', about: 'আমাদের সম্পর্কে', contact: 'যোগাযোগ',
    dental: 'ডেন্টাল কেয়ার', skin: 'স্কিন কেয়ার', treatment: 'চিকিৎসা',
    testimonials: 'রিভিউ', btn: 'সিরিয়াল নিন', blog: 'ব্লগ',
    transform: 'ট্রান্সফর্ম', beforeAfter: 'বিফোর-আফটার', call: 'কল করুন',
  },
  en: {
    home: 'Home', services: 'Services', about: 'About', contact: 'Contact',
    dental: 'Dental Care', skin: 'Skin Care', treatment: 'Treatment',
    testimonials: 'Testimonials', btn: 'Book Now', blog: 'Blog',
    transform: 'Transform', beforeAfter: 'Before & After', call: 'Call Now',
  },
  ar: { home: 'الرئيسية', services: 'خدمات', about: 'حول', contact: 'اتصال', dental: 'الأسنان', skin: 'البشرة', treatment: 'علاج', testimonials: 'شهادات', btn: 'احجز', blog: 'مدونة', transform: 'تحويل', beforeAfter: 'قبل وبعد', call: 'اتصل' },
  hi: { home: 'होम', services: 'सेवाएं', about: 'हमारे बारे में', contact: 'संपर्क', dental: 'दंत', skin: 'त्वचा', treatment: 'उपचार', testimonials: 'समीक्षा', btn: 'बुक करें', blog: 'ब्लॉग', transform: 'ट्रांसफॉर्म', beforeAfter: 'पहले-बाद', call: 'कॉल करें' },
  es: { home: 'Inicio', services: 'Servicios', about: 'Nosotros', contact: 'Contacto', dental: 'Dental', skin: 'Piel', treatment: 'Tratamiento', testimonials: 'Testimonios', btn: 'Reservar', blog: 'Blog', transform: 'Transformar', beforeAfter: 'Antes/Después', call: 'Llamar' },
  fr: { home: 'Accueil', services: 'Services', about: 'À propos', contact: 'Contact', dental: 'Dentaire', skin: 'Peau', treatment: 'Traitement', testimonials: 'Témoignages', btn: 'Réserver', blog: 'Blog', transform: 'Transformer', beforeAfter: 'Avant/Après', call: 'Appeler' },
  de: { home: 'Startseite', services: 'Dienste', about: 'Über uns', contact: 'Kontakt', dental: 'Zahnpflege', skin: 'Hautpflege', treatment: 'Behandlung', testimonials: 'Referenzen', btn: 'Buchen', blog: 'Blog', transform: 'Verwandeln', beforeAfter: 'Vorher/Nachher', call: 'Anrufen' },
  zh: { home: '首页', services: '服务', about: '关于', contact: '联系', dental: '牙科', skin: '皮肤', treatment: '治疗', testimonials: '评价', btn: '预订', blog: '博客', transform: '转型', beforeAfter: '前后', call: '打电话' },
  ru: { home: 'Главная', services: 'Услуги', about: 'О нас', contact: 'Контакт', dental: 'Зубы', skin: 'Кожа', treatment: 'Лечение', testimonials: 'Отзывы', btn: 'Забронировать', blog: 'Блог', transform: 'Трансформация', beforeAfter: 'До/После', call: 'Позвонить' },
  tr: { home: 'Anasayfa', services: 'Hizmetler', about: 'Hakkımızda', contact: 'İletişim', dental: 'Diş', skin: 'Cilt', treatment: 'Tedavi', testimonials: 'Yorumlar', btn: 'Randevu Al', blog: 'Blog', transform: 'Dönüşüm', beforeAfter: 'Önce/Sonra', call: 'Ara' },
};

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

// SVG tooth logo — matches clinic brand
const ToothLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="40" r="38" fill="#0891B2" stroke="#06B6D4" strokeWidth="2"/>
    <path d="M25 22c-4 0-8 4-8 10 0 4 1 8 3 10l4 18h4l3-12 3 12h4l4-18c2-2 3-6 3-10 0-6-4-10-8-10-2 0-4 1-5 3-1-2-3-3-7-3z" fill="white" opacity="0.95"/>
    <path d="M33 22c1 2 2 4 2 6s-1 4-2 6" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const AppContent = () => {
  const [lang, setLang] = useState('bn');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatOpen, setTreatOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileTreatOpen, setMobileTreatOpen] = useState(false);
  const treatRef = useRef(null);
  const langRef = useRef(null);

  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/st-admin-secure');
  const t = translations[lang] || translations.en;
  const curLang = languages.find(l => l.code === lang) || languages[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    return () => window.removeEventListener('scroll', onScroll);
  }, [lang]);

  useEffect(() => {
    const handler = (e) => {
      if (treatRef.current && !treatRef.current.contains(e.target)) setTreatOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => { setMenuOpen(false); setMobileTreatOpen(false); };

  const navLinks = [
    { label: t.home, path: '/' },
    { label: t.services, path: '/services' },
    { label: t.blog, path: '/blog' },
    { label: t.about, path: '/about' },
    { label: t.contact, path: '/contact' },
    { label: t.testimonials, path: '/testimonials' },
  ];

  const treatLinks = [
    { label: t.dental, path: '/dental-care' },
    { label: t.skin, path: '/skin-care' },
    { label: t.transform, path: '/transform' },
    { label: t.beforeAfter, path: '/before-after' },
  ];

  return (
    <div className="min-h-screen bg-[#0a1628] text-white font-sans overflow-x-hidden">

      {/* ── NAVBAR ── */}
      {!isAdmin && (
        <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0a1628]/95 backdrop-blur-xl border-b border-cyan-500/10 py-2 shadow-lg shadow-cyan-900/20'
            : 'bg-transparent py-4'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 10, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <ToothLogo size={42} />
              </motion.div>
              <div>
                <p className="font-black text-white text-sm uppercase tracking-[2px] leading-none">
                  S.T <span className="text-cyan-400">Laser</span>
                </p>
                <p className="text-cyan-500/70 text-[8px] uppercase tracking-[2px] mt-0.5">Dental & Skin Care</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item) => (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) =>
                    `text-[10px] font-bold uppercase tracking-[2px] transition-all relative group ${
                      isActive ? 'text-cyan-400' : 'text-white/50 hover:text-white'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span className={`absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                    </>
                  )}
                </NavLink>
              ))}

              <div ref={treatRef} className="relative">
                <button onClick={() => setTreatOpen(!treatOpen)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[2px] text-white/50 hover:text-white transition-colors">
                  {t.treatment}
                  <Lucide.ChevronDown size={11} className={`transition-transform duration-300 ${treatOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {treatOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-3 w-52 bg-[#0f1f3d] border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/30">
                      {treatLinks.map((l) => (
                        <Link key={l.path} to={l.path} onClick={() => setTreatOpen(false)}
                          className="flex items-center gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-white/60 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all border-b border-white/5 last:border-0">
                          <Lucide.ChevronRight size={12} className="text-cyan-500" />
                          {l.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Call button - always visible */}
              <a href="tel:01616484616" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 text-[10px] font-bold hover:bg-cyan-500/10 transition-all">
                <Lucide.Phone size={13} /> 01616-484616
              </a>

              {/* Lang */}
              <div ref={langRef} className="relative hidden sm:block">
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-wider hover:border-cyan-500/50 transition-all text-white/60">
                  <span className="text-sm leading-none">{curLang.flag}</span>
                  {curLang.code}
                  <Lucide.ChevronDown size={10} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-[#0f1f3d] border border-cyan-500/20 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto z-50">
                      {languages.map((l) => (
                        <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false); }}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-[11px] font-bold transition-all hover:bg-cyan-500/5 ${lang === l.code ? 'text-cyan-400' : 'text-white/50'}`}>
                          <span className="text-sm">{l.flag}</span>{l.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA */}
              <Link to="/appointment"
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-[10px] uppercase tracking-[2px] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25">
                {t.btn}
              </Link>

              {/* Hamburger */}
              <button onClick={() => setMenuOpen(true)} className="lg:hidden p-2 text-white/60 hover:text-cyan-400 transition-colors">
                <Lucide.Menu size={24} />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && !isAdmin && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150]"
              onClick={closeMenu} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#0a1628] border-l border-cyan-500/10 z-[200] flex flex-col"
              onTouchMove={e => e.stopPropagation()}>

              <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-500/10">
                <div className="flex items-center gap-2">
                  <ToothLogo size={32} />
                  <span className="text-white font-black text-sm uppercase tracking-widest">S.T <span className="text-cyan-400">Laser</span></span>
                </div>
                <button onClick={closeMenu} className="p-1.5 text-white/30 hover:text-white transition-colors">
                  <Lucide.X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 flex flex-col gap-1">
                <a href="tel:01616484616" className="w-full py-3.5 rounded-2xl border border-cyan-500/30 text-cyan-400 font-black text-xs uppercase tracking-[2px] text-center mb-3 flex items-center justify-center gap-2">
                  <Lucide.Phone size={14} /> 01616-484616
                </a>
                <Link to="/appointment" onClick={closeMenu}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-[2px] text-center mb-4">
                  {t.btn}
                </Link>

                <p className="text-[9px] text-white/20 uppercase tracking-[3px] font-black mb-2">Menu</p>
                {navLinks.map((item) => (
                  <Link key={item.path} to={item.path} onClick={closeMenu}
                    className="px-3 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-cyan-500/5 transition-all">
                    {item.label}
                  </Link>
                ))}

                <button onClick={() => setMobileTreatOpen(!mobileTreatOpen)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold text-white/50 hover:text-white hover:bg-cyan-500/5 transition-all w-full">
                  {t.treatment}
                  <Lucide.ChevronDown size={14} className={`transition-transform ${mobileTreatOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileTreatOpen && (
                  <div className="ml-3 flex flex-col gap-0.5 border-l border-cyan-500/20 pl-4">
                    {treatLinks.map((l) => (
                      <Link key={l.path} to={l.path} onClick={closeMenu}
                        className="py-2.5 text-sm font-bold text-white/30 hover:text-cyan-400 transition-colors">
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="h-px bg-white/5 my-4" />
                <p className="text-[9px] text-white/20 uppercase tracking-[3px] font-black mb-3">Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLang(l.code); closeMenu(); }}
                      className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        lang === l.code
                          ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5'
                          : 'border-white/10 text-white/30 hover:border-white/20'
                      }`}>
                      <span className="text-base">{l.flag}</span>{l.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!isAdmin && <WhatsAppWidget lang={lang} />}

      <Routes>
        <Route path="/" element={<Home lang={lang} />} />
        <Route path="/blog" element={<Blog lang={lang} />} />
        <Route path="/services" element={<Services lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/dental-care" element={<DentalCare lang={lang} />} />
        <Route path="/skin-care" element={<SkinCare lang={lang} />} />
        <Route path="/transform" element={<TransformSlider lang={lang} />} />
        <Route path="/before-after" element={<BeforeAfterSlider lang={lang} />} />
        <Route path="/appointment" element={<Appointment lang={lang} />} />
        <Route path="/testimonials" element={<Testimonials lang={lang} />} />
        <Route path="/st-admin-secure/login" element={<Login />} />
        <Route path="/st-admin-secure/*" element={<ProtectedRoute><AdminPanel lang={lang} /></ProtectedRoute>} />
      </Routes>

      {/* ── FOOTER ── */}
      {!isAdmin && (
        <footer className="bg-[#060e1e] border-t border-cyan-500/10 pt-20 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-5">
                  <ToothLogo size={48} />
                  <div>
                    <p className="font-black text-white text-lg uppercase tracking-[2px]">S.T Laser</p>
                    <p className="text-cyan-400/60 text-[9px] uppercase tracking-[2px]">Dental & Skin Care</p>
                  </div>
                </div>
                <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
                  {lang === 'bn'
                    ? 'মৌলভীবাজারের অন্যতম আধুনিক লেজার ডেন্টাল এবং স্কিন কেয়ার সেন্টার।'
                    : "Moulvibazar's premier laser dental & skin care center."}
                </p>
                <a href="tel:01616484616" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold text-sm hover:bg-cyan-500/20 transition-all">
                  <Lucide.Phone size={16} /> 01616-484616
                </a>
              </div>

              <div>
                <p className="text-[9px] text-cyan-400 uppercase tracking-[3px] font-black mb-5">{t.services}</p>
                <ul className="space-y-3">
                  {treatLinks.map(l => (
                    <li key={l.path}>
                      <Link to={l.path} className="text-white/30 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2">
                        <Lucide.ChevronRight size={12} className="text-cyan-500/50" />{l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-[9px] text-cyan-400 uppercase tracking-[3px] font-black mb-5">{t.contact}</p>
                <div className="space-y-4">
                  <a href="tel:01616484616" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all">
                      <Lucide.Phone size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-white/40 text-sm group-hover:text-white transition-colors">01616-484616</span>
                  </a>
                  <a href="https://wa.me/8801616484616" target="_blank" rel="noreferrer" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                      <Lucide.MessageSquare size={14} className="text-green-400" />
                    </div>
                    <span className="text-white/40 text-sm group-hover:text-white transition-colors">WhatsApp</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                      <Lucide.MapPin size={14} className="text-cyan-400" />
                    </div>
                    <span className="text-white/40 text-sm">Moulvibazar, Sylhet</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[9px] text-white/15 uppercase tracking-[3px] font-bold">© 2026 S.T Laser Dental & Skin Care. All Rights Reserved.</p>
              <p className="text-[9px] text-white/10 uppercase tracking-[2px]">Developed by Code & Campaign</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return <Router><AppContent /></Router>;
}

export default App;
