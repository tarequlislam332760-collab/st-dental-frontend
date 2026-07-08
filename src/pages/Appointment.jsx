import React, { useState } from 'react';
import axios from 'axios';

const Appointment = ({ lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: 'Select Department',
    date: '',
    time: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.department === 'Select Department' || !formData.time) {
      alert(lang === 'bn' ? 'দয়া করে বিভাগ এবং সময় নির্বাচন করুন' : 'Please select department and time slot');
      return;
    }

    setLoading(true);

    try {
      const dataToSubmit = {
        name: formData.name,
        phone: formData.phone,
        service: formData.department,
        appointmentDate: formData.date,
        timeSlot: formData.time
      };

      const res = await axios.post('https://st-dental-backend.vercel.app/api/appointments', dataToSubmit, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.data.success) {
        alert(lang === 'bn' ? 'আপনার সিরিয়াল সফলভাবে নিশ্চিত করা হয়েছে!' : 'Appointment confirmed successfully!');
        setFormData({ name: '', phone: '', department: 'Select Department', date: '', time: '' });
      }
    } catch (error) {
      console.error('Submission Error Details:', error.response?.data);
      const errorMsg = error.response?.data?.message || (lang === 'bn' ? 'দুঃখিত, কোনো সমস্যা হয়েছে।' : 'Sorry, something went wrong.');
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-24 md:pt-40 pb-16 px-4 overflow-hidden bg-[#0B1220]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#0891B2] opacity-[0.08] blur-[130px] pointer-events-none animate-pulse"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#06B6D4] opacity-[0.05] blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-[#0F1E2E] p-6 md:p-12 rounded-[35px] md:rounded-[60px] shadow-2xl border border-[#0891B2]/20 backdrop-blur-sm transition-all duration-500 hover:border-[#0891B2]/40 hover:shadow-[0_0_60px_rgba(8,145,178,0.15)]">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              {lang === 'bn' ? (
                <>অ্যাপয়েন্টমেন্ট <span className="text-[#22D3EE]">নিন</span></>
              ) : (
                <>Premium <span className="text-[#22D3EE]">Booking</span></>
              )}
            </h2>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[4px] mt-3">
              {lang === 'bn' ? 'লেজার ডেন্টাল এবং স্কিন কেয়ার' : 'Laser Dental & Skin Care'}
            </p>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#0891B2] to-transparent mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#22D3EE] font-bold ml-1">Full Name</label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="John Doe"
                className="w-full p-4 md:p-5 rounded-2xl bg-black/40 text-white border border-white/5 focus:border-[#0891B2] focus:shadow-[0_0_15px_rgba(8,145,178,0.25)] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#22D3EE] font-bold ml-1">Phone Number</label>
              <input
                type="tel"
                required
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+880 1XXX-XXXXXX"
                className="w-full p-4 md:p-5 rounded-2xl bg-black/40 text-white border border-white/5 focus:border-[#0891B2] focus:shadow-[0_0_15px_rgba(8,145,178,0.25)] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#22D3EE] font-bold ml-1">Select Department</label>
              <select
                value={formData.department}
                required
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/40 text-gray-300 border border-white/5 focus:border-[#0891B2] outline-none transition-all appearance-none"
              >
                <option value="Select Department" disabled>{lang === 'bn' ? 'বিভাগ নির্বাচন করুন' : 'Select Department'}</option>
                <option value="Dental Care">Dental Care (Teeth)</option>
                <option value="Laser Skin Care">Laser Skin Care (Face)</option>
                <option value="Maxillofacial Surgery">Maxillofacial Surgery</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#22D3EE] font-bold ml-1">Preferred Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/40 text-gray-300 border border-white/5 focus:border-[#0891B2] outline-none transition-all"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[9px] uppercase tracking-[2px] text-[#22D3EE] font-bold ml-1">
                {lang === 'bn' ? 'পছন্দমতো সময় নির্বাচন করুন' : 'Select Your Preferred Time'}
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full p-4 md:p-5 rounded-2xl bg-black/40 text-gray-300 border border-white/5 focus:border-[#0891B2] outline-none transition-all cursor-pointer"
              />
              <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1 ml-1">
                * Please select a time during hospital hours (e.g., 10:00 AM - 08:00 PM)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full md:col-span-2 bg-gradient-to-r from-[#0891B2] to-[#06B6D4] text-white py-5 rounded-[20px] font-black uppercase shadow-[0_10px_40px_rgba(8,145,178,0.3)] hover:shadow-[0_10px_50px_rgba(8,145,178,0.5)] hover:scale-[1.02] transition-all duration-300 transform active:scale-95 mt-4 tracking-widest ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (lang === 'bn' ? 'অপেক্ষা করুন...' : 'Processing...') : (lang === 'bn' ? 'সিরিয়াল নিশ্চিত করুন' : 'Confirm Appointment')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
