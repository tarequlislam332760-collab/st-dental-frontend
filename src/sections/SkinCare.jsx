import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/skincare';

const SafeIcon = ({ name, className = "" }) => {
  const Icon = Lucide[name] || Lucide.Zap;
  return <Icon size={24} className={className} />;
};

const defaults = {
  skinTitleBn: 'ত্বকের উজ্জ্বলতায় আমরা সেরা',
  skinTitleEn: 'Best in Aesthetic Skin Care',
  skinDescBn: 'আমাদের আধুনিক লেজার এবং ফেসিয়াল ট্রিটমেন্ট আপনার ত্বকে ফিরিয়ে আনবে হারানো উজ্জ্বলতা।',
  skinDescEn: 'Our modern laser and facial treatments bring back your skin\'s lost glow.',
  skinImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
  skinFeaturesBn: [
    { icon: 'Sun', text: 'সান প্রোটেকশন গাইড' },
    { icon: 'Droplets', text: 'হাইড্রেটিং থেরাপি' },
    { icon: 'UserCheck', text: 'বিশেষজ্ঞ পরামর্শ' },
    { icon: 'Heart', text: 'ত্বকের গভীর যত্ন' },
  ],
  skinFeaturesEn: [
    { icon: 'Sun', text: 'Sun Protection Guide' },
    { icon: 'Droplets', text: 'Hydrating Therapy' },
    { icon: 'UserCheck', text: 'Expert Consultation' },
    { icon: 'Heart', text: 'Deep Skin Care' },
  ],
};

const SkinCare = ({ lang }) => {
  const [d, setD] = useState(defaults);

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        skinTitleBn: r.skinTitleBn || defaults.skinTitleBn,
        skinTitleEn: r.skinTitleEn || defaults.skinTitleEn,
        skinDescBn:  r.skinDescBn  || defaults.skinDescBn,
        skinDescEn:  r.skinDescEn  || defaults.skinDescEn,
        skinImage:   r.skinImage   || defaults.skinImage,
        skinFeaturesBn: r.skinFeaturesBn?.length ? r.skinFeaturesBn : defaults.skinFeaturesBn,
        skinFeaturesEn: r.skinFeaturesEn?.length ? r.skinFeaturesEn : defaults.skinFeaturesEn,
      });
    }).catch(() => {});
  }, []);

  const title    = lang === 'bn' ? d.skinTitleBn : d.skinTitleEn;
  const desc     = lang === 'bn' ? d.skinDescBn  : d.skinDescEn;
  const features = lang === 'bn' ? d.skinFeaturesBn : d.skinFeaturesEn;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter">{title}</h1>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">{desc}</p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                    <SafeIcon name={f.icon} />
                  </div>
                  <span className="font-bold text-sm text-gray-700">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <img src={d.skinImage} className="rounded-[60px] shadow-2xl border-[15px] border-white" alt="Skin Care" />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[40px] shadow-2xl hidden md:block border border-gray-50">
              <p className="text-[#D4AF37] font-black text-4xl leading-none">100%</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinCare;