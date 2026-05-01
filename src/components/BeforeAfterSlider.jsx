import React, { useState, useEffect } from 'react';
import ReactCompareImage from 'react-compare-image';
import axios from 'axios';

const API = 'https://st-dental-backend.vercel.app/api/site-content/beforeafter';

const defaults = {
  beforeAfterTitleBn: 'সেবার',
  beforeAfterTitleEn: 'Visual',
  beforeAfterSubBn:   'আমাদের দক্ষ চিকিৎসকদের কাজের নমুনা',
  beforeAfterSubEn:   'Real Results from Our Expert Surgeons',
  beforeAfterSliders: [
    {
      labelBn: 'ডেন্টাল সংশোধন', labelEn: 'Dental Correction', caseNo: '01',
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800',
      afterImage:  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
    },
    {
      labelBn: 'ফেসিয়াল নান্দনিকতা', labelEn: 'Facial Aesthetics', caseNo: '02',
      beforeImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800',
      afterImage:  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
    },
  ],
};

const BeforeAfterSlider = ({ lang }) => {
  const [d, setD] = useState(defaults);

  useEffect(() => {
    axios.get(API).then(res => {
      const r = res.data;
      setD({
        beforeAfterTitleBn: r.beforeAfterTitleBn || defaults.beforeAfterTitleBn,
        beforeAfterTitleEn: r.beforeAfterTitleEn || defaults.beforeAfterTitleEn,
        beforeAfterSubBn:   r.beforeAfterSubBn   || defaults.beforeAfterSubBn,
        beforeAfterSubEn:   r.beforeAfterSubEn   || defaults.beforeAfterSubEn,
        beforeAfterSliders: r.beforeAfterSliders?.length ? r.beforeAfterSliders : defaults.beforeAfterSliders,
      });
    }).catch(() => {});
  }, []);

  const title    = lang === 'bn' ? d.beforeAfterTitleBn : d.beforeAfterTitleEn;
  const subtitle = lang === 'bn' ? d.beforeAfterSubBn   : d.beforeAfterSubEn;

  return (
    <section className="py-20 md:py-32 bg-[#0a0a0a] px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            {lang === 'bn' ? (
              <>{d.beforeAfterTitleBn} <span className="text-[#D4AF37]">সাফল্য</span></>
            ) : (
              <>{d.beforeAfterTitleEn} <span className="text-[#D4AF37]">Transformations</span></>
            )}
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full opacity-50"></div>
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[4px] mt-6 font-bold">
            {subtitle}
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {d.beforeAfterSliders.map((slider, i) => (
            <div key={i} className="group space-y-6">
              <div className="flex justify-between items-end border-b border-white/5 pb-2">
                <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">
                  {lang === 'bn' ? slider.labelBn : slider.labelEn}
                </h3>
                <span className="text-[10px] text-gray-600 uppercase italic">
                  Case #{slider.caseNo || String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-[#D4AF37]/30 transition-all duration-500">
                {slider.beforeImage && slider.afterImage ? (
                  <ReactCompareImage
                    leftImage={slider.beforeImage}
                    rightImage={slider.afterImage}
                    sliderLineWidth={3}
                    sliderLineColor="#D4AF37"
                    handleSize={40}
                  />
                ) : (
                  <div className="w-full h-64 bg-white/5 flex items-center justify-center text-gray-600 text-xs uppercase">
                    No Images
                  </div>
                )}
                <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full uppercase font-bold border border-white/10">Before</div>
                <div className="absolute top-4 right-6 bg-[#D4AF37] text-black text-[9px] px-3 py-1 rounded-full uppercase font-bold">After</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BeforeAfterSlider;