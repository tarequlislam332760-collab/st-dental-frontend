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
  aboutDescBn: 'S.T Laser Dental & Skin Care একটি বিশ্বমানের লেজার ডেন্টাল এবং এস্থেটিক স্কিন কেয়ার সেন্টার।',
  aboutDescEn: 'S.T Laser Dental & Skin Care is a world-class laser dental and aesthetic skin care center.',
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
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-[#0891B2] font-black tracking-[4px] uppercase text-xs mb-4 block border-l-4 border-[#0891B2] pl-4">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </span>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight uppercase tracking-tighter text-[#0F172A]">
              S.T <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#22D3EE]">LASER</span>
            </h2>
            <h3 className="text-xl lg:text-2xl mb-8 text-[#0891B2] font-medium tracking-[2px] uppercase">
              Dental &amp; Skin Care
            </h3>
            <p className="text-gray-600 leading-relaxed mb-10 text-lg">{desc}</p>
            <Link to="/appointment">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white px-12 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(8,145,178,0.3)] hover:shadow-[0_10px_40px_rgba(8,145,178,0.5)] transition-all">
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Get Appointment'}
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-[60px] overflow-hidden border-[10px] border-gray-100 shadow-2xl relative z-10">
              <img src={d.aboutImage} alt="About" className="w-full h-[550px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0891B2]/15 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#0891B2]/10 rounded-[40px] -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#22D3EE]/10 rounded-full blur-2xl -z-0"></div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -15 }}
              className="p-10 bg-white border border-gray-100 rounded-[40px] shadow-xl text-center group transition-all hover:border-[#0891B2]/30 hover:shadow-[0_20px_50px_rgba(8,145,178,0.15)]"
            >
              <div className="w-16 h-16 bg-[#0891B2]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-br group-hover:from-[#0891B2] group-hover:to-[#06B6D4] transition-all">
                <SafeIcon name={stat.icon} size={30} className="text-[#0891B2] group-hover:text-white transition-colors" />
              </div>
              <p className="text-5xl font-black text-[#0F172A] mb-2 tracking-tighter group-hover:text-[#0891B2] transition-colors">{stat.value}</p>
              <p className="text-sm font-bold uppercase text-gray-400 tracking-[3px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
