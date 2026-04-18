import React, { useState, useEffect } from 'react';
import { Star, Trash2, Edit, Save, X } from 'lucide-react';
import axios from 'axios';

const ManageReviews = ({ lang = 'bn' }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ text: '', rating: 5 });

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

  useEffect(() => { fetchReviews(); }, []);

  const handleDelete = async (id) => {
    const confirmMsg = lang === 'bn' ? "আপনি কি এই রিভিউটি ডিলিট করতে চান?" : "Delete this review?";
    if (window.confirm(confirmMsg)) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/reviews/${id}`);
        fetchReviews(); 
      } catch (err) { alert("Failed to delete review"); }
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://st-dental-backend.vercel.app/api/reviews/${id}`, editData);
      setEditingId(null);
      fetchReviews();
      alert(lang === 'bn' ? "রিভিউ আপডেট হয়েছে" : "Review updated");
    } catch (err) { alert("Update failed"); }
  };

  const t = {
    en: { title: "Patient Reviews", delete: "Delete", noData: "No reviews yet." },
    bn: { title: "রোগীদের রিভিউ", delete: "ডিলিট", noData: "এখনো কোনো রিভিউ নেই।" }
  }[lang];

  return (
    <div className="w-full overflow-hidden">
      <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase mb-6 md:mb-8 tracking-tighter italic">{t.title}</h3>
      {loading ? (
        <div className="flex justify-center py-10"><p className="text-gray-500 italic animate-pulse">Loading reviews...</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-10 border border-dashed border-white/10 rounded-3xl">{t.noData}</p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="bg-[#111111] p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300 flex flex-col justify-between">
                <div>
                  {editingId === rev._id ? (
                    <div className="space-y-3 mb-4">
                      <textarea 
                        className="w-full bg-black/50 border border-[#D4AF37]/30 text-white p-2 rounded-xl text-sm outline-none"
                        value={editData.text}
                        onChange={(e) => setEditData({...editData, text: e.target.value})}
                      />
                      <input 
                        type="number" max="5" min="1"
                        className="bg-black/50 border border-[#D4AF37]/30 text-white p-1 rounded-lg w-16"
                        value={editData.rating}
                        onChange={(e) => setEditData({...editData, rating: parseInt(e.target.value)})}
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex text-[#D4AF37] mb-3 md:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < rev.rating ? "#D4AF37" : "none"} className={i < rev.rating ? "text-[#D4AF37]" : "text-gray-600"} />
                        ))}
                      </div>
                      <p className="text-gray-300 italic mb-6 leading-relaxed text-sm md:text-base break-words">"{rev.text || rev.comment}"</p>
                    </>
                  )}
                </div>
                <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-auto gap-2">
                  <span className="font-bold text-[11px] md:text-sm text-white uppercase tracking-wider truncate">-- {rev.name}</span>
                  <div className="flex gap-2">
                    {editingId === rev._id ? (
                      <>
                        <button onClick={() => handleUpdate(rev._id)} className="text-blue-500"><Save size={18}/></button>
                        <button onClick={() => setEditingId(null)} className="text-gray-500"><X size={18}/></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => {setEditingId(rev._id); setEditData({text: rev.text || rev.comment, rating: rev.rating})}} className="text-yellow-500"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(rev._id)} className="text-red-500"><Trash2 size={16}/></button>
                      </>
                    )}
                  </div>
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