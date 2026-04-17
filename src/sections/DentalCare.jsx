import React from 'react';
import * as Lucide from 'lucide-react';

const DentalCare = ({ lang }) => {
  // আইকন ফাংশন
  const SafeIcon = ({ name, size = 20, className = "" }) => {
    const IconComponent = Lucide[name] || Lucide.HelpCircle;
    return <IconComponent size={size} className={className} />;
  };

  return (
    <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        
        {/* --- ইমেজ সেকশন (ছবি পরিবর্তন করা হয়েছে) --- */}
        <div className="relative group">
          {/* আপনি নিচের URL-টি আপনার পছন্দের ডেন্টাল ক্লিনিক ছবির লিঙ্ক দিয়ে পরিবর্তন করতে পারেন */}
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1000" 
            className="rounded-[60px] shadow-2xl border-[10px] border-gray-50 relative z-10 transition-transform duration-500 group-hover:scale-105 aspect-[4/5] object-cover" 
            alt="Dental Hospital Environment" 
          />
          
          {/* ছবির ওপর একটি ছোট ডেকোরেটিভ ব্যাজ যা আপনার দেওয়া স্ক্রিনশটের মতো ফিল দেবে */}
          <div className="absolute -top-6 -right-6 bg-black text-[#D4AF37] p-5 rounded-3xl z-20 shadow-xl border border-[#D4AF37]/20 hidden md:block">
            <SafeIcon name="Activity" size={30} />
            <p className="text-[10px] font-black mt-2 uppercase">Modern Clinic</p>
          </div>

          {/* ডেকোরেটিভ গোল্ডেন বক্স */}
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-[#D4AF37]/10 rounded-[40px] -z-0"></div>
        </div>
        
        {/* --- কন্টেন্ট সেকশন (একই রাখা হয়েছে) --- */}
        <div className="pt-8 lg:pt-0">
          <span className="text-[#D4AF37] font-black tracking-widest uppercase text-xs mb-3 block border-l-4 border-[#D4AF37] pl-4">
            {lang === 'bn' ? 'বিশ্বমানের ডেন্টাল কেয়ার' : 'World Class Dental Care'}
          </span>
          
          <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight text-black uppercase tracking-tighter">
            {lang === 'bn' ? 'সেরা ডেন্টাল' : 'Premium Dental'} <span className="text-[#D4AF37]">{lang === 'bn' ? 'চিকিৎসা' : 'Care'}</span>
          </h1>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-xl italic font-serif">
            {lang === 'bn' 
              ? 'আমরা মৌলভীবাজারে অত্যাধুনিক প্রযুক্তির মাধ্যমে আপনার দাঁতের সব ধরণের সমস্যার সমাধান নিশ্চিত করি।' 
              : 'We provide comprehensive dental solutions using the latest medical technology.'}
          </p>
          
          {/* --- গোল্ডেন আইকন ও ব্ল্যাক টেক্সট লিস্ট --- */}
          <ul className="space-y-6">
            <li className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-all duration-300 shadow-lg">
                <SafeIcon name="Zap" size={24} className="text-[#D4AF37] group-hover:text-black transition-colors" />
              </div>
              <span className="text-xl font-bold text-black group-hover:text-[#D4AF37] transition-colors tracking-tight">
                {lang === 'bn' ? 'লেজার ডেন্টিস্ট্রি' : 'Laser Dentistry'}
              </span>
            </li>
            
            <li className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-all duration-300 shadow-lg">
                <SafeIcon name="Smile" size={24} className="text-[#D4AF37] group-hover:text-black transition-colors" />
              </div>
              <span className="text-xl font-bold text-black group-hover:text-[#D4AF37] transition-colors tracking-tight">
                {lang === 'bn' ? 'দাঁতের ইমপ্লান্ট' : 'Dental Implants'}
              </span>
            </li>
            
            <li className="flex items-center gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center border border-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition-all duration-300 shadow-lg">
                <SafeIcon name="ShieldCheck" size={24} className="text-[#D4AF37] group-hover:text-black transition-colors" />
              </div>
              <span className="text-xl font-bold text-black group-hover:text-[#D4AF37] transition-colors tracking-tight">
                {lang === 'bn' ? 'ব্যথাহীন চিকিৎসা' : 'Painless Treatment'}
              </span>
            </li>
          </ul>

          {/* গোল্ডেন বাটন কালো টেক্সট সহ */}
          <button className="bg-[#D4AF37] text-black px-12 py-4 rounded-full font-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:bg-black hover:text-[#D4AF37] transition-all mt-12 uppercase tracking-widest text-sm">
            {lang === 'bn' ? 'সিরিয়াল নিন' : 'Get Appointment'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default DentalCare;