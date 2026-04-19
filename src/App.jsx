import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import * as Lucide from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';

// --- পেজ এবং সেকশন ইম্পোর্ট ---
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

// --- অ্যাডমিন প্যানেল ইম্পোর্ট (নতুন) ---
import AdminPanel from './admin/AdminPanel';
import Login from './admin/Login';
import ProtectedRoute from './admin/ProtectedRoute';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

// --- ১০টি ভাষার ডাটাবেস ---
const translations = {
  bn: {
    home: "হোম", services: "সেবা", about: "আমাদের সম্পর্কে", contact: "যোগাযোগ",
    dental: "ডেন্টাল কেয়ার", skin: "স্কিন কেয়ার", treatment: "ট্রিটমেন্ট",
    testimonials: "রিভিউ", btn: "সিরিয়াল নিন", other: "অন্যান্য সেবা", call: "কল করুন", whatsapp: "হোয়াটসঅ্যাপ",
    hero: [
      { title: "সেরা ডেন্টাল চিকিৎসা", sub: "Premium Dental Care", desc: "আধুনিক প্রযুক্তিতে আমরা নিশ্চিত করি আপনার সুন্দর হাসি।" },
      { title: "উজ্জ্বল ত্বকের পূর্ণ নিশ্চয়তা", sub: "Expert Facial & Skin", desc: "আপনার ত্বকের যত্নে আমাদের বিশেষজ্ঞ ডাক্তাররা রয়েছেন।" }
    ]
  },
  en: {
    home: "Home", services: "Services", about: "About", contact: "Contact",
    dental: "Dental Care", skin: "Skin Care", treatment: "Treatment",
    testimonials: "Testimonials", btn: "Get Appointment", other: "Other Services", call: "Call Now", whatsapp: "WhatsApp",
    hero: [
      { title: "Best Dental Care", sub: "Premium Dental Care", desc: "We ensure your beautiful smile with modern technology." },
      { title: "Guaranteed Glowing Skin", sub: "Expert Facial & Skin", desc: "Our expert doctors are here to take care of your skin." }
    ]
  },
  ar: { home: "الصفحة الرئيسية", services: "خدمات", about: "حول", contact: "اتصال", dental: "عناية بالأسنان", skin: "العناية بالبشرة", treatment: "علاج", testimonials: "شهادات", btn: "حجز موعد", call: "اتصل الآن", whatsapp: "واتساب" },
  hi: { home: "होम", services: "सेवाएं", about: "हमारे बारे में", contact: "संपর্ক", dental: "দন্ত চিকিৎসা", skin: "ত্বচা की देखभाल", treatment: "उपचार", testimonials: "प्रमाणपत्र", btn: "अपॉइंटमेंट लें", call: "अभी কল करें", whatsapp: "व्हाट्सएप" },
  es: { home: "Inicio", services: "Servicios", about: "Nosotros", contact: "Contacto", dental: "Cuidado Dental", skin: "Cuidado Piel", treatment: "Tratamiento", testimonials: "Testimonios", btn: "Reservar", call: "Llamar", whatsapp: "WhatsApp" },
  fr: { home: "Accueil", services: "Services", about: "À propos", contact: "Contact", dental: "Soin Dentaire", skin: "Soin Peau", treatment: "Traitement", testimonials: "Témoignages", btn: "Réserver", call: "Appeler", whatsapp: "WhatsApp" },
  de: { home: "Startseite", services: "Dienste", about: "Über uns", contact: "Kontakt", dental: "Zahnpflege", skin: "Hautpflege", treatment: "Behandlung", testimonials: "Referenzen", btn: "Buchen", call: "Anrufen", whatsapp: "WhatsApp" },
  zh: { home: "首页", services: "服务", about: "关于我们", contact: "联系我们", dental: "牙科护理", skin: "皮肤护理", treatment: "治疗", testimonials: "客户评价", btn: "现在预订", call: "现在打电话", whatsapp: "微信/WhatsApp" },
  ru: { home: "Главная", services: "Услуги", about: "О нас", contact: "Контакт", dental: "Уход за зубами", skin: "Уход за кожей", treatment: "Лечение", testimonials: "Отзывы", btn: "Забронировать", call: "Позвонить", whatsapp: "WhatsApp" },
  tr: { home: "Anasayfa", services: "Hizmetler", about: "Hakkımızda", contact: "İletişim", dental: "Diş Bakımı", skin: "Cilt Bakımı", treatment: "Tedavi", testimonials: "Yorumlar", btn: "Randevu Al", call: "Ara", whatsapp: "WhatsApp" }
};

