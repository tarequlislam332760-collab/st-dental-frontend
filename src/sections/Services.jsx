import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/services';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const defaults = {
  servicesImage1: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000',
  servicesImage2: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
  dentalServicesBn: [
    { name: 'দাঁত সাদা করা',           icon: 'Sparkles' },
    { name: 'রুট ক্যানেল ট্রিটমেন্ট',  icon: 'Activity' },
    { name: 'ব্রেসেস এবং অ্যালাইনমেন্ট', icon: 'Smile' },
  ],
  dentalServicesEn: [
    { name: 'Teeth Whitening',       icon: 'Sparkles' },
    { name: 'Root Canal Treatment',  icon: 'Activity' },
    { name: 'Braces & Alignment',    icon: 'Smile' },
  ],
  skinServicesBn: [
    { name: 'ফেসিয়াল ট্রিটমেন্ট', icon: 'Sparkles' },
    { name: 'ব্রণ সমাধান',         icon: 'Target' },
    { name: 'স্কিন গ্লো থেরাপি',   icon: 'Droplets' },
  ],
  skinServicesEn: [
    { name: 'Facial Treatment',   icon: 'Sparkles' },
    { name: 'Acne Solution',      icon: 'Target' },
    { name: 'Skin Glow Therapy',  icon: 'Droplets' },
  ],
};

const labels = {
  bn: {
    title: 'আমাদের', titleSpan: 'সেবা',
    subtitle: 'আপনার জন্য পেশাদার যত্ন',
    dentalTitle: 'ডেন্টাল কেয়ার',
    skinTitle: 'স্কিন কেয়ার',
  },
  en: {
    title: 'Our', titleSpan: 'Services',
    subtitle: 'Professional Care for You',
    dentalTitle: 'Our Dental Care',
    skinTitle: 'Our Aesthetic Skin Care',
  },
};

const Service = ({ lang = 'bn' }) => {
  const [d, setD] = useState(defaults);

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        servicesImage1:  r.servicesImage1  || defaults.servicesImage1,
        servicesImage2:  r.servicesImage2  || defaults.servicesImage2,
        dentalServicesBn: r.dentalServicesBn?.length ? r.dentalServicesBn : defaults.dentalServicesBn,
        dentalServicesEn: r.dentalServicesEn?.length ? r.dentalServicesEn : defaults.dentalServicesEn,
        skinServicesBn:   r.skinServicesBn?.length   ? r.skinServicesBn   : defaults.skinServicesBn,
        skinServicesEn:   r.skinServicesEn?.length   ? r.skinServicesEn   : defaults.skinServicesEn,
      });
    }).catch(() => {});
  }, []);

  const l = labels[lang] || labels['en'];
  const isBn = lang === 'bn';
  const dentalServices = isBn ? d.dentalServicesBn : d.dentalServicesEn;
  const skinServices   = isBn ? d.skinServicesBn   : d.skinServicesEn;

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] mb-2 uppercase tracking-tight">
            {l.title} <span className="text-[#D4AF37]">{l.titleSpan}</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">{l.subtitle}</p>
          <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Dental Care */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-10 border-b-2 border-gray-100 pb-4">
              <div className="bg-gray-50 p-3 rounded-2xl">
                <SafeIcon name="Stethoscope" size={28} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase italic">{l.dentalTitle}</h3>
            </div>

            <div className="space-y-6 mb-12 pl-4">
              {dentalServices.map((service, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <SafeIcon name={service.icon} size={22} />
                  </div>
                  <span className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500">
              <img src={d.servicesImage1} className="w-full h-[350px] object-cover" alt="Dental Care" />
            </div>
          </motion.div>

          {/* Skin Care */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:mt-0 mt-16"
          >
            <div className="flex items-center gap-4 mb-10 border-b-2 border-gray-100 pb-4">
              <div className="bg-gray-50 p-3 rounded-2xl">
                <SafeIcon name="Sparkles" size={28} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase italic">{l.skinTitle}</h3>
            </div>

            <div className="space-y-6 mb-12 pl-4">
              {skinServices.map((service, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <SafeIcon name={service.icon} size={22} />
                  </div>
                  <span className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:-rotate-1 transition-transform duration-500">
              <img src={d.servicesImage2} className="w-full h-[350px] object-cover" alt="Skin Care" />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Service;