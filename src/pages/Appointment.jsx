import React, { useState } from 'react';
import axios from 'axios';

const Appointment = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Select Department',
    date: '',
    time: '' // এখানে এখন পেশেন্টের সিলেক্ট করা টাইম সেভ হবে
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.department === 'Select Department' || !formData.time) {
      alert(lang === 'bn' ? 'দয়া করে বিভাগ এবং সময় নির্বাচন করুন' : 'Please select department and time slot');
      return;
    }

    try {
      // API call with headers to ensure JSON parsing
      const res = await axios.post('https://st-dental-backend.vercel.app/api/appointments', formData, {
        headers: { 'Content-Type': 'application/json' }
      });      
      
      if (res.status === 201 || res.data.success) {
        alert(lang === 'bn' ? 'আপনার সিরিয়াল সফলভাবে নিশ্চিত করা হয়েছে!' : 'Appointment confirmed successfully!');
        setFormData({ name: '', phone: '', department: 'Select Department', date: '', time: '' });
      }
    } catch (error) {
      console.error('Error:', error);
      alert(lang === 'bn' ? 'দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।' : 'Sorry, something went wrong. Try again.');
    }
  };

  return (
    <section className="relative pt-24 md:pt-40 pb-16 px-4 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#D4AF37] opacity-[0.05] blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#111111] p-6 md:p-12 rounded-[35px] md:rounded-[60px] shadow-2xl border border-[#D4AF37]/10">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {lang === 'bn' ? (
                <>অ্যাপয়েন্টমেন্ট <span className="text-[#D4AF37]">নিন</span></>
              ) : (
                <>Premium <span className="text-[#D4AF37]">Booking</span></>
              )}
            </h2>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[4px] mt-3">
              {lang === 'bn' ? 'ডেন্টাল এবং ফেসিয়াল এসথেটিক্স' : 'Advanced Dental & Facial Aesthetics'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#D4AF37] font-bold ml-1">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe" 
                className="w-full p-4 md:p-5 rounded-2xl bg-black/50 text-white border border-white/5 focus:border-[#D4AF37] outline-none transition-all" 
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#D4AF37] font-bold ml-1">Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+880 1XXX-XXXXXX" 
                className="w-full p-4 md:p-5 rounded-2xl bg-black/50 text-white border border-white/5 focus:border-[#D4AF37] outline-none transition-all" 
              />
            </div>

            {/* Department Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#D4AF37] font-bold ml-1">Select Department</label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/50 text-gray-400 border border-white/5 focus:border-[#D4AF37] outline-none transition-all appearance-none"
              >
                <option value="Select Department" disabled>{lang === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Department'}</option>
                <option value="Dental Care">Dental Care (Teeth)</option>
                <option value="Facial Aesthetic">Facial Aesthetic (Skin/Face)</option>
                <option value="Maxillofacial Surgery">Maxillofacial Surgery</option>
              </select>
            </div>

            {/* Date Selection */}
            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#D4AF37] font-bold ml-1">Preferred Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/50 text-gray-400 border border-white/5 focus:border-[#D4AF37] outline-none transition-all" 
              />
            </div>

            {/* Real-time Time Picker (পেশেন্ট এখন নিজের সময় সেট করতে পারবে) */}
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#D4AF37] font-bold ml-1">
                {lang === 'bn' ? 'পছন্দমতো সময় নির্বাচন করুন' : 'Select Your Preferred Time'}
              </label>
              <input 
                type="time" 
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/50 text-gray-400 border border-white/5 focus:border-[#D4AF37] outline-none transition-all cursor-pointer" 
              />
              <p className="text-[8px] text-gray-600 uppercase tracking-widest mt-1 ml-1">
                * Please select a time during hospital hours (e.g., 10:00 AM - 08:00 PM)
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full md:col-span-2 bg-[#D4AF37] text-black py-5 rounded-[20px] font-black uppercase shadow-[0_10px_40px_rgba(212,175,55,0.2)] hover:bg-white hover:shadow-white/10 transition-all transform active:scale-95 mt-4 tracking-widest"
            >
              {lang === 'bn' ? 'সিরিয়াল নিশ্চিত করুন' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;