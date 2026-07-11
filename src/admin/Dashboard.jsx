import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang, onNavigate }) => {
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
  }[lang] || { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients", edit: "Edit Stats", save: "Save", cancel: "Cancel" };

  return (
    <div className="w-full space-y-8 pb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-black text-cyan-400 uppercase italic">{t.title}</h3>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}
            className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-cyan-500 hover:text-black transition-all flex items-center gap-2 border border-cyan-500/20">
            <Edit3 size={13} /> {t.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-500 text-black px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
              <Save size={13} /> {t.save}
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
              <X size={13} /> {t.cancel}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { key: "totalAppointments", label: t.s1, val: statsData.totalAppointments, icon: Calendar, color: 'cyan' },
          { key: "newReviews",        label: t.s2, val: statsData.newReviews,        icon: Star,     color: 'teal' },
          { key: "totalPatients",     label: t.s3, val: statsData.totalPatients,     icon: Users,    color: 'blue' },
        ].map((s, i) => (
          <div key={i} className="bg-[#0a1628] p-6 rounded-[20px] border border-cyan-500/10 hover:border-cyan-500/20 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <s.icon className="text-cyan-400" size={18} />
            </div>
            <p className="text-white/30 text-[10px] uppercase font-bold mb-1 tracking-widest">{s.label}</p>
            {isEditing ? (
              <input type="number" value={tempData[s.key]}
                onChange={(e) => setTempData({ ...tempData, [s.key]: parseInt(e.target.value) || 0 })}
                className="bg-black/50 border border-cyan-500/30 text-cyan-400 text-2xl font-black w-full rounded-lg px-2 outline-none" />
            ) : (
              <h4 className="text-2xl md:text-4xl font-black text-white">
                {loading ? "..." : s.val.toLocaleString()}
              </h4>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
