import React from 'react';
import ReactCompareImage from 'react-compare-image';
import { motion } from 'framer-motion';

const TransformSlider = ({ lang }) => {
  const t = {
    bn: {
      title: "মুখ ও হাসির",
      titleGold: "নান্দনিকতা",
      sub: "প্রিমিয়াম ট্রান্সফর্মেশন ফলাফল",
      dental: "ডেন্টাল সংশোধন",
      facial: "ফেসিয়াল নান্দনিকতা",
    },
    en: {
      title: "Face & Smile",
      titleGold: "Aesthetics",
      sub: "Premium Transformation Results",
      dental: "Dental Correction",
      facial: "Facial Aesthetic",
    }
  }[lang] || {
    title: "Face & Smile",
    titleGold: "Aesthetics",
    sub: "Premium Transformation Results",
    dental: "Dental Correction",
    facial: "Facial Aesthetic",
  };

  return (
    <section className="py-24 px-6 bg-[#0B1220] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0891B2] opacity-[0.08] blur-[150px] rounded-full"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-left">
            <h2 className="text-4xl font-black text-white uppercase italic leading-none">
              {t.title} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#22D3EE]">{t.titleGold}</span>
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-[4px] mt-4 font-bold">{t.sub}</p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dental Slider */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="group">
            <p className="text-[#22D3EE] text-[10px] font-bold uppercase mb-4 tracking-widest text-center">{t.dental}</p>
            <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:border-[#0891B2]/40">
              <ReactCompareImage
                leftImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800"
                rightImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800"
                sliderLineColor="#0891B2"
              />
            </div>
          </motion.div>
          {/* Facial Slider */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="group">
            <p className="text-[#22D3EE] text-[10px] font-bold uppercase mb-4 tracking-widest text-center">{t.facial}</p>
            <div className="rounded-[32px] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:border-[#0891B2]/40">
              <ReactCompareImage
                leftImage="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800"
                rightImage="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
                sliderLineColor="#0891B2"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransformSlider;
