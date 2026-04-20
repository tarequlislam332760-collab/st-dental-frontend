import React from 'react';

const WhatsAppWidget = () => {
  // আপনার নাম্বারটি স্পেস ছাড়া দিতে হবে
  const phoneNumber = "8801711023730"; 
  
  // বাটনে ক্লিক করলে অটোমেটিক যে মেসেজটি লেখা থাকবে
  const message = "Hello Doctor, I want to book an appointment.";
  const encodedMessage = encodeURIComponent(message);

  return (
    <a 
      href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer" // সিকিউরিটির জন্য এটি থাকা ভালো
      className="fixed bottom-8 right-8 z-[999] flex items-center gap-3 bg-[#25D366] p-2 pr-6 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-all group active:scale-95"
    >
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center animate-pulse">
         <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-7" alt="WA" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-white leading-none uppercase opacity-80">Online Now</span>
        <span className="text-xs font-black text-white uppercase tracking-tighter">Consult Doctor</span>
      </div>
    </a>
  );
};

export default WhatsAppWidget;