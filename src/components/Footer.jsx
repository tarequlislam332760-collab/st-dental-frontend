import React from 'react';
import SafeIcon from './SafeIcon';
import { QRCodeSVG } from 'qrcode.react';

const Footer = () => {
  // এখানে আপনার সঠিক Vercel লিঙ্কটি ব্যবহার করুন
  // নিশ্চিত করুন যে ব্রাউজারে এই লিঙ্কটি ওপেন করলে আপনার ওয়েবসাইট দেখা যায়
  const websiteUrl = "https://st-dental-backend.vercel.app"; 

  return (
    <footer className="bg-[#0a0a0a] py-20 px-6 border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        
        {/* লোগো এবং কপিরাইট */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-[14px] text-black font-black shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              SX
            </div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-white italic">
              Suo Xi <span className="text-[#D4AF37]">Hospital</span>
            </h3>
          </div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[3px] text-center md:text-left">
            © 2026 Code & Campaign. <span className="text-[#D4AF37]/50">All rights reserved.</span>
          </p>
        </div>

        {/* ডাইনামিক QR কোড - প্রিমিয়াম স্টাইল */}
        <div className="flex flex-col items-center gap-3 group">
          <div className="p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500">
            <QRCodeSVG 
              value={websiteUrl} 
              size={100} 
              bgColor={"#ffffff"} 
              fgColor={"#000000"} 
              level={"L"} // 'H' থেকে 'L' করা হয়েছে যাতে স্ক্যান দ্রুত হয়
              includeMargin={false}
            />
          </div>
          <p className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[2px] opacity-70 group-hover:opacity-100 transition-opacity">
            Scan to Visit
          </p>
        </div>

        {/* সোশ্যাল মিডিয়া আইকন */}
        <div className="flex gap-4">
          {["Facebook", "Instagram", "Twitter"].map((name, i) => (
            <a 
              key={i} 
              href="#" 
              className="w-14 h-14 bg-[#111111] border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] transition-all duration-500 shadow-lg group"
            >
              <SafeIcon name={name} size={22} className="group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;