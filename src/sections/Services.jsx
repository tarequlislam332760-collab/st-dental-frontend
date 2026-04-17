import React from 'react';
import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';

// --- ভাষার ডাটাবেস (আপনার মেইন অ্যাপের সাথে মিল রেখে) ---
const serviceTranslations = {
  en: {
    title: "Our",
    titleSpan: "Services",
    subtitle: "Professional Care for You",
    dentalTitle: "Our Dental Care",
    skinTitle: "Our Aesthetic Skin Care",
    dentalList: ["Teeth Whitening", "Root Canal Treatment", "Braces & Alignment"],
    skinList: ["Facial Treatment", "Acne Solution", "Skin Glow Therapy"]
  },
  bn: {
    title: "আমাদের",
    titleSpan: "সেবা",
    subtitle: "আপনার জন্য পেশাদার যত্ন",
    dentalTitle: "ডেন্টাল কেয়ার",
    skinTitle: "স্কিন কেয়ার",
    dentalList: ["দাঁত সাদা করা", "রুট ক্যানেল ট্রিটমেন্ট", "ব্রেসেস এবং অ্যালাইনমেন্ট"],
    skinList: ["ফেসিয়াল ট্রিটমেন্ট", "একনি সলিউশন", "স্কিন গ্লো থেরাপি"]
  },
  ar: {
    title: "خدماتنا",
    titleSpan: "المتميزة",
    subtitle: "عناية احترافية لك",
    dentalTitle: "عناية بالأسنان",
    skinTitle: "العناية بالبشرة",
    dentalList: ["تبييض الأسنان", "علاج قناة الجذر", "تقويم الأسنان"],
    skinList: ["علاج الوجه", "حل حب الشباب", "علاج توهج البشرة"]
  }
};

const Service = ({ lang = 'bn' }) => {
  // প্রপস থেকে আসা ল্যাংগুয়েজ অনুযায়ী ডাটা সিলেক্ট করা
  const s = serviceTranslations[lang] || serviceTranslations['en'];

  // ব্যানারের স্টাইল অনুযায়ী আইকন রেন্ডারিং ফাংশন
  const SafeIcon = ({ name, size = 20, className = "" }) => {
    const IconComponent = Lucide[name] || Lucide.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  // ডেন্টাল সার্ভিস লিস্ট
  const dentalServices = [
    { name: s.dentalList[0], icon: "Sparkle" },
    { name: s.dentalList[1], icon: "Activity" },
    { name: s.dentalList[2], icon: "Smile" }
  ];

  // স্কিন কেয়ার সার্ভিস লিস্ট
  const skinServices = [
    { name: s.skinList[0], icon: "UserCircle" },
    { name: s.skinList[1], icon: "Target" },
    { name: s.skinList[2], icon: "Droplets" }
  ];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* মেইন হেডার - ব্ল্যাক এবং গোল্ডেন কালার */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-[#1a1a1a] mb-2 uppercase tracking-tight">
            {s.title} <span className="text-[#D4AF37]">{s.titleSpan}</span>
          </h2>
          <p className="text-gray-400 font-medium tracking-widest uppercase text-xs">{s.subtitle}</p>
          <div className="w-24 h-1.5 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* সার্ভিস গ্রিড */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- বাম পাশ: Our Dental Care --- */}
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
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase italic">{s.dentalTitle}</h3>
            </div>
            
            <div className="space-y-6 mb-12 pl-4">
              {dentalServices.map((service, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <SafeIcon name={service.icon} size={22} />
                  </div>
                  {/* সার্ভিসের নাম - ব্ল্যাক, হোভারে গোল্ডেন */}
                  <span className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1000" 
                className="w-full h-[350px] object-cover" 
                alt="Dental Care" 
              />
            </div>
          </motion.div>

          {/* --- ডান পাশ: Our Aesthetic Skin Care --- */}
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
              <h3 className="text-2xl font-black text-[#1a1a1a] uppercase italic">{s.skinTitle}</h3>
            </div>
            
            <div className="space-y-6 mb-12 pl-4">
              {skinServices.map((service, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <SafeIcon name={service.icon} size={22} />
                  </div>
                  {/* সার্ভিসের নাম - ব্ল্যাক, হোভারে গোল্ডেন */}
                  <span className="text-xl font-bold text-[#1a1a1a] group-hover:text-[#D4AF37] transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl border-4 border-white transform hover:-rotate-1 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000" 
                className="w-full h-[350px] object-cover" 
                alt="Skin Care" 
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Service;