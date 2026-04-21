import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X, Clock, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang, onNavigate }) => {
  const [statsData, setStatsData] = useState({ totalAppointments: 0, newReviews: 0, totalPatients: 0 });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resStats, resApps] = await Promise.all([
        axios.get('https://st-dental-backend.vercel.app/api/dashboard'),
        axios.get('https://st-dental-backend.vercel.app/api/appointments'),
      ]);
      setStatsData(resStats.data);
      setTempData(resStats.data);
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
      alert(lang === 'bn' ? "আপডেট সফল হয়েছে!" : "Update successful!");
    } catch (err) {
      setLoading(false);
    }
  };

  const t = {
    en: {
      title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients",
      edit: "Edit Stats", save: "Save", cancel: "Cancel",
      recent: "Recent Schedule", viewAll: "View All",
      patient: "Patient", service: "Service & Time", status: "Status", action: "Action",
      noData: "No appointments found", loading: "Loading...", verified: "Verified Patient",
      pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled",
    },
    bn: {
      title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী",
      edit: "তথ্য পরিবর্তন", save: "সেভ করুন", cancel: "বাতিল",
      recent: "সাম্প্রতিক শিডিউল", viewAll: "সব দেখুন",
      patient: "রোগী", service: "সেবা ও সময়", status: "অবস্থা", action: "আ্যাকশন",
      noData: "কোনো অ্যাপয়েন্টমেন্ট নেই", loading: "লোড হচ্ছে...", verified: "ভেরিফাইড রোগী",
      pending: "পেন্ডিং", confirmed: "কনফার্মড", cancelled: "বাতিল",
    }
  }[lang] || {
    title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients",
    edit: "Edit Stats", save: "Save", cancel: "Cancel",
    recent: "Recent Schedule", viewAll: "View All",
    patient: "Patient", service: "Service & Time", status: "Status", action: "Action",
    noData: "No appointments found", loading: "Loading...", verified: "Verified Patient",
    pending: "Pending", confirmed: "Confirmed", cancelled: "Cancelled",
  };

  const statusStyle = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') return 'bg-green-500/10 text-green-400 border border-green-500/20';
    if (s === 'cancelled') return 'bg-red-500/10 text-red-400 border border-red-500/20';
    return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
  };

  const statusLabel = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') return t.confirmed;
    if (s === 'cancelled') return t.cancelled;
    return t.pending;
  };

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('appointments');
    } else {
      window.location.href = '/appointments';
    }
  };

  return (
    <div className="w-full space-y-8 pb-10">

      {/* Header & Edit Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase italic">{t.title}</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-2"
          >
            <Edit3 size={14} /> {t.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleUpdate} className="bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
              <Save size={14} /> {t.save}
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
              <X size={14} /> {t.cancel}
            </button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
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
              <h4 className="text-2xl md:text-4xl font-black text-white">
                {loading ? "..." : s.val.toLocaleString()}
              </h4>
            )}
          </div>
        ))}
      </div>

      {/* Recent Schedule */}
      <div className="bg-[#111111] rounded-[32px] border border-white/5 overflow-hidden">

        {/* Section Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-base italic">{t.recent}</h3>
          <button
            onClick={handleViewAll}
            className="text-[10px] font-black uppercase text-[#D4AF37] border border-[#D4AF37]/30 px-5 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all flex items-center gap-1"
          >
            {t.viewAll} <ChevronRight size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/40">
              <tr className="text-gray-600 text-[10px] uppercase font-black tracking-widest">
                <th className="px-8 py-4">{t.patient}</th>
                <th className="px-8 py-4">{t.service}</th>
                <th className="px-8 py-4">{t.status}</th>
                <th className="px-8 py-4">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-600 text-[10px] uppercase tracking-widest">
                    {t.loading}
                  </td>
                </tr>
              ) : appointments.length > 0 ? (
                appointments.slice(0, 5).map((app) => (
                  <tr key={app._id} className="hover:bg-white/[0.02] transition-all">

                    {/* Patient */}
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs border border-[#D4AF37]/20 shrink-0">
                          {app.name?.charAt(0)?.toUpperCase() || 'P'}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{app.name}</p>
                          <p className="text-[9px] text-gray-600 uppercase font-black tracking-tighter">{t.verified}</p>
                        </div>
                      </div>
                    </td>

                    {/* Service & Time */}
                    <td className="px-8 py-5">
                      <span className="text-gray-300 text-[11px] font-bold uppercase block">{app.service}</span>
                      <span className="text-[#D4AF37] text-[10px] font-black mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {app.time ? `${app.time} — ` : ''}{app.date}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-8 py-5">
                      <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${statusStyle(app.status)}`}>
                        {statusLabel(app.status)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-8 py-5">
                      <button
                        onClick={handleViewAll}
                        className="text-[9px] font-black uppercase text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all"
                      >
                        View
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-600 text-[10px] uppercase italic">
                    {t.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;