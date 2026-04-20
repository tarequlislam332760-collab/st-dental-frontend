import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({
    totalAppointments: 0,
    newReviews: 0,
    totalPatients: 0
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // এডিট মোড ট্র্যাকিং
  const [tempData, setTempData] = useState({}); // সাময়িক ডেটা সেভ করার জন্য

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://st-dental-backend.vercel.app/api/dashboard');
      setStatsData(res.data);
      setTempData(res.data); // এডিট করার জন্য কপি রাখা
      setLoading(false);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  // ডেটা আপডেট করার ফাংশন
  const handleUpdate = async () => {
    try {
      setLoading(true);
      // ব্যাকএন্ডে আপডেট পাঠানোর জন্য (আপনার ব্যাকএন্ডে এই রুটটি থাকতে হবে)
      await axios.put('https://st-dental-backend.vercel.app/api/dashboard/update', tempData);
      setStatsData(tempData);
      setIsEditing(false);
      setLoading(false);
      alert("Dashboard updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setLoading(false);
      alert("Failed to update stats.");
    }
  };

  const t = {
    en: { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients", edit: "Edit Stats", save: "Save", cancel: "Cancel" },
    bn: { title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী", edit: "তথ্য পরিবর্তন", save: "সেভ করুন", cancel: "বাতিল" }
  }[lang];

  const stats = [
    { key: "totalAppointments", label: t.s1, value: statsData.totalAppointments, icon: Calendar },
    { key: "newReviews", label: t.s2, value: statsData.newReviews, icon: Star },
    { key: "totalPatients", label: t.s3, value: statsData.totalPatients, icon: Users },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase tracking-tighter italic">
          {t.title}
        </h3>
        
        {/* এডিট বাটন */}
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
          >
            <Edit3 size={14} /> {t.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleUpdate}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
            >
              <Save size={14} /> {t.save}
            </button>
            <button 
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"
            >
              <X size={14} /> {t.cancel}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111111] p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-[#D4AF37]/10 relative group hover:border-[#D4AF37]/30 transition-all duration-300">
            <s.icon className="text-[#D4AF37] mb-3 md:mb-4" size={20} />
            <p className="text-gray-500 text-[10px] md:text-xs uppercase font-bold mb-1">{s.label}</p>
            
            {isEditing ? (
              <input 
                type="number"
                value={tempData[s.key]}
                onChange={(e) => setTempData({...tempData, [s.key]: parseInt(e.target.value) || 0})}
                className="bg-black/50 border border-[#D4AF37]/50 text-[#D4AF37] text-2xl md:text-3xl font-black w-full rounded-lg px-2 py-1 outline-none focus:border-[#D4AF37]"
              />
            ) : (
              <h4 className="text-2xl md:text-4xl font-black text-white">
                {loading ? "..." : s.value.toLocaleString()}
              </h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;