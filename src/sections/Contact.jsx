import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_CONTENT = 'https://st-dental-backend.vercel.app/api/site-content/contactinfo';
const API_SUBMIT  = 'https://st-dental-backend.vercel.app/api/contact';

const Contact = ({ lang }) => {
  const [info, setInfo] = useState({ phone: '01616484616', address: 'Moulvibazar, Sylhet', whatsapp: '', mapLink: '' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(API_CONTENT).then(res => {
      const r = res.data;
      setInfo({
        phone:    r.phone    || '01616484616',
        address:  r.address  || 'Moulvibazar, Sylhet',
        whatsapp: r.whatsapp || '',
        mapLink:  r.mapLink  || '',
      });
    }).catch(() => {});
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_SUBMIT, formData);
      if (res.data.success) {
        alert(lang === 'bn' ? "ধন্যবাদ! আপনার বার্তা সফলভাবে পাঠানো হয়েছে।" : "Thank you! Your message has been sent successfully.");
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }
    } catch {
      alert(lang === 'bn' ? "দুঃখিত, পুনরায় চেষ্টা করুন।" : "Sorry, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen font-sans">
      <div className="bg-[#0F1E2E] rounded-[50px] p-8 lg:p-16 text-white grid md:grid-cols-2 gap-12 items-center shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#0891B2]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0891B2]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="text-[#22D3EE] font-black tracking-[4px] uppercase text-xs mb-4 block border-l-4 border-[#0891B2] pl-4">
            {lang === 'bn' ? 'যোগাযোগ' : 'Contact'}
          </span>
          <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight uppercase tracking-tighter">
            {lang === 'bn' ? 'আমাদের সাথে' : 'Get In Touch'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0891B2] to-[#22D3EE]">{lang === 'bn' ? 'কথা বলুন' : 'With Us'}</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            {lang === 'bn' ? 'যেকোনো প্রয়োজনে আমাদের কল করুন অথবা সরাসরি ক্লিনিকে চলে আসুন।' : 'For any inquiries, feel free to call us or visit our clinic directly.'}
          </p>

          <div className="space-y-8">
            <motion.a whileHover={{ x: 6 }} href={`tel:${info.phone}`} className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-[#0891B2]/10 border border-[#0891B2]/30 rounded-2xl flex items-center justify-center text-[#22D3EE] group-hover:bg-[#0891B2] group-hover:text-white transition-all duration-300">
                <Lucide.Phone size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-[#22D3EE] tracking-widest">Call Us</p>
                <p className="text-xl font-bold tracking-tight">{info.phone}</p>
              </div>
            </motion.a>

            <motion.div whileHover={{ x: 6 }} className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-[#0891B2]/10 border border-[#0891B2]/30 rounded-2xl flex items-center justify-center text-[#22D3EE] group-hover:bg-[#0891B2] group-hover:text-white transition-all duration-300">
                <Lucide.MapPin size={24} />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-[#22D3EE] tracking-widest">Location</p>
                <p className="text-xl font-bold tracking-tight">{info.address}</p>
              </div>
            </motion.div>

            {info.whatsapp && (
              <motion.a whileHover={{ x: 6 }} href={`https://wa.me/${info.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-[#0891B2]/10 border border-[#0891B2]/30 rounded-2xl flex items-center justify-center text-[#22D3EE] group-hover:bg-[#25D366] group-hover:text-white transition-all duration-300">
                  <Lucide.MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-[#22D3EE] tracking-widest">WhatsApp</p>
                  <p className="text-xl font-bold tracking-tight">{info.whatsapp}</p>
                </div>
              </motion.a>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-[40px] p-8 lg:p-10 text-gray-900 shadow-2xl relative z-10 border-t-8 border-[#0891B2]">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder={lang === 'bn' ? "আপনার নাম" : "Your Name"}
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0891B2] focus:bg-white focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0891B2] focus:bg-white focus:outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs uppercase font-black tracking-widest text-gray-400 mb-2 block ml-2">Message</label>
              <textarea name="message" required value={formData.message} onChange={handleChange}
                placeholder={lang === 'bn' ? "আপনার বার্তা লিখুন..." : "How can we help?"}
                rows="4" className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#0891B2] focus:bg-white focus:outline-none transition-all resize-none"></textarea>
            </div>
            <button type="submit" disabled={loading}
              className={`w-full bg-[#0F1E2E] text-[#22D3EE] py-5 rounded-2xl font-black uppercase tracking-[3px] hover:bg-gradient-to-r hover:from-[#0891B2] hover:to-[#06B6D4] hover:text-white shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 ${loading ? 'opacity-50' : ''}`}>
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
