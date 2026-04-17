import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // লিঙ্ক যুক্ত করা হয়েছে
import * as Lucide from 'lucide-react';

const About = ({ lang }) => {
  const SafeIcon = ({ name, size = 20, className = "" }) => {
    const IconComponent = Lucide[name] || Lucide.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  const stats = [
    { label: lang === 'bn' ? 'বিশেষজ্ঞ ডাক্তার' : 'Specialists', value: '10+', icon: 'UserCheck' },
    { label: lang === 'bn' ? 'সুস্থ রোগী' : 'Happy Patients', value: '5k+', icon: 'Heart' },
    { label: lang === 'bn' ? 'সারক্ষণিক সেবা' : '24/7 Support', value: '24/7', icon: 'Clock' },
  ];

  return (
    <div className="pt-32 pb-20 bg-white text-black overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- মেইন সেকশন --- */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* গোল্ডেন অ্যাকসেন্ট লাইন */}
            <span className="text-[#D4AF37] font-black tracking-[4px] uppercase text-xs mb-4 block border-l-4 border-[#D4AF37] pl-4">
              {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </span>
            
            {/* প্রতিষ্ঠানের নাম: S T LESSER (Black & Gold Text) */}
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-tight uppercase tracking-tighter text-black">
              S T <span className="text-[#D4AF37]">LESSER</span>
            </h2>
            <h3 className="text-xl lg:text-2xl mb-8 text-[#D4AF37] font-medium tracking-[2px] uppercase">
              Dental & Aesthetic Skin Care
            </h3>
            
            <p className="text-xl text-black leading-relaxed mb-8 italic font-serif border-l-2 border-[#D4AF37] pl-6">
              {lang === 'bn' 
                ? '"মৌলভীবাজারে আপনার হাসি এবং ত্বকের সুরক্ষায় আমরা দিচ্ছি আধুনিক প্রযুক্তির ছোঁয়া।"' 
                : '"Bringing modern technology to your smile and skin care in Moulvibazar."'}
            </p>

            <p className="text-gray-600 leading-relaxed mb-10 text-lg">
              {lang === 'bn' 
                ? 'S T LESSER একটি বিশ্বমানের ডেন্টাল এবং এস্থেটিক স্কিন কেয়ার সেন্টার। আমাদের অভিজ্ঞ ডাক্তাররা উন্নত সরঞ্জামের মাধ্যমে প্রতিটি রোগীর সর্বোচ্চ সেবা নিশ্চিত করেন।' 
                : 'S T LESSER is a world-class dental and aesthetic skin care center. Our experienced doctors ensure the highest quality of care using advanced equipment.'}
            </p>

            {/* অ্যাপয়েন্টমেন্ট বাটন - লিঙ্ক সহ */}
            <Link to="/appointment">
              <button className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:bg-black hover:text-[#D4AF37] transition-all transform active:scale-95">
                {lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Get Appointment'}
              </button>
            </Link>
          </motion.div>

          {/* ডান পাশ: ইমেজ ফ্রেম */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[60px] overflow-hidden border-[10px] border-gray-100 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000" 
                alt="S T LESSER Service" 
                className="w-full h-[550px] object-cover"
              />
            </div>
            {/* ডেকোরেটিভ গোল্ডেন এলিমেন্ট */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#D4AF37]/10 rounded-[40px] -z-0"></div>
          </motion.div>
        </div>

        {/* --- স্ট্যাটাস কার্ডস --- */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -15 }}
              className="p-10 bg-white border border-gray-100 rounded-[40px] shadow-xl text-center group transition-all hover:border-[#D4AF37]/30"
            >
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