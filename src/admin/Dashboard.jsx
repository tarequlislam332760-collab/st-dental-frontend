import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({ totalAppointments: 0, newReviews: 0, totalPatients: 0 });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const resStats = await axios.get('https://st-dental-backend.vercel.app/api/dashboard');
      setStatsData(resStats.data);
      setTempData(resStats.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put('https://st-dental-backend.vercel.app/api/dashboard/update', tempData);
      setStatsData(tempData);
      setIsEditing(false);
      setLoading(false);
      alert(lang === 'bn' ? "আপডেট সফল হয়েছে!" : "Update successful!");
    } catch (err) {
      setLoading(false);
    }
  };

  const t = {
    en: { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients", edit: "Edit Stats", save: "Save", cancel: "Cancel" },
    bn: { title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী", edit: "তথ্য পরিবর্তন", save: "সেভ করুন", cancel: "বাতিল" }
  }[lang];

  return (
    <div className="w-full space-y-8 pb-10">
      {/* Header & Stats Cards */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase italic">{t.title}</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2">
            <Edit3 size={14} /> {t.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2"><Save size={14} /> {t.save}</button>
            <button onClick={() => setIsEditing(false)} className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2"><X size={14} /> {t.cancel}</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { key: "totalAppointments", label: t.s1, val: statsData.totalAppointments, icon: Calendar },
          { key: "newReviews", label: t.s2, val: statsData.newReviews, icon: Star },
          { key: "totalPatients", label: t.s3, val: statsData.totalPatients, icon: Users },
        ].map((s, i) => (
          <div key={i} className="bg-[#111111] p-6 rounded-[24px] border border-[#D4AF37]/10">
            <s.icon className="text-[#D4AF37] mb-4" size={20} />
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">{s.label}</p>
            {isEditing ? (
              <input
                type="number"
                value={tempData[s.key]}
                onChange={(e) => setTempData({ ...tempData, [s.key]: parseInt(e.target.value) || 0 })}
                className="bg-black/50 border border-[#D4AF37]/50 text-[#D4AF37] text-2xl font-black w-full rounded-lg px-2 outline-none"
              />
            ) : (
              <h4 className="text-2xl md:text-4xl font-black text-white">{loading ? "..." : s.val.toLocaleString()}</h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;