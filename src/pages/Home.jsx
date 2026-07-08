import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SafeIcon from '../components/SafeIcon';

import Services from '../sections/Services';
import DentalCare from '../sections/DentalCare';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';
import TransformSlider from '../components/TransformSlider';
import Appointment from '../pages/Appointment';
import WhatsAppWidget from '../components/WhatsAppWidget';
import Blog from '../pages/Blog';

const API = 'https://st-dental-backend.vercel.app/api/site-content/hero';

const Home = ({ lang }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroApi, setHeroApi] = useState(null);

  useEffect(() => {
    axios.get(API).then(res => setHeroApi(res.data)).catch(() => {});
  }, []);

  const isBn = lang === 'bn';

  const heroData = {
    bn: [
      {
        title: (heroApi?.heroTitleBn) || 'সেরা লেজার ডেন্টাল চিকিৎসা',
        sub:   (heroApi?.heroSubBn)   || 'Premium Laser Dental Care',
        desc:  (heroApi?.heroDescBn)  || 'আধুনিক লেজার প্রযুক্তিতে আমরা নিশ্চিত করি আপনার সুন্দর হাসি।',
        img:   (heroApi?.heroImage1)  || 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000',
        link: '/dental-care',
      },
      {
        title: (heroApi?.heroTitleBn) || 'উজ্জ্বল ত্বকের পূর্ণ নিশ্চয়তা',
        sub:   (heroApi?.heroSubBn)   || 'Expert Laser Facial & Skin',
        desc:  (heroApi?.heroDescBn)  || 'আপনার ত্বকের যত্নে আমাদের বিশেষজ্ঞ ডাক্তাররা রয়েছেন।',
        img:   (heroApi?.heroImage2)  || 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
        link: '/skin-care',
      },
    ],
    en: [
      {
        title: (heroApi?.heroTitleEn) || 'Best Laser Dental Care',
        sub:   (heroApi?.heroSubEn)   || 'Premium Laser Dental Care',
        desc:  (heroApi?.heroDescEn)  || 'We ensure your beautiful smile with modern laser technology.',
        img:   (heroApi?.heroImage1)  || 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000',
        link: '/dental-care',
      },
      {
        title: (heroApi?.heroTitleEn) || 'Guaranteed Glowing Skin',
        sub:   (heroApi?.heroSubEn)   || 'Expert Laser Facial & Skin',
        desc:  (heroApi?.heroDescEn)  || 'Our expert doctors are here to take care of your skin.',
        img:   (heroApi?.heroImage2)  || 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000',
        link: '/skin-care',
      },
    ],
  };

  const slides = heroData[lang] || heroData['en'];
  const current = slides[currentSlide];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-0 lg:min-h-screen flex items-center bg-[#0B1220] overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-[#0891B2] rounded-full blur-[140px] opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center w-full relative z-10">
          <motion.div
            key={currentSlide + lang}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#22D3EE] font-black tracking-[5px] text-xs uppercase mb-6 block border-l-4 border-[#0891B2] pl-4">
              {current.sub}
            </span>
            <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">
              {current.title}
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
              {current.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={current.link}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white px-10 py-5 rounded-full font-bold shadow-[0_10px_30px_rgba(8,145,178,0.4)] transition-shadow hover:shadow-[0_10px_40px_rgba(8,145,178,0.6)]"
                >
                  {isBn ? 'বিস্তারিত দেখুন' : 'View Details'}
                </motion.span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
                className="bg-white/5 border-2 border-white/10 text-white px-6 py-5 rounded-full font-bold flex items-center gap-3 hover:border-[#0891B2] transition-all"
              >
                {isBn ? 'অন্যান্য সেবা' : 'Other Services'}
                <SafeIcon name="ArrowRight" size={18} />
              </motion.button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentSlide}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="rounded-[60px] md:rounded-[100px] overflow-hidden shadow-2xl aspect-square border-[12px] border-[#0F1E2E] z-10 relative"
            >
              <img src={current.img} className="w-full h-full object-cover" alt="Clinic Care" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0891B2]/20 to-transparent"></div>
            </motion.div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-6 md:p-8 rounded-[30px] shadow-2xl z-20 border-b-8 border-[#0891B2]">
              <div className="flex items-center gap-4">
                <SafeIcon name="Stethoscope" size={28} className="text-[#0891B2]" />
                <div>
                  <p className="text-2xl font-black leading-none text-[#0F172A]">24/7</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services lang={lang} />
      <TransformSlider lang={lang} />
      <DentalCare lang={lang} />
      <Appointment lang={lang} />
      <Testimonials lang={lang} />
      <Blog lang={lang} />
      <Contact lang={lang} />
      <WhatsAppWidget lang={lang} />
    </div>
  );
};

export default Home;
