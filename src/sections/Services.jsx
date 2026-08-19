import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/services';
const SESSIONS_API = 'https://st-dental-backend.vercel.app/api/service-sessions/public';

const SafeIcon = ({ name, size = 20, className = '' }) => {
  const IC = Lucide[name] || Lucide.HelpCircle;
  return <IC size={size} className={className} />;
};

const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
};

// All services — matches the clinic poster exactly
const defaultDentalBn = [
  { name: 'সম্পূর্ণ আধুনিক ডিজিটাল ডেন্টাল ইউনিট', icon: 'Monitor' },
  { name: 'রুট ক্যানেল ট্রিটমেন্ট (দাঁতের ভেতরের সংক্রমণের স্থায়ী সমাধান)', icon: 'Activity' },
  { name: 'স্কেলিং এবং পলিশিং (দাঁত ও মাড়ির ময়লা পরিষ্কার)', icon: 'Sparkles' },
  { name: 'স্থায়ী ও অস্থায়ী দাঁত ফিলিং', icon: 'Layers' },
  { name: 'শিশুদের ব্যথামুক্ত দাঁতের চিকিৎসা', icon: 'Baby' },
  { name: 'অর্থোডন্টিক ট্রিটমেন্ট (আকা-বাঁকা এবং উঁচু-নিচু দাঁত সোজা করা)', icon: 'GitBranch' },
  { name: 'ম্যাক্সিলোফেসিয়াল সার্জারি', icon: 'Scissors' },
  { name: 'টিথ হোয়াইটেনিং (দাঁত সাদা করা)', icon: 'Star' },
  { name: 'ডেন্টাল ইমপ্লান্ট এবং ক্রাউন (দাঁতের স্থায়ী প্রতিস্থাপন)', icon: 'Award' },
  { name: 'দাঁত তোলা এবং বাঁধানো', icon: 'Wrench' },
  { name: 'নিয়মিত ডেন্টাল চেকআপ', icon: 'ClipboardCheck' },
];

const defaultDentalEn = [
  { name: 'Fully Modern Digital Dental Unit', icon: 'Monitor' },
  { name: 'Root Canal Treatment (Permanent solution for internal infection)', icon: 'Activity' },
  { name: 'Scaling & Polishing (Cleaning teeth & gums)', icon: 'Sparkles' },
  { name: 'Permanent & Temporary Tooth Filling', icon: 'Layers' },
  { name: 'Painless Dental Treatment for Children', icon: 'Baby' },
  { name: 'Orthodontic Treatment (Straightening crooked & misaligned teeth)', icon: 'GitBranch' },
  { name: 'Maxillofacial Surgery', icon: 'Scissors' },
  { name: 'Teeth Whitening', icon: 'Star' },
  { name: 'Dental Implant & Crown (Permanent tooth replacement)', icon: 'Award' },
  { name: 'Tooth Extraction & Fixing', icon: 'Wrench' },
  { name: 'Regular Dental Checkup', icon: 'ClipboardCheck' },
];

const defaultSkinBn = [
  { name: 'কার্বন ফেসিয়াল এবং কেমিক্যাল পিল (ত্বকের ভেতর থেকে ময়লা পরিষ্কার এবং উজ্জ্বলতা বৃদ্ধি)', icon: 'Zap' },
  { name: 'হাইড্রো ফেসিয়াল (ত্বকের গভীর থেকে আর্দ্রতা এবং পুষ্টি জোগায়)', icon: 'Droplets' },
  { name: 'স্থায়ী লোম অপসারণ (লেজার হেয়ার রিমুভাল)', icon: 'Scissors' },
  { name: 'আঁচিল অপসারণ', icon: 'CircleDot' },
  { name: 'তিল অপসারণ', icon: 'Target' },
  { name: 'মেছতা ও দাগ অপসারণ', icon: 'Sun' },
  { name: 'বলিরেখা এবং দাগ অপসারণ', icon: 'Sparkle' },
  { name: 'ট্যাটু রিমুভ', icon: 'Eraser' },
  { name: 'লেজার স্কিন টাইটেনিং (বয়সের ছাপ এবং ঝুলে যাওয়া ত্বক টানটান করে)', icon: 'Sparkles' },
];

