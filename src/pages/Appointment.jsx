import React, { useState } from 'react';
import axios from 'axios';

const Appointment = ({ lang }) => {
  // ডাটা হ্যান্ডেল করার জন্য স্টেট
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Select Service'
  });

  // ফর্ম সাবমিট ফাংশন
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (formData.service === 'Select Service') {
      alert(lang === 'bn' ? 'দয়া করে একটি সেবা নির্বাচন করুন' : 'Please select a service');
      return;
    }

    try {
      // ব্যাকএন্ড API-তে ডাটা পাঠানো হচ্ছে
      const res = await axios.post('https://st-dental-backend.vercel.app/api/appointments', formData);      
      
      // এখানে res.data.success চেক করা হচ্ছে (আগে response লেখা ছিল যা ভুল ছিল)
      if (res.data.success) {
        alert(lang === 'bn' ? 'আপনার সিরিয়াল সফলভাবে নিশ্চিত করা হয়েছে!' : 'Appointment confirmed successfully!');
        // ফর্ম ক্লিয়ার করা
        setFormData({ name: '', phone: '', service: 'Select Service' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert(lang === 'bn' ? 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Sorry, something went wrong. Try again.');
    }
  };

  return (
    <section className="pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto bg-[#111111] p-12 rounded-[50px] shadow-2xl border border-[#D4AF37]/20">
        
        <h2 className="text-4xl font-black mb-8 text-center text-white">
          {lang === 'bn' ? (
            <>অ্যাপয়েন্টমেন্ট <span className="text-[#D4AF37]">নিন</span></>
          ) : (
            <>Get <span className="text-[#D4AF37]">Appointment</span></>
          )}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder={lang === 'bn' ? 'আপনার নাম' : 'Your Name'} 
            className="p-4 rounded-2xl bg-[#0a0a0a] text-white border border-white/5 shadow-sm focus:ring-2 ring-[#D4AF37] outline-none placeholder:text-gray-500" 
          />
          <input 
            type="tel" 
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder={lang === 'bn' ? 'ফোন নম্বর' : 'Phone Number'} 
            className="p-4 rounded-2xl bg-[#0a0a0a] text-white border border-white/5 shadow-sm focus:ring-2 ring-[#D4AF37] outline-none placeholder:text-gray-500" 
          />
          
          <select 
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            className="p-4 rounded-2xl bg-[#0a0a0a] text-white border border-white/5 shadow-sm md:col-span-2 outline-none focus:ring-2 ring-[#D4AF37]"
          >
            <option value="Select Service" disabled>{lang === 'bn' ? 'সেবা নির্বাচন করুন' : 'Select Service'}</option>
            <option value="Dental Care" className="bg-[#111111]">Dental Care</option>
            <option value="Skin Care" className="bg-[#111111]">Skin Care</option>
          </select>

          <button 
            type="submit"
            className="md:col-span-2 bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase shadow-lg hover:bg-[#b8972f] transition-all transform active:scale-95"
          >
            {lang === 'bn' ? 'সিরিয়াল নিশ্চিত করুন' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Appointment;