import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X, Clock, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({
    totalAppointments: 0,
    newReviews: 0,
    totalPatients: 0
  });
  const [appointments, setAppointments] = useState([]); // অ্যাপয়েন্টমেন্ট ডাটার জন্য স্টেট
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      // ১. স্ট্যাটাস ফেচ করা
      const resStats = await axios.get('https://st-dental-backend.vercel.app/api/dashboard');
      setStatsData(resStats.data);
      setTempData(resStats.data);

      // ২. সাম্প্রতিক শিডিউলের জন্য অ্যাপয়েন্টমেন্ট ফেচ করা
      const resApps = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setAppointments(resApps.data);

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
      alert(lang === 'bn' ? "ড্যাশবোর্ড আপডেট হয়েছে!" : "Dashboard updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setLoading(false);
      alert("Failed to update stats.");
    }
  };

  const t = {
    en: { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients", edit: "Edit Stats", save: "Save", cancel: "Cancel", recent: "Recent Schedule", view: "View All", patient: "Patient", service: "Service & Time" },
    bn: { title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী", edit: "তথ্য পরিবর্তন", save: "সেভ করুন", cancel: "বাতিল", recent: "সাম্প্রতিক শিডিউল", view: "সব দেখুন", patient: "রোগী", service: "সেবা ও সময়" }
  }[lang];

  const stats = [
    { key: "totalAppointments", label: t.s1, value: statsData.totalAppointments, icon: Calendar },
    { key: "newReviews", label: t.s2, value: statsData.newReviews, icon: Star },
    { key: "totalPatients", label: t.s3, value: statsData.totalPatients, icon: Users },
  ];

  return (
    <div className="w-full space-y-8 md:space-y-12">
      {/* Overview Section */}
      <div className="flex justify-between items-center mb-6">
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
            <button onClick={handleUpdate} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"><Save size={14} /> {t.save}</button>
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest"><X size={14} /> {t.cancel}</button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
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
              <h4 className="text-2xl md:text-4xl font-black text-white">{loading ? "..." : s.value.toLocaleString()}</h4>
            )}
          </div>
        ))}
      </div>

      {/* Recent Schedule Section (Added according to your screenshot) */}
      <div className="bg-[#111111] rounded-[30px] md:rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-sm md:text-base italic">
            {t.recent}
          </h3>
          <button 
            className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-[#D4AF37] transition-all group border border-white/10 px-4 py-2 rounded-full"
            onClick={() => window.location.href = '/appointments'} // আপনার কাঙ্ক্ষিত রুট এখানে দিন
          >
            {t.view} <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/40 text-gray-600 text-[10px] uppercase font-bold">
              <tr>
                <th className="p-6">{t.patient}</th>
                <th className="p-6">{t.service}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="2" className="p-10 text-center text-gray-600 text-[10px] uppercase tracking-widest">Fetching Schedule...</td></tr>
              ) : appointments.length > 0 ? (
                appointments.slice(0, 5).map((app) => (
                  <tr key={app._id} className="hover:bg-white/[0.02] transition-all">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{app.name}</p>
                          <p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">Verified Patient</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col">
                        <span className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">{app.service}</span>
                        <span className="text-[#D4AF37] text-[10px] font-black mt-1 flex items-center gap-1">
                          <Clock size={10} /> {app.time} — {app.date}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2" className="p-10 text-center text-gray-600 text-[10px] uppercase tracking-widest italic">No data found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;