const defaultSkinEn = [
  { name: 'Carbon Facial & Chemical Peel (Deep cleansing & radiance boost)', icon: 'Zap' },
  { name: 'Hydro Facial (Deep hydration & nourishment)', icon: 'Droplets' },
  { name: 'Permanent Hair Removal (Laser Hair Removal)', icon: 'Scissors' },
  { name: 'Skin Tag Removal', icon: 'CircleDot' },
  { name: 'Mole Removal', icon: 'Target' },
  { name: 'Melasma & Pigmentation Removal', icon: 'Sun' },
  { name: 'Wrinkle & Scar Removal', icon: 'Sparkle' },
  { name: 'Tattoo Removal', icon: 'Eraser' },
  { name: 'Laser Skin Tightening (Reduces aging signs & sagging skin)', icon: 'Sparkles' },
];

const defaults = {
  servicesImage1: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000',
  servicesImage2: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
  dentalServicesBn: defaultDentalBn,
  dentalServicesEn: defaultDentalEn,
  skinServicesBn: defaultSkinBn,
  skinServicesEn: defaultSkinEn,
};

const STATUS_LABEL_BN = { pending: 'শীঘ্রই', completed: 'সম্পন্ন', cancelled: 'বাতিল' };
const STATUS_LABEL_EN = { pending: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' };
const STATUS_COLOR = { pending: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', completed: 'text-green-400 bg-green-500/10 border-green-500/30', cancelled: 'text-red-400 bg-red-500/10 border-red-500/30' };

// Modal showing session dates for a single service (no patient info — privacy)
const SessionModal = ({ serviceName, isBn, onClose }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${SESSIONS_API}/${encodeURIComponent(serviceName)}`)
      .then(res => setSessions(res.data || []))
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, [serviceName]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0f1f3d] border border-cyan-500/20 rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-5 gap-3">
          <div>
            <p className="text-cyan-400 text-[10px] uppercase font-black tracking-widest mb-1">{isBn ? 'সেশন তালিকা' : 'Session Schedule'}</p>
            <h3 className="text-white font-black text-sm leading-snug">{serviceName}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 shrink-0"><Lucide.X size={14} /></button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-xs text-center py-6 animate-pulse">{isBn ? 'লোড হচ্ছে...' : 'Loading...'}</p>
        ) : sessions.length === 0 ? (
          <p className="text-gray-500 text-xs text-center py-6">{isBn ? 'এই সার্ভিসের জন্য এখনো কোনো সেশন যোগ করা হয়নি।' : 'No sessions scheduled for this service yet.'}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                <span className="flex items-center gap-2 text-white text-sm font-bold">
                  <Lucide.Calendar size={14} className="text-cyan-400" />
                  {new Date(s.date).toLocaleDateString(isBn ? 'bn-BD' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
                <span className={`text-[9px] px-2.5 py-1 rounded-full uppercase font-black border ${STATUS_COLOR[s.status] || STATUS_COLOR.pending}`}>
                  {(isBn ? STATUS_LABEL_BN : STATUS_LABEL_EN)[s.status] || s.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <a href="tel:01616484616"
          className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-widest py-3 rounded-full hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Lucide.Phone size={14} /> {isBn ? 'সিরিয়াল নিতে কল করুন' : 'Call to Book'}
        </a>
      </motion.div>
    </div>
  );
};

const Service = ({ lang = 'bn' }) => {
  const [d, setD] = useState(defaults);
  const [activeSession, setActiveSession] = useState(null); // serviceName currently viewed

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        servicesImage1: r.servicesImage1 || defaults.servicesImage1,
        servicesImage2: r.servicesImage2 || defaults.servicesImage2,
        dentalServicesBn: r.dentalServicesBn?.length ? r.dentalServicesBn : defaults.dentalServicesBn,
        dentalServicesEn: r.dentalServicesEn?.length ? r.dentalServicesEn : defaults.dentalServicesEn,
        skinServicesBn: r.skinServicesBn?.length ? r.skinServicesBn : defaults.skinServicesBn,
        skinServicesEn: r.skinServicesEn?.length ? r.skinServicesEn : defaults.skinServicesEn,
      });
    }).catch(() => {});
  }, []);

  const isBn = lang === 'bn';
  const dentalServices = isBn ? d.dentalServicesBn : d.dentalServicesEn;
  const skinServices = isBn ? d.skinServicesBn : d.skinServicesEn;

  // Static class maps — Tailwind can't purge dynamically interpolated class names,
  // so we pre-define both accent variants in full.
  const accentClasses = {
    cyan: {
      row: 'flex items-center gap-4 p-3 rounded-xl hover:bg-cyan-500/5 group transition-all',
      iconWrap: 'w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-all',
      icon: 'text-cyan-400',
      btn: 'flex items-center gap-1 text-[9px] uppercase font-black px-2.5 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shrink-0',
    },
    teal: {
      row: 'flex items-center gap-4 p-3 rounded-xl hover:bg-teal-500/5 group transition-all',
      iconWrap: 'w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-all',
      icon: 'text-teal-400',
      btn: 'flex items-center gap-1 text-[9px] uppercase font-black px-2.5 py-1.5 rounded-full border border-teal-500/30 text-teal-400 hover:bg-teal-500 hover:text-white transition-all shrink-0',
    },
  };

  const renderServiceRow = (s, i, accent) => {
    const c = accentClasses[accent];
    return (
      <motion.div key={i}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.04 }}
        className={c.row}>
        <div className={c.iconWrap}>
          <SafeIcon name={s.icon} size={16} className={c.icon} />
        </div>
        <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors leading-snug flex-1">
          {s.name}
        </span>
        <button onClick={() => setActiveSession(s.name)} className={c.btn}>
          <Lucide.CalendarClock size={11} />
          {isBn ? 'সেশন দেখুন' : 'View Sessions'}
        </button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a1628] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <Reveal className="text-center mb-20">
          <p className="text-[10px] text-cyan-400 uppercase tracking-[5px] font-black mb-3">
            {isBn ? 'আমাদের চিকিৎসা সেবা' : 'Our Medical Services'}
          </p>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            {isBn ? 'সেরা ' : 'Premium '}
            <span className="text-cyan-400">{isBn ? 'চিকিৎসা' : 'Healthcare'}</span>
            {isBn ? ' সেবা' : ' Services'}
          </h2>
          <div className="w-16 h-0.5 bg-cyan-400 mx-auto mt-5" />
        </Reveal>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Dental ── */}
          <Reveal delay={0.1}>
            <div className="bg-[#0f1f3d] border border-cyan-500/10 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/10 px-7 py-5 border-b border-cyan-500/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Lucide.Stethoscope size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-wider text-base">
                    {isBn ? 'ডেন্টাল সার্ভিস' : 'Dental Services'}
                  </h3>
                  <p className="text-cyan-400/50 text-[10px] uppercase tracking-widest">S.T Laser Dental</p>
                </div>
              </div>

              <div className="p-6 space-y-1">
                {dentalServices.map((s, i) => renderServiceRow(s, i, 'cyan'))}
              </div>

              <div className="mx-6 mb-6 rounded-2xl overflow-hidden">
                <img src={d.servicesImage1} alt="Dental" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </Reveal>

          {/* ── Skin ── */}
          <Reveal delay={0.2}>
            <div className="bg-[#0f1f3d] border border-cyan-500/10 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/10 px-7 py-5 border-b border-cyan-500/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                  <Lucide.Sparkles size={22} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-wider text-base">
                    {isBn ? 'স্কিন কেয়ার সার্ভিস' : 'Skin Care Services'}
                  </h3>
                  <p className="text-teal-400/50 text-[10px] uppercase tracking-widest">Laser Skin Care</p>
                </div>
              </div>

              <div className="p-6 space-y-1">
                {skinServices.map((s, i) => renderServiceRow(s, i, 'teal'))}
              </div>

              <div className="mx-6 mb-6 rounded-2xl overflow-hidden">
                <img src={d.servicesImage2} alt="Skin" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal delay={0.3} className="text-center mt-14">
          <a href="tel:01616484616"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm uppercase tracking-[2px] hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/25">
            <Lucide.Phone size={18} />
            {isBn ? 'সিরিয়াল নিতে কল করুন: 01616-484616' : 'Call for Appointment: 01616-484616'}
          </a>
        </Reveal>
      </div>

      {/* Session modal */}
      <AnimatePresence>
        {activeSession && (
          <SessionModal serviceName={activeSession} isBn={isBn} onClose={() => setActiveSession(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Service;
