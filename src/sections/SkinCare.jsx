import React from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

const SkinIcon = ({ name, className = "" }) => {
  const Icon = Lucide[name] || Lucide.Zap;
  return <Icon size={24} className={className} />;
};

const SkinCare = ({ lang }) => {
  const features = [
    { icon: "Sun", text: lang === 'bn' ? "সান প্রোটেকশন গাইড" : "Sun Protection Guide" },
    { icon: "Droplets", text: lang === 'bn' ? "হাইড্রেটিং থেরাপি" : "Hydrating Therapy" },
    { icon: "UserCheck", text: lang === 'bn' ? "বিশেষজ্ঞ পরামর্শ" : "Expert Consultation" },
    { icon: "Heart", text: lang === 'bn' ? "ত্বকের গভীর যত্ন" : "Deep Skin Care" }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight tracking-tighter">
              {lang === 'bn' ? 'ত্বকের উজ্জ্বলতায় আমরা সেরা' : 'Best in Aesthetic Skin Care'}
            </h1>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              {lang === 'bn' 
                ? "আমাদের আধুনিক লেজার এবং ফেসিয়াল ট্রিটমেন্ট আপনার ত্বকে ফিরিয়ে আনবে হারানো উজ্জ্বলতা। অভিজ্ঞ ডার্মাটোলজিস্ট দ্বারা পরিচালিত আমাদের এই সেবা আপনার ত্বকের ধরন অনুযায়ী কাস্টমাইজ করা হয়।"
                : "Our modern laser and facial treatments bring back your skin's lost glow. Our services are customized according to your skin type by experienced dermatologists."}
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                    <SkinIcon name={f.icon} />
                  </div>
                  <span className="font-bold text-sm text-gray-700">{f.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000" 
              className="rounded-[60px] shadow-2xl border-[15px] border-white"
              alt="Skin Care"
            />
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