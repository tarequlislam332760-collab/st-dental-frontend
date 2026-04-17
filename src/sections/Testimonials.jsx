import React, { useState, useEffect } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const content = {
  en: { 
    title: "Patient Stories", 
    sub: "What our patients say",
    writeTitle: "Share Your Experience",
    btnText: "Submit Review",
    placeholder: "Write your feedback here..."
  },
  bn: { 
    title: "রোগীদের কথা", 
    sub: "আমাদের সম্পর্কে রোগীদের মতামত",
    writeTitle: "আপনার অভিজ্ঞতা শেয়ার করুন",
    btnText: "রিভিউ দিন",
    placeholder: "আপনার মতামত এখানে লিখুন..."
  }
};

const Testimonials = ({ lang = 'bn' }) => {
  const t = content[lang] || content.en;
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert(lang === 'bn' ? "দয়া করে একটি রেটিং দিন!" : "Please select a rating!");
      return;
    }

    // ব্যাকএন্ড মডেলে 'text' ফিল্ড আছে, তাই এখানে 'text: reviewText' পাঠানো হয়েছে
    const formData = { name, text: reviewText, rating };

    try {
const res = await axios.post('https://st-dental-backend.vercel.app/api/reviews', formData);      
      if (res.status === 201 || res.status === 200) {
        alert(lang === 'bn' ? "ধন্যবাদ! আপনার রিভিউটি জমা হয়েছে।" : "Thank you! Your review has been submitted.");
        setName("");
        setReviewText("");
        setRating(0);
        fetchReviews();
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert(lang === 'bn' ? "দুঃখিত! রিভিউ জমা দেওয়া সম্ভব হয়নি।" : "Sorry! Could not submit the review.");
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black mb-4 text-[#111111] uppercase tracking-tighter"
          >
            {t.title.split(' ')[0]} <span className="text-[#D4AF37]">{t.title.split(' ')[1]}</span>
          </motion.h2>
          <p className="text-[#D4AF37] text-xs uppercase tracking-[5px] font-bold">{t.sub}</p>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {reviews.map((r, i) => (
                <motion.div 
                  key={r._id || i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative group"
                >
                  <Quote className="absolute top-6 right-8 text-[#D4AF37]/10 group-hover:text-[#D4AF37]/30 transition-colors" size={60} />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, index) => (
                      <Star 
                        key={index} 
                        size={16} 
                        fill={index < r.rating ? "#D4AF37" : "none"} 
                        className={index < r.rating ? "text-[#D4AF37]" : "text-gray-200"} 
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 italic mb-8 text-lg leading-relaxed relative z-10">"{r.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#111111] rounded-2xl flex items-center justify-center font-black text-[#D4AF37] shadow-lg">
                      {r.name ? r.name.charAt(0) : "P"}
                    </div>
                    <h4 className="font-black text-[#111111] uppercase tracking-tight">{r.name}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#111111] rounded-[50px] p-8 lg:p-10 border border-[#D4AF37]/30 shadow-2xl relative"
          >
            <h3 className="text-[#D4AF37] text-2xl font-black mb-8 uppercase tracking-tighter">
              {t.writeTitle}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Select Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="transition-transform active:scale-90"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star 
                        size={28} 
                        fill={(hover || rating) >= star ? "#D4AF37" : "none"}
                        className={(hover || rating) >= star ? "text-[#D4AF37]" : "text-gray-600"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'bn' ? "আপনার নাম" : "Your Name"}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37] transition-all"
              />

              <textarea 
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={t.placeholder}
                rows="4"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
              ></textarea>

              <button 
                type="submit"
                className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all duration-300"
              >
                {t.btnText} <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;