const languages = [
  { code: 'en', name: 'English' }, { code: 'bn', name: 'বাংলা' }, { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' }, { code: 'es', name: 'Español' }, { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }, { code: 'zh', name: '中文' }, { code: 'ru', name: 'Русский' }, { code: 'tr', name: 'Türkçe' }
];

const AppContent = () => {
  const [lang, setLang] = useState('bn');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileTreatmentOpen, setIsMobileTreatmentOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);
  const [isTreatmentOpen, setIsTreatmentOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/st-admin-secure');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsTreatmentOpen(false);
      setIsLangOpen(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const t = translations[lang] || translations['en'];

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] overflow-x-hidden">
      
      {!isAdminPath && (
        <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-11 md:h-11 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-black shadow-lg text-sm md:text-base">ST</div>
              <div className="flex flex-col">
                <h1 className="font-black text-xs md:text-lg uppercase tracking-tighter leading-none">S T LESSER</h1>
                <p className="text-[#D4AF37] text-[7px] md:text-[9px] font-bold uppercase tracking-widest">Dental & Aesthetic Care</p>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: t.home, path: "/" },
                { name: t.services, path: "/services" },
                { name: t.about, path: "/about" },
                { name: t.contact, path: "/contact" },
                { name: t.testimonials, path: "/testimonials" }
              ].map((item, i) => (
                <NavLink key={i} to={item.path} className={({ isActive }) => `relative text-[11px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-gray-600 hover:text-[#D4AF37]'}`}>
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-[2.5px] bg-[#D4AF37] rounded-full" />}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setIsTreatmentOpen(!isTreatmentOpen)} className="flex items-center gap-1 text-[11px] font-bold uppercase text-gray-600 hover:text-[#D4AF37]">
                  {t.treatment} <SafeIcon name="ChevronDown" size={12} className={`transition-transform ${isTreatmentOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTreatmentOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white shadow-2xl border-t-4 border-[#D4AF37] py-3 rounded-b-xl animate-in fade-in slide-in-from-top-2 z-[110]">
                    <Link to="/dental-care" onClick={() => setIsTreatmentOpen(false)} className="block px-6 py-2 hover:bg-gray-50 hover:text-[#D4AF37] text-[11px] font-bold">{t.dental}</Link>
                    <Link to="/skin-care" onClick={() => setIsTreatmentOpen(false)} className="block px-6 py-2 hover:bg-gray-50 hover:text-[#D4AF37] text-[11px] font-bold">{t.skin}</Link>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-2 rounded-full text-[10px] font-black hover:border-[#D4AF37]">
                  <SafeIcon name="Globe" size={14} className="text-[#D4AF37]" />
                  <span className="uppercase">{lang}</span>
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 w-36 bg-white shadow-xl border-t-2 border-[#D4AF37] mt-1 rounded-lg max-h-60 overflow-y-auto z-[110]">
                    {languages.map((l) => (
                      <button key={l.code} onClick={() => { setLang(l.code); setIsLangOpen(false); }} className={`block w-full text-left px-4 py-2.5 text-[10px] font-bold hover:bg-gray-50 ${lang === l.code ? 'text-[#D4AF37]' : 'text-gray-700'}`}>
                        {l.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link to="/appointment" className="hidden sm:block">
                <button className="bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] px-5 py-2.5 rounded-full font-bold text-[10px] uppercase hover:bg-[#D4AF37] hover:text-white transition-all shadow-md">{t.btn}</button>
              </Link>
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-1.5 text-[#D4AF37] bg-gray-50 rounded-lg"><SafeIcon name="Menu" size={24} /></button>
            </div>
          </div>
        </header>
      )}

      <AnimatePresence>
        {isMobileMenuOpen && !isAdminPath && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setIsMobileMenuOpen(false); setIsMobileTreatmentOpen(false);}} className="fixed inset-0 bg-black/60 z-[150] backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-[280px] bg-white z-[200] shadow-2xl p-8 flex flex-col">
              <button onClick={() => {setIsMobileMenuOpen(false); setIsMobileTreatmentOpen(false);}} className="self-end p-2 bg-gray-100 rounded-full mb-8"><SafeIcon name="X" size={20} /></button>
              <nav className="flex flex-col gap-6 font-bold uppercase text-sm tracking-widest text-gray-800">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>{t.home}</Link>
                <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>{t.services}</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>{t.about}</Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>{t.contact}</Link>
                <Link to="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>{t.testimonials}</Link>
                <div className="h-[1px] bg-gray-100 w-full my-2"></div>
                <button onClick={() => setIsMobileTreatmentOpen(!isMobileTreatmentOpen)} className="flex items-center justify-between w-full text-left">
                  <span>{t.treatment}</span>
                  <SafeIcon name="ChevronDown" size={16} className={`transition-transform ${isMobileTreatmentOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileTreatmentOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 pl-4 border-l-2 border-[#D4AF37]/30">
                    <Link to="/dental-care" className="text-[#D4AF37] text-xs" onClick={() => setIsMobileMenuOpen(false)}>{t.dental}</Link>
                    <Link to="/skin-care" className="text-[#D4AF37] text-xs" onClick={() => setIsMobileMenuOpen(false)}>{t.skin}</Link>
                  </motion.div>
                )}
                <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 bg-[#D4AF37] text-white py-3 px-6 rounded-lg text-center text-xs">{t.btn}</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsAppWidget Routes এর বাইরে থাকতে হবে */}
      {!isAdminPath && <WhatsAppWidget lang={lang} />}

      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Home lang={lang} />} /> 
        <Route path="/services" element={<Services lang={lang} />} />
        <Route path="/about" element={<About lang={lang} />} />
        <Route path="/contact" element={<Contact lang={lang} />} />
        <Route path="/dental-care" element={<DentalCare lang={lang} />} />
        <Route path="/skin-care" element={<SkinCare lang={lang} />} />
        <Route path="/appointment" element={<Appointment lang={lang} />} />
        <Route path="/testimonials" element={<Testimonials lang={lang} />} />
        
        <Route path="/st-admin-secure/login" element={<Login />} />

        <Route 
          path="/st-admin-secure/*" 
          element={
            <ProtectedRoute>
              <AdminPanel lang={lang} />
            </ProtectedRoute>
          }   
        />
      </Routes>

      {!isAdminPath && (
        <footer className="bg-[#0f0f0f] text-white pt-20 pb-10 px-6 mt-20 border-t border-gray-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-xl">ST</div>
                <h3 className="font-black uppercase text-xl tracking-tighter leading-none">S T LESSER <br/><span className="text-[#D4AF37] text-sm">Dental & Aesthetic</span></h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {lang === 'bn' ? 'মৌলভীবাজারের অন্যতম আধুনিক ডেন্টাল এবং স্কিন কেয়ার সেন্টার।' : "Sylhet & Moulvibazar's premier dental clinic with modern technology."}
              </p>
            </div>

            <div className="lg:pl-10">
              <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-widest mb-8">{t.services}</h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                <li><Link to="/dental-care" className="hover:text-[#D4AF37] transition-colors">{t.dental}</Link></li>
                <li><Link to="/skin-care" className="hover:text-[#D4AF37] transition-colors">{t.skin}</Link></li>
                <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">{t.about}</Link></li>
                <li><Link to="/testimonials" className="hover:text-[#D4AF37] transition-colors">{t.testimonials}</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-widest mb-8">{t.contact}</h4>
              <div className="space-y-4">
                <a href="tel:+8801711023730" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] transition-all">
                    <SafeIcon name="Phone" size={18} className="text-[#D4AF37] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{t.call}</p>
                    <p className="text-sm font-black tracking-tight">+880 1711-023730</p>
                  </div>
                </a>
                <a href="https://wa.me/8801711023730" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-[#25D366] transition-all">
                    <SafeIcon name="MessageSquare" size={18} className="text-[#25D366] group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">{t.whatsapp}</p>
                    <p className="text-sm font-black tracking-tight">+880 1711-023730</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-end">
              <div className="bg-white p-3 rounded-2xl w-32 h-32 flex items-center justify-center shadow-2xl">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://stlesser.com/appointment" alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <p className="text-[9px] mt-4 text-gray-500 font-black uppercase tracking-[3px]">Scan to Book</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-gray-900 flex justify-between items-center">
            <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">© 2026 Code & Campaign. All Rights Reserved.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;