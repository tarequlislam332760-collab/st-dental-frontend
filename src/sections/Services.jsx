import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/services';

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

// All services from the clinic board
const defaultDentalBn = [
  { name: 'সম্পূর্ণ আধুনিক ডিজিটাল ডেন্টাল ইউনিট', icon: 'Monitor' },
  { name: 'রুট ক্যানেল ট্রিটমেন্ট', icon: 'Activity' },
  { name: 'স্কেলিং ও পলিশিং', icon: 'Sparkles' },
  { name: 'দাঁতের স্থায়ী ও অস্থায়ী ফিলিং', icon: 'Layers' },
  { name: 'শিশুদের ব্যথাহীন দাঁতের চিকিৎসা', icon: 'Baby' },
  { name: 'অর্থোডন্টিক চিকিৎসা (আঁকা-বাঁকা ও উঁচু-নিচু)', icon: 'GitBranch' },
  { name: 'ম্যাক্সিলোফেসিয়াল সার্জারি', icon: 'Scissors' },
  { name: 'দাঁত সাদা করা', icon: 'Star' },
  { name: 'ডেন্টাল ইম্প্লান্ট এন্ড ক্রাউন', icon: 'Award' },
  { name: 'দাঁত তোলা ও বাঁধানো', icon: 'Wrench' },
  { name: 'রেগুলার ডেন্টাল চেকআপ', icon: 'ClipboardCheck' },
];

const defaultDentalEn = [
  { name: 'Fully Modern Digital Dental Unit', icon: 'Monitor' },
  { name: 'Root Canal Treatment', icon: 'Activity' },
  { name: 'Scaling & Polishing', icon: 'Sparkles' },
  { name: 'Permanent & Temporary Filling', icon: 'Layers' },
  { name: 'Painless Dental Treatment for Children', icon: 'Baby' },
  { name: 'Orthodontic Treatment (Braces)', icon: 'GitBranch' },
  { name: 'Maxillofacial Surgery', icon: 'Scissors' },
  { name: 'Teeth Whitening', icon: 'Star' },
  { name: 'Dental Implant & Crown', icon: 'Award' },
  { name: 'Tooth Extraction & Fixing', icon: 'Wrench' },
  { name: 'Regular Dental Checkup', icon: 'ClipboardCheck' },
];

const defaultSkinBn = [
  { name: 'কার্বন ফেসিয়াল এবং কেমিক্যাল পিল', icon: 'Zap' },
  { name: 'হাইড্রো ফেসিয়াল', icon: 'Droplets' },
  { name: 'স্থায়ীভাবে লোম অপসারণ', icon: 'Scissors' },
  { name: 'তিল অপসারণ', icon: 'Target' },
  { name: 'মেছতা ও দাগ অপসারণ', icon: 'Sun' },
  { name: 'লেজার স্কিন টাইটেনিং', icon: 'Sparkles' },
];

const defaultSkinEn = [
  { name: 'Carbon Facial & Chemical Peel', icon: 'Zap' },
  { name: 'Hydro Facial', icon: 'Droplets' },
  { name: 'Permanent Hair Removal', icon: 'Scissors' },
  { name: 'Mole Removal', icon: 'Target' },
  { name: 'Melasma & Scar Removal', icon: 'Sun' },
  { name: 'Laser Skin Tightening', icon: 'Sparkles' },
];

const defaults = {
  servicesImage1: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000',
  servicesImage2: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
  dentalServicesBn: defaultDentalBn,
  dentalServicesEn: defaultDentalEn,
  skinServicesBn: defaultSkinBn,
  skinServicesEn: defaultSkinEn,
};

const Service = ({ lang = 'bn' }) => {
  const [d, setD] = useState(defaults);

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
              {/* Card header */}
              <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/10 px-7 py-5 border-b border-cyan-500/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <Lucide.Stethoscope size={22} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-black uppercase tracking-wider text-base">
                    {isBn ? 'ডেন্টাল সেবাসমূহ' : 'Dental Services'}
                  </h3>
                  <p className="text-cyan-400/50 text-[10px] uppercase tracking-widest">S.T Laser Dental</p>
                </div>
              </div>

              {/* Service list */}
              <div className="p-6 space-y-1">
                {dentalServices.map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-cyan-500/5 group transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 transition-all">
                      <SafeIcon name={s.icon} size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors leading-snug">
                      {s.name}
                    </span>
                    <Lucide.ChevronRight size={14} className="text-cyan-500/30 ml-auto shrink-0 group-hover:text-cyan-400 transition-colors" />
                  </motion.div>
                ))}
              </div>

              {/* Image */}
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
                    {isBn ? 'স্কিন কেয়ার সেবাসমূহ' : 'Skin Care Services'}
                  </h3>
                  <p className="text-teal-400/50 text-[10px] uppercase tracking-widest">Laser Skin Care</p>
                </div>
              </div>

              <div className="p-6 space-y-1">
                {skinServices.map((s, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-teal-500/5 group transition-all cursor-default">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-all">
                      <SafeIcon name={s.icon} size={16} className="text-teal-400" />
                    </div>
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors leading-snug">
                      {s.name}
                    </span>
                    <Lucide.ChevronRight size={14} className="text-teal-500/30 ml-auto shrink-0 group-hover:text-teal-400 transition-colors" />
                  </motion.div>
                ))}
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
    </div>
  );
};

export default Service;
