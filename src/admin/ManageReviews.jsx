import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import axios from 'axios';

const ManageReviews = ({ lang = 'bn' }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://st-dental-backend.vercel.app/api/reviews');
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

  const handleDelete = async (id) => {
    const confirmMsg = lang === 'bn' ? "আপনি কি এই রিভিউটি ডিলিট করতে চান?" : "Delete this review?";
    if (window.confirm(confirmMsg)) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/reviews/${id}`);
        fetchReviews(); 
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
    <div className="w-full">
      {/* শিরোনাম - মোবাইলে টেক্সট সাইজ ছোট করা হয়েছে */}
      <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase mb-6 md:mb-8 tracking-tighter italic">
        {t.title}
      </h3>

      {loading ? (
        <div className="flex justify-center py-10">
          <p className="text-gray-500 italic animate-pulse">Loading reviews...</p>
        </div>
      ) : (
        /* গ্রিড: মোবাইলে ১টি, ট্যাবলেটে ২টি, এবং বড় স্ক্রিনে ৩টি কলাম (ইচ্ছানুসারে) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-10 border border-dashed border-white/10 rounded-3xl">
              {t.noData}
            </p>
          ) : (
            reviews.map((rev) => (
              <div 
                key={rev._id} 
                className="bg-[#111111] p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* স্টার রেটিং */}
                  <div className="flex text-[#D4AF37] mb-3 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < rev.rating ? "#D4AF37" : "none"} 
                        className={i < rev.rating ? "text-[#D4AF37]" : "text-gray-600"}
                      />
                    ))}
                  </div>

                  {/* রিভিউ টেক্সট - মোবাইলে ফন্ট সাইজ সামঞ্জস্যপূর্ণ করা হয়েছে */}
                  <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base">
                    "{rev.text || rev.comment || rev.message}"
                  </p>
                </div>

                {/* নিচের অংশ: নাম এবং ডিলিট বাটন */}
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto">
                  <span className="font-bold text-[12px] md:text-sm text-white uppercase tracking-wider truncate mr-2">
                    -- {rev.name}
                  </span>
                  
                  <button 
                    onClick={() => handleDelete(rev._id)} 
                    className="text-red-500 flex items-center gap-1.5 text-[10px] md:text-xs uppercase font-black hover:bg-red-500/10 px-3 py-2 rounded-xl transition-all border border-red-500/10"
                  >
                    <Trash2 size={14}/> 
                    <span className="hidden xs:inline">{t.delete}</span>
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