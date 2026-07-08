import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/dental';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const defaults = {
  dentalTitleBn: 'সেরা লেজার ডেন্টাল', dentalTitleEn: 'Premium Laser Dental',
  dentalDescBn: 'আমরা মৌলভীবাজারে অত্যাধুনিক লেজার প্রযুক্তির মাধ্যমে আপনার দাঁতের সব ধরণের সমস্যার সমাধান নিশ্চিত করি।',
  dentalDescEn: 'We provide comprehensive laser dental solutions using the latest medical technology.',
  dentalImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000',
  dentalFeaturesBn: [
    { icon: 'Zap', text: 'লেজার ডেন্টিস্ট্রি' },
    { icon: 'Smile', text: 'দাঁতের ইমপ্লান্ট' },
    { icon: 'ShieldCheck', text: 'ব্যথাহীন চিকিৎসা' },
  ],
  dentalFeaturesEn: [
    { icon: 'Zap', text: 'Laser Dentistry' },
    { icon: 'Smile', text: 'Dental Implants' },
    { icon: 'ShieldCheck', text: 'Painless Treatment' },
  ],
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const DentalCare = ({ lang }) => {
  const [d, setD] = useState(defaults);

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        dentalTitleBn: r.dentalTitleBn || defaults.dentalTitleBn,
        dentalTitleEn: r.dentalTitleEn || defaults.dentalTitleEn,
        dentalDescBn:  r.dentalDescBn  || defaults.dentalDescBn,
        dentalDescEn:  r.dentalDescEn  || defaults.dentalDescEn,
        dentalImage:   r.dentalImage   || defaults.dentalImage,
        dentalFeaturesBn: r.dentalFeaturesBn?.length ? r.dentalFeaturesBn : defaults.dentalFeaturesBn,
        dentalFeaturesEn: r.dentalFeaturesEn?.length ? r.dentalFeaturesEn : defaults.dentalFeaturesEn,
      });
    }).catch(() => {});
  }, []);

  const title    = lang === 'bn' ? d.dentalTitleBn : d.dentalTitleEn;
  const desc     = lang === 'bn' ? d.dentalDescBn  : d.dentalDescEn;
  const features = lang === 'bn' ? d.dentalFeaturesBn : d.dentalFeaturesEn;

  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative group">
          <img src={d.dentalImage} className="rounded-[60px] shadow-2xl border-[10px] border-gray-50 relative z-10 transition-transform duration-500 group-hover:scale-105 aspect-[4/5] object-cover" alt="Dental" />
          <div className="absolute -top-6 -right-6 bg-[#0F172A] text-[#22D3EE] p-5 rounded-3xl z-20 shadow-xl border border-[#0891B2]/30 hidden md:block">
            <SafeIcon name="Activity" size={30} />
            <p className="text-[10px] font-black mt-2 uppercase">Modern Clinic</p>
          </div>
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[#0891B2]/10 rounded-[40px] -z-0"></div>
        </motion.div>

        <div className="pt-8 lg:pt-0">
          <span className="text-[#0891B2] font-black tracking-widest uppercase text-xs mb-3 block border-l-4 border-[#0891B2] pl-4">
            {lang === 'bn' ? 'বিশ্বমানের লেজার ডেন্টাল কেয়ার' : 'World Class Laser Dental Care'}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight text-black uppercase tracking-tighter">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#22D3EE]">{lang === 'bn' ? 'চিকিৎসা' : 'Care'}</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl italic font-serif">{desc}</p>

          <motion.ul variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-6">
            {features.map((f, i) => (
              <motion.li variants={item} key={i} whileHover={{ x: 8 }} className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-[#0F172A] flex items-center justify-center border border-[#0891B2]/30 group-hover:bg-gradient-to-br group-hover:from-[#0891B2] group-hover:to-[#06B6D4] transition-all duration-300 shadow-lg">
                  <SafeIcon name={f.icon} size={24} className="text-[#22D3EE] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xl font-bold text-black group-hover:text-[#0891B2] transition-colors tracking-tight">{f.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white px-12 py-4 rounded-full font-black shadow-[0_10px_30px_rgba(8,145,178,0.35)] hover:shadow-[0_10px_40px_rgba(8,145,178,0.5)] transition-all mt-12 uppercase tracking-widest text-sm">
            {lang === 'bn' ? 'সিরিয়াল নিন' : 'Get Appointment'}
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default DentalCare;
