import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/about';

const SafeIcon = ({ name, size = 20, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const defaults = {
  aboutDescBn: 'S T LESSER একটি বিশ্বমানের ডেন্টাল এবং এস্থেটিক স্কিন কেয়ার সেন্টার।',
  aboutDescEn: 'S T LESSER is a world-class dental and aesthetic skin care center.',
  aboutImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000',
  aboutStat1Label: 'Specialists', aboutStat1Value: '10+',
  aboutStat2Label: 'Happy Patients', aboutStat2Value: '5k+',
  aboutStat3Label: '24/7 Support', aboutStat3Value: '24/7',
};

const About = ({ lang }) => {
  const [d, setD] = useState(defaults);

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        aboutDescBn: r.aboutDescBn || defaults.aboutDescBn,
        aboutDescEn: r.aboutDescEn || defaults.aboutDescEn,
        aboutImage:  r.aboutImage  || defaults.aboutImage,
        aboutStat1Label: r.aboutStat1Label || defaults.aboutStat1Label,
        aboutStat1Value: r.aboutStat1Value || defaults.aboutStat1Value,
        aboutStat2Label: r.aboutStat2Label || defaults.aboutStat2Label,
        aboutStat2Value: r.aboutStat2Value || defaults.aboutStat2Value,
        aboutStat3Label: r.aboutStat3Label || defaults.aboutStat3Label,
        aboutStat3Value: r.aboutStat3Value || defaults.aboutStat3Value,
      });
    }).catch(() => {});
  }, []);

  const desc = lang === 'bn' ? d.aboutDescBn : d.aboutDescEn;

  const stats = [
    { label: d.aboutStat1Label, value: d.aboutStat1Value, icon: 'UserCheck' },
    { label: d.aboutStat2Label, value: d.aboutStat2Value, icon: 'Heart' },
    { label: d.aboutStat3Label, value: d.aboutStat3Value, icon: 'Clock' },
  ];

  return (
    <div className="pt-32 pb-20 bg-white text-black overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] font-black tracking-[4px] uppercase text-xs mb-4 block border-l-4 border-[#D4AF37] pl-4">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </span>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight uppercase tracking-tighter text-black">
              S T <span className="text-[#D4AF37]">LESSER</span>
            </h2>
            <h3 className="text-xl lg:text-2xl mb-8 text-[#D4AF37] font-medium tracking-[2px] uppercase">
              Dental & Aesthetic Skin Care
            </h3>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">{desc}</p>
            <Link to="/appointment">
              <button className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-black hover:text-[#D4AF37] transition-all transform active:scale-95">
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Get Appointment'}
              </button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
            <div className="rounded-[60px] overflow-hidden border-[10px] border-gray-100 shadow-2xl relative z-10">
              <img src={d.aboutImage} alt="About" className="w-full h-[550px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#D4AF37]/10 rounded-[40px] -z-0"></div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div key={index} whileHover={{ y: -15 }} className="p-10 bg-white border border-gray-100 rounded-[40px] shadow-xl text-center group transition-all hover:border-[#D4AF37]/30">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#D4AF37] transition-all">
                <SafeIcon name={stat.icon} size={30} className="text-[#D4AF37] group-hover:text-black" />
              </div>
              <p className="text-5xl font-black text-black mb-2 tracking-tighter group-hover:text-[#D4AF37] transition-colors">{stat.value}</p>
              <p className="text-sm font-bold uppercase text-gray-400 tracking-[3px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;