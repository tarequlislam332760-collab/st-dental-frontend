import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import axios from 'axios';

const ManageReviews = ({ lang = 'bn' }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ডাটাবেস থেকে রিভিউ নিয়ে আসা
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // রিভিউ ডিলিট করার ফাংশন
  const handleDelete = async (id) => {
    const confirmMsg = lang === 'bn' ? "আপনি কি এই রিভিউটি ডিলিট করতে চান?" : "Delete this review?";
    if (window.confirm(confirmMsg)) {
      try {
await axios.delete(`https://st-dental-backend.vercel.app/api/reviews/${id}`);
        fetchReviews(); // লিস্ট রিফ্রেশ করা
      } catch (err) {
        alert("Failed to delete review");
      }
    }
  };

  const t = {
    en: { title: "Patient Reviews", delete: "Delete", noData: "No reviews yet." },
    bn: { title: "রোগীদের রিভিউ", delete: "ডিলিট", noData: "এখনো কোনো রিভিউ নেই।" }
  }[lang];

  return (
    <div>
      <h3 className="text-2xl font-black text-[#D4AF37] uppercase mb-8">{t.title}</h3>
      
      {loading ? (
        <p className="text-gray-500 italic">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500">{t.noData}</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="bg-[#111111] p-6 rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all">
                
                {/* রেটিং স্টার */}
                <div className="flex text-[#D4AF37] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < rev.rating ? "#D4AF37" : "none"} 
                      className={i < rev.rating ? "text-[#D4AF37]" : "text-gray-600"}
                    />
                  ))}
                </div>

                {/* রোগীর টাইপ করা টেক্সট এখানে দেখা যাবে */}
                {/* আপনার ডাটাবেসে ফিল্ডের নাম 'text' হলে এটি কাজ করবে */}
                <p className="text-gray-300 italic mb-6 leading-relaxed">
                  "{rev.text || rev.comment || rev.message}"
                </p>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="font-bold text-sm text-white uppercase tracking-wider">
                    -- {rev.name}
                  </span>
                  
                  <button 
                    onClick={() => handleDelete(rev._id)}
                    className="text-red-500 flex items-center gap-1 text-xs uppercase font-bold hover:bg-red-500/10 px-2 py-1 rounded transition-all"
                  >
                    <Trash2 size={14}/> {t.delete}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;