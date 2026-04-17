import React, { useState } from 'react';
import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios'; // axios অবশ্যই ইনস্টল থাকতে হবে

const Contact = ({ lang }) => {
  // ১. ফর্ম স্টেট ডিক্লেয়ার করা
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry', // ডিফল্ট সাবজেক্ট
    message: ''
  });

  const [loading, setLoading] = useState(false);

  // ২. ইনপুট হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. ফর্ম সাবমিট হ্যান্ডলার (ব্যাকএন্ড কানেকশন)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // আপনার ব্যাকএন্ড এন্ডপয়েন্ট (index.js এ যা সেট করেছেন)

      const res = await axios.post('https://st-dental-backend.vercel.app/api/contact', formData);
      if (res.data.success) {
        alert(lang === 'bn' ? "ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।" : "Thank you! Your message has been sent successfully.");
        // ফর্ম রিসেট করা
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(lang === 'bn' ? "দুঃখিত, পুনরায় চেষ্টা করুন।" : "Sorry, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen font-sans">
      <div className="bg-[#111111] rounded-[50px] p-8 lg:p-16 text-white grid md:grid-cols-2 gap-12 items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#D4AF37]/20 relative overflow-hidden">
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <span className="text-[#D4AF37] font-black tracking-[4px] uppercase text-xs mb-4 block border-l-4 border-[#D4AF37] pl-4">
            {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </span>
          
          <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            {lang === 'bn' ? 'আমাদের সাথে' : 'Get In Touch'} <br/>
            <span className="text-[#D4AF37]">{lang === 'bn' ? 'কথা বলুন' : 'With Us'}</span>
          </h2>
          
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            {lang === 'bn' 
              ? 'যেকোনো প্রয়োজনে আমাদের কল করুন অথবা সরাসরি ক্লিনিকে চলে আসুন।' 
              : 'For any inquiries, feel free to call us or visit our clinic directly.'}
          </p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                <Lucide.Phone size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest">Call Us</p>
                <p className="text-xl font-bold tracking-tight">01732-483149</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                <Lucide.MapPin size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest">Location</p>
                <p className="text-xl font-bold tracking-tight">Moulvibazar, Sylhet</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* ফর্ম সেকশন */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] p-8 lg:p-10 text-gray-900 shadow-2xl relative z-10 border-t-8 border-[#D4AF37]"
        >
          {/* handleSubmit এখানে যুক্ত করা হয়েছে */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={lang === 'bn' ? "আপনার নাম" : "Your Name"} 
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com" 
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition-all" 
              />
            </div>
            
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Message</label>
              <textarea 
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder={lang === 'bn' ? "আপনার বার্তা লিখুন..." : "How can we help?"} 
                rows="4" 
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#D4AF37] focus:bg-white focus:outline-none transition-all resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-[#111111] text-[#D4AF37] py-5 rounded-2xl font-black uppercase tracking-[3px] hover:bg-[#D4AF37] hover:text-black shadow-lg shadow-black/10 transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? (lang === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (lang === 'bn' ? 'বার্তা পাঠান' : 'Send Message')}
              {!loading && <Lucide.Send size={18} />}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;