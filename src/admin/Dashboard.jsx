import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users, Edit3, Save, X, Clock, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({
    totalAppointments: 0,
    newReviews: 0,
    totalPatients: 0
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({});

  // ✅ Fetch Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const resStats = await axios.get('https://st-dental-backend.vercel.app/api/dashboard');
      setStatsData(resStats.data || {});
      setTempData(resStats.data || {});

      const resApps = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setAppointments(Array.isArray(resApps.data) ? resApps.data : []);

    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Update Stats
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.put('https://st-dental-backend.vercel.app/api/dashboard/update', tempData);
      setStatsData(tempData);
      setIsEditing(false);

      alert(lang === 'bn'
        ? "ড্যাশবোর্ড আপডেট হয়েছে!"
        : "Dashboard updated successfully!"
      );

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update stats.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Language
  const t = {
    en: {
      title: "Overview",
      s1: "Total Appointments",
      s2: "New Reviews",
      s3: "Total Patients",
      edit: "Edit Stats",
      save: "Save",
      cancel: "Cancel",
      recent: "Recent Schedule",
      view: "View All",
      patient: "Patient",
      service: "Service & Time"
    },
    bn: {
      title: "সারসংক্ষেপ",
      s1: "মোট অ্যাপয়েন্টমেন্ট",
      s2: "নতুন রিভিউ",
      s3: "মোট রোগী",
      edit: "তথ্য পরিবর্তন",
      save: "সেভ করুন",
      cancel: "বাতিল",
      recent: "সাম্প্রতিক শিডিউল",
      view: "সব দেখুন",
      patient: "রোগী",
      service: "সেবা ও সময়"
    }
  }[lang];

  const stats = [
    { key: "totalAppointments", label: t.s1, value: statsData.totalAppointments || 0, icon: Calendar },
    { key: "newReviews", label: t.s2, value: statsData.newReviews || 0, icon: Star },
    { key: "totalPatients", label: t.s3, value: statsData.totalPatients || 0, icon: Users },
  ];

  return (
    <div className="w-full space-y-8 md:space-y-12">

      {/* 🔹 Overview */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase italic">
          {t.title}
        </h3>

        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-2 rounded-full text-[10px] font-black uppercase hover:bg-[#D4AF37] hover:text-black">
            <Edit3 size={14} /> {t.edit}
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2">
              <Save size={14} /> {t.save}
            </button>
            <button onClick={() => setIsEditing(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-[10px] font-black flex items-center gap-2">
              <X size={14} /> {t.cancel}
            </button>
          </div>
        )}
      </div>

      {/* 🔹 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111] p-6 rounded-[24px] border border-[#D4AF37]/10">
            <s.icon className="text-[#D4AF37] mb-3" size={20} />
            <p className="text-gray-500 text-xs">{s.label}</p>

            {isEditing ? (
              <input
                type="number"
                value={tempData[s.key] || 0}
                onChange={(e) =>
                  setTempData({ ...tempData, [s.key]: Number(e.target.value) })
                }
                className="bg-black border text-white text-xl w-full px-2 mt-2"
              />
            ) : (
              <h4 className="text-3xl text-white font-bold">
                {loading ? "..." : s.value}
              </h4>
            )}
          </div>
        ))}
      </div>

      {/* 🔹 Recent Schedule (ONLY ONE) */}
      <div className="bg-[#111111] rounded-[30px] border border-white/5 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <h3 className="text-[#D4AF37] font-black uppercase text-sm italic">
            {t.recent}
          </h3>

          <button
            onClick={() => window.location.href = '/appointments'}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#D4AF37]"
          >
            {t.view} <ExternalLink size={12} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="text-gray-500 text-xs">
              <tr>
                <th className="p-4">{t.patient}</th>
                <th className="p-4">{t.service}</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : appointments.length > 0 ? (
                appointments.slice(0, 5).map((app) => (
                  <tr key={app._id}>
                    <td className="p-4 text-white">
                      {app.name || "Unknown"}
                    </td>
                    <td className="p-4 text-gray-400">
                      {app.service} | {app.time} - {app.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="p-6 text-center text-gray-500">
                    No Schedule Found
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