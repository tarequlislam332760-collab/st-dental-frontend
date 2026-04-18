import React, { useState } from 'react';
import axios from 'axios';

const Appointment = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Select Service'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.service === 'Select Service') {
      alert(lang === 'bn' ? 'দয়া করে একটি সেবা নির্বাচন করুন' : 'Please select a service');
      return;
    }

    try {
      const res = await axios.post('https://st-dental-backend.vercel.app/api/appointments', formData);      
      if (res.data.success) {
        alert(lang === 'bn' ? 'আপনার সিরিয়াল সফলভাবে নিশ্চিত করা হয়েছে!' : 'Appointment confirmed successfully!');
        setFormData({ name: '', phone: '', service: 'Select Service' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert(lang === 'bn' ? 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Sorry, something went wrong. Try again.');
    }
  };

  return (
    // মোবাইলে প্যাডিং কমানো হয়েছে (pt-24 pb-10)
    <section className="pt-24 md:pt-40 pb-10 md:pb-20 px-4 md:px-6 overflow-hidden">
      {/* মোবাইলে rounded-[30px] এবং প্যাডিং p-6 করা হয়েছে */}
      <div className="max-w-2xl mx-auto bg-[#111111] p-6 md:p-12 rounded-[30px] md:rounded-[50px] shadow-2xl border border-[#D4AF37]/20">
        
        {/* টেক্সট সাইজ মোবাইলে ছোট করা হয়েছে */}
        <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8 text-center text-white uppercase italic">
          {lang === 'bn' ? (
            <>অ্যাপয়েন্টমেন্ট <span className="text-[#D4AF37]">নিন</span></>
          ) : (
            <>Get <span className="text-[#D4AF37]">Appointment</span></>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'} 
            className="w-full p-4 rounded-xl md:rounded-2xl bg-[#0a0a0a] text-white border border-white/10 shadow-sm focus:ring-2 ring-[#D4AF37] outline-none placeholder:text-gray-500 text-sm md:text-base" 
          />
          <input 
            type="tel" 
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder={lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} 
            className="w-full p-4 rounded-xl md:rounded-2xl bg-[#0a0a0a] text-white border border-white/10 shadow-sm focus:ring-2 ring-[#D4AF37] outline-none placeholder:text-gray-500 text-sm md:text-base" 
          />
          
          <select 
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            className="w-full p-4 rounded-xl md:rounded-2xl bg-[#0a0a0a] text-white border border-white/10 shadow-sm md:col-span-2 outline-none focus:ring-2 ring-[#D4AF37] text-sm md:text-base"
          >
            <option value="Select Service" disabled>{lang === 'bn' ? 'সেবা নির্বাচন করুন' : 'Select Service'}</option>
            <option value="Dental Care" className="bg-[#111111]">Dental Care</option>
            <option value="Skin Care" className="bg-[#111111]">Skin Care</option>
          </select>

          <button 
            type="submit"
            className="w-full md:col-span-2 bg-[#D4AF37] text-black py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase shadow-lg hover:bg-[#b8972f] transition-all transform active:scale-95 text-sm md:text-base mt-2"
          >
            {lang === 'bn' ? 'সিরিয়াল নিশ্চিত করুন' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Appointment;