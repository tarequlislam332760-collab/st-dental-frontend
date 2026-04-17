import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroContent = {
  en: {
    slides: [
      {
        title: "Best Dental Care",
        sub: "Premium Dental Care",
        desc: "We ensure your beautiful smile with modern technology and expert dental solutions.",
        btn: "Get Appointment",
        other: "Other Services",
        img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
      },
      {
        title: "Guaranteed Glowing Skin",
        sub: "Expert Facial & Skin",
        desc: "Our expert doctors are here to take care of your skin with premium aesthetic treatments.",
        btn: "Book Skin Care",
        other: "View All Services",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000"
      }
    ]
  },
  bn: {
    slides: [
      {
        title: "সেরা ডেন্টাল চিকিৎসা",
        sub: "Premium Dental Care",
        desc: "আধুনিক প্রযুক্তিতে আমরা নিশ্চিত করি আপনার সুন্দর হাসি এবং উন্নত ডেন্টাল সেবা।",
        btn: "সিরিয়াল নিন",
        other: "অন্যান্য সেবা",
        img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000"
      },
      {
        title: "উজ্জ্বল ত্বকের পূর্ণ নিশ্চয়তা",
        sub: "Expert Facial & Skin",
        desc: "আপনার ত্বকের যত্নে আমাদের বিশেষজ্ঞ ডাক্তাররা আধুনিক ট্রিটমেন্ট প্রদান করেন।",
        btn: "স্কিন কেয়ার বুক করুন",
        other: "সব সেবা দেখুন",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000"
      }
    ]
  }
};

const Hero = ({ lang, currentSlide, setCurrentSlide }) => {
  const t = (heroContent[lang] || heroContent.en).slides[currentSlide];

  return (
    <section className="relative min-h-[90vh] lg:h-screen flex items-center bg-gray-50 overflow-hidden pt-20 lg:pt-0">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D4AF37]/5 -skew-x-12 transform translate-x-20 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={lang + currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#D4AF37] font-black tracking-[4px] text-[10px] md:text-xs uppercase mb-5 block border-l-4 border-[#D4AF37] pl-4">
              {t.sub}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter text-gray-900">
              {t.title}
            </h1>
            <p className="text-gray-500 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              {t.desc}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/appointment">
                <button className="bg-[#1a1a1a] text-[#D4AF37] border border-[#D4AF37] px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#D4AF37] hover:text-white transition-all flex items-center gap-2 group text-xs md:text-sm uppercase tracking-widest">
                  <Calendar size={18} />
                  {t.btn}
                </button>
              </Link>
              
              <button 
                onClick={() => setCurrentSlide(currentSlide === 0 ? 1 : 0)}
                className="bg-white border-2 border-gray-100 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:border-[#D4AF37] transition-all text-xs md:text-sm uppercase tracking-widest group"
              >
                {t.other} 
                <ArrowRight size={18} className="text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Image */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative z-10 rounded-[40px] md:rounded-[80px] overflow-hidden shadow-2xl aspect-square border-[10px] md:border-[20px] border-white"
            >
              <img 
                src={t.img} 
                alt="Clinic Service" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37] rounded-full blur-[80px] opacity-20 -z-10"></div>
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-[80px] opacity-20 -z-10"></div>
        </div>

      </div>
    </section>
  );
};

export default Hero;