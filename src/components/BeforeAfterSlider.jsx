import React from 'react';
import ReactCompareImage from 'react-compare-image';

const BeforeAfterSlider = ({ lang }) => {
  return (
    <section className="py-20 md:py-32 bg-[#0a0a0a] px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            {lang === 'bn' ? (
              <>সেবার <span className="text-[#D4AF37]">সাফল্য</span></>
            ) : (
              <>Visual <span className="text-[#D4AF37]">Transformations</span></>
            )}
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full opacity-50"></div>
          <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[4px] mt-6 font-bold">
            {lang === 'bn' ? 'আমাদের দক্ষ চিকিৎসকদের কাজের নমুনা' : 'Real Results from Our Expert Surgeons'}
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Dental Success Slot */}
          <div className="group space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">Dental Correction</h3>
              <span className="text-[10px] text-gray-600 uppercase italic">Case #01</span>
            </div>
            <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-[#D4AF37]/30 transition-all duration-500">
              <ReactCompareImage 
                leftImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800" // এখানে আপনার অরিজিনাল Before ছবি দিবেন
                rightImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800" // এখানে আপনার অরিজিনাল After ছবি দিবেন
                sliderLineWidth={3}
                sliderLineColor="#D4AF37"
                handleSize={40}
              />
              <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full uppercase font-bold border border-white/10">Before</div>
              <div className="absolute top-4 right-6 bg-[#D4AF37] text-black text-[9px] px-3 py-1 rounded-full uppercase font-bold">After</div>
            </div>
          </div>

          {/* Facial Aesthetic Slot */}
          <div className="group space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-widest">Facial Aesthetics</h3>
              <span className="text-[10px] text-gray-600 uppercase italic">Case #02</span>
            </div>
            <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-[#D4AF37]/30 transition-all duration-500">
              <ReactCompareImage 
                leftImage="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800" // এখানে ফেসিয়াল Before ছবি
                rightImage="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800" // এখানে ফেসিয়াল After ছবি
                sliderLineWidth={3}
                sliderLineColor="#D4AF37"
                handleSize={40}
              />
              <div className="absolute top-4 left-6 bg-black/60 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full uppercase font-bold border border-white/10">Before</div>
              <div className="absolute top-4 right-6 bg-[#D4AF37] text-black text-[9px] px-3 py-1 rounded-full uppercase font-bold">After</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;