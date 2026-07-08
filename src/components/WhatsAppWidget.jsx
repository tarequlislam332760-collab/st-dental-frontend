import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppWidget = () => {
  // আপনার নাম্বারটি স্পেস ছাড়া দিতে হবে
  const phoneNumber = "8801616484616";

  // বাটনে ক্লিক করলে অটোমেটিক যে মেসেজটি লেখা থাকবে
  const message = "Hello, I want to book an appointment at S.T Laser Dental & Skin Care.";
  const encodedMessage = encodeURIComponent(message);

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-8 right-8 z-[999] flex items-center gap-3 bg-[#25D366] p-2 pr-6 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_50px_rgba(37,211,102,0.55)] transition-shadow group active:scale-95"
    >
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-7" alt="WA" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-white leading-none uppercase opacity-80">Online Now</span>
        <span className="text-xs font-black text-white uppercase tracking-tighter">Consult Doctor</span>
      </div>
    </motion.a>
  );
};

export default WhatsAppWidget;
