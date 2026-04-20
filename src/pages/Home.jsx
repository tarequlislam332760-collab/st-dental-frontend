import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SafeIcon from '../components/SafeIcon';

// সেকশন ইম্পোর্ট
import Services from '../sections/Services';
import DentalCare from '../sections/DentalCare';
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

// কম্পোনেন্ট ও পেজ ইম্পোর্ট
import TransformSlider from '../components/TransformSlider';
import Appointment from '../pages/Appointment';
import WhatsAppWidget from '../components/WhatsAppWidget';
import Blog from '../pages/Blog'; // ব্লগ পেজটি ইম্পোর্ট করা হয়েছে

const Home = () => {
  const { i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const activeLang = i18n.language?.split('-')[0] || 'en';

  const heroData = {
    bn: [
      { 
        title: "সেরা ডেন্টাল চিকিৎসা", 
        sub: "Premium Dental Care", 
        desc: "আধুনিক প্রযুক্তিতে আমরা নিশ্চিত করি আপনার সুন্দর হাসি।", 
        img: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1000",
        link: "/dental-care"
      },
      { 
        title: "উজ্জ্বল ত্বকের পূর্ণ নিশ্চয়তা", 
        sub: "Expert Facial & Skin", 
        desc: "আপনার ত্বকের যত্নে আমাদের বিশেষজ্ঞ ডাক্তাররা রয়েছেন।", 
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000", 
        link: "/skin-care" 
      }
    ],
    en: [
      { 
        title: "Best Dental Care", 
        sub: "Premium Dental Care", 
        desc: "We ensure your beautiful smile with modern technology.", 
        img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000", 
        link: "/dental-care" 
      },
      { 
        title: "Guaranteed Glowing Skin", 
        sub: "Expert Facial & Skin", 
        desc: "Our expert doctors are here to take care of your skin.", 
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000", 
        link: "/skin-care" 
      }
    ]
  };

  const current = heroData[activeLang] ? heroData[activeLang][currentSlide] : heroData['en'][currentSlide];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-32 lg:pt-0 lg:min-h-screen flex items-center bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center w-full">
          
          <motion.div 
            key={currentSlide + activeLang} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#D4AF37] font-black tracking-[5px] text-xs uppercase mb-6 block border-l-4 border-[#D4AF37] pl-4">
              {current.sub}
            </span>
            <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-[#1a1a1a]">
              {current.title}
            </h2>
            <p className="text-gray-500 text-lg mb-10 max-w-lg leading-relaxed">
              {current.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={current.link} className="bg-[#1a1a1a] text-[#D4AF37] px-10 py-5 rounded-full font-bold shadow-2xl hover:bg-[#D4AF37] hover:text-black transition-all transform hover:-translate-y-1">
                {activeLang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}
              </Link>
              <button 
                onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)} 
                className="bg-white border-2 border-gray-100 px-6 py-5 rounded-full font-bold flex items-center gap-3 hover:border-[#D4AF37] transition-all"
              >
                {activeLang === 'bn' ? 'অন্যান্য সেবা' : 'Other Services'} 
                <SafeIcon name="ArrowRight" size={18} />
              </button>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
              key={currentSlide} 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="rounded-[60px] md:rounded-[100px] overflow-hidden shadow-2xl aspect-square border-[12px] border-white z-10 relative"
            >
              <img src={current.img} className="w-full h-full object-cover" alt="Clinic" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* কন্টেন্ট সেকশনসমূহ */}
      <Services lang={activeLang} />
      <TransformSlider lang={activeLang} />
      <DentalCare lang={activeLang} />
      <Appointment lang={activeLang} />
      <Testimonials lang={activeLang} />
      
      {/* ব্লগ সেকশন এখানে যোগ করা হয়েছে */}
      <Blog lang={activeLang} />

      <Contact lang={activeLang} />
      <WhatsAppWidget lang={activeLang} />
    </div>
  );
};

export default Home;