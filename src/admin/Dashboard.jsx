import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X, Clock } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({
    totalAppointments: 0,
    newReviews: 0,
    totalPatients: 0
  });
  const [appointments, setAppointments] = useState([]); // অ্যাপয়েন্টমেন্ট ডাটা রাখার জন্য
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const fetchStats = async () => {
    try {
      setLoading(true);
      // ১. ড্যাশবোর্ড স্ট্যাটাস ফেচ করা
      const resStats = await axios.get('https://st-dental-backend.vercel.app/api/dashboard');
      setStatsData(resStats.data);
      setTempData(resStats.data);

      // ২. রিসেন্ট শিডিউলের জন্য অ্যাপয়েন্টমেন্ট ফেচ করা
      const resApps = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setAppointments(resApps.data);

      setLoading(false);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put('https://st-dental-backend.vercel.app/api/dashboard/update', tempData);
      setStatsData(tempData);
      setIsEditing(false);
      setLoading(false);
      alert(lang === 'bn' ? "ড্যাশবোর্ড আপডেট হয়েছে!" : "Dashboard updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setLoading(false);
      alert("Failed to update stats.");
    }
  };

  const t = {
    en: { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients", edit: "Edit Stats", save: "Save", cancel: "Cancel", recent: "Recent Schedule", viewAll: "View All", noData: "No appointments today" },
    bn: { title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী", edit: "তথ্য পরিবর্তন", save: "সেভ করুন", cancel: "বাতিল", recent: "রিসেন্ট শিডিউল", viewAll: "সবগুলো দেখুন", noData: "আজ কোনো শিডিউল নেই" }
  }[lang];

  const stats = [
    { key: "totalAppointments", label: t.s1, value: statsData.totalAppointments, icon: Calendar },
    { key: "newReviews", label: t.s2, value: statsData.newReviews, icon: Star },
    { key: "totalPatients", label: t.s3, value: statsData.totalPatients, icon: Users },
  ];

  return (
    <div className="w-full space-y-10">
      {/* Overview Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase tracking-tighter italic">
          {t.title}
        </h3>
        
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

      {/* Stats Grid */}
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

      {/* Recent Schedule Section (এটি নতুন যোগ করা হয়েছে) */}
      <div className="bg-[#111111] rounded-[35px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-sm italic">
            {t.recent}
          </h3>
          <button className="text-[10px] font-bold uppercase text-gray-500 hover:text-white transition-all">
            {t.viewAll}
          </button>
        </div>
        
        <div className="p-2">
          {loading ? (
            <p className="p-10 text-center text-gray-600 uppercase text-[10px] tracking-widest">Loading...</p>
          ) : appointments.length > 0 ? (
            <div className="grid grid-cols-1 divide-y divide-white/5">
              {appointments.slice(0, 5).map((app) => (
                <div key={app._id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs">
                      {app.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="text-white text-sm font-bold">{app.name}</h5>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">{app.service}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="flex items-center gap-1 text-[#D4AF37] text-[10px] font-black uppercase">
                      <Clock size={10} /> {app.time}
                    </span>
                    <span className="text-[9px] text-gray-600 font-bold uppercase">{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-10 text-center text-gray-600 uppercase text-[10px] tracking-widest">
              {t.noData}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;