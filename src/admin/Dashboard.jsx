import React, { useState, useEffect } from 'react';
import { Calendar, Star, Users } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ lang }) => {
  const [statsData, setStatsData] = useState({
    totalAppointments: 0,
    newReviews: 0,
    totalPatients: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/dashboard');
      setStatsData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const t = {
    en: { title: "Overview", s1: "Total Appointments", s2: "New Reviews", s3: "Total Patients" },
    bn: { title: "সারসংক্ষেপ", s1: "মোট অ্যাপয়েন্টমেন্ট", s2: "নতুন রিভিউ", s3: "মোট রোগী" }
  }[lang];

  const stats = [
    { label: t.s1, value: statsData.totalAppointments, icon: Calendar },
    { label: t.s2, value: statsData.newReviews, icon: Star },
    { label: t.s3, value: statsData.totalPatients, icon: Users },
  ];

  return (
    <div>
      <h3 className="text-2xl font-black text-[#D4AF37] uppercase mb-8">{t.title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#111111] p-6 rounded-3xl border border-[#D4AF37]/10 relative overflow-hidden group hover:border-[#D4AF37]/30 transition-all duration-300">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-6 w-6 bg-gray-800 rounded mb-4"></div>
                <div className="h-4 w-24 bg-gray-800 rounded mb-2"></div>
                <div className="h-8 w-12 bg-gray-800 rounded"></div>
              </div>
            ) : (
              <>
                <s.icon className="text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">{s.label}</p>
                <h4 className="text-4xl font-black text-white">
                  {s.value.toLocaleString()}
                </h4>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;