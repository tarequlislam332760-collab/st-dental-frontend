import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/dental';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const defaults = {
  dentalTitleBn: 'সেরা ডেন্টাল', dentalTitleEn: 'Premium Dental',
  dentalDescBn: 'আমরা মৌলভীবাজারে অত্যাধুনিক প্রযুক্তির মাধ্যমে আপনার দাঁতের সব ধরণের সমস্যার সমাধান নিশ্চিত করি।',
  dentalDescEn: 'We provide comprehensive dental solutions using the latest medical technology.',
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
        <div className="relative group">
          <img src={d.dentalImage} className="rounded-[60px] shadow-2xl border-[10px] border-gray-50 relative z-10 transition-transform duration-500 group-hover:scale-105 aspect-[4/5] object-cover" alt="Dental" />
          <div className="absolute -top-6 -right-6 bg-black text-[#D4AF37] p-5 rounded-3xl z-20 shadow-xl border border-[#D4AF37]/20 hidden md:block">
            <SafeIcon name="Activity" size={30} />
            <p className="text-[10px] font-black mt-2 uppercase">Modern Clinic</p>
          </div>
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[#D4AF37]/10 rounded-[40px] -z-0"></div>
        </div>

        <div className="pt-8 lg:pt-0">
          <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs mb-3 block border-l-4 border-[#D4AF37] pl-4">
            {lang === 'bn' ? 'বিশ্বমানের ডেন্টাল কেয়ার' : 'World Class Dental Care'}
          </span>
          <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight text-black uppercase tracking-tighter">
            {title} <span className="text-[#D4AF37]">{lang === 'bn' ? 'চিকিৎসা' : 'Care'}</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl italic font-serif">{desc}</p>

          <ul className="space-y-6">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-all duration-300 shadow-lg">
                  <SafeIcon name={f.icon} size={24} className="text-[#D4AF37] group-hover:text-black transition-colors" />
                </div>
                <span className="text-xl font-bold text-black group-hover:text-[#D4AF37] transition-colors tracking-tight">{f.text}</span>
              </li>
            ))}
          </ul>

          <button className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-black hover:text-[#D4AF37] transition-all mt-12 uppercase tracking-widest text-sm">
            {lang === 'bn' ? 'সিরিয়াল নিন' : 'Get Appointment'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DentalCare;