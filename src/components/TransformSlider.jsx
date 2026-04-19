import React from 'react';
import ReactCompareImage from 'react-compare-image';

const TransformSlider = () => {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-4xl font-black text-white uppercase italic leading-none">
              Face & Smile <br /> <span className="text-[#D4AF37]">Aesthetics</span>
            </h2>
            <p className="text-[10px] text-gray-600 uppercase tracking-[4px] mt-4 font-bold">Premium Transformation Results</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dental Slider */}
          <div className="group">
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase mb-4 tracking-widest text-center">Dental Correction</p>
            <div className="rounded-[32px] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <ReactCompareImage 
                leftImage="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800" 
                rightImage="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800"
                sliderLineColor="#D4AF37"
              />
            </div>
          </div>

          {/* Facial Slider */}
          <div className="group">
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase mb-4 tracking-widest text-center">Facial Aesthetic</p>
            <div className="rounded-[32px] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <ReactCompareImage 
                leftImage="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800" 
                rightImage="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800"
                sliderLineColor="#D4AF37"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformSlider;