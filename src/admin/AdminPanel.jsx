import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MessageSquare, LogOut, Trash2, Menu, X, Clock, Calendar, FileText, Globe, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import Dashboard from './Dashboard';
import ManageAppointments from './ManageAppointments';
import ManageReviews from './ManageReviews';
import ManageBlogs from './ManageBlogs';
import ManageSiteContent from './ManageSiteContent';

const AdminPanel = ({ lang: initialLang = 'bn' }) => {
  const [lang, setLang] = useState(initialLang);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const adminName     = localStorage.getItem('adminName')     || 'Admin';
  const adminInitials = localStorage.getItem('adminInitials') || 'AD';
  const adminRole     = localStorage.getItem('adminRole')     || 'Admin';

  const API_URL = "https://st-dental-backend.vercel.app/api";

  const fetchRecentData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/appointments`);
      setRecentAppointments(res.data.slice(0, 8));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'dashboard') fetchRecentData();
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminInitials');
    localStorage.removeItem('adminRole');
    window.location.href = '/st-admin-secure/login';
  };

  const toggleLang = () => setLang(prev => prev === 'bn' ? 'en' : 'bn');

  const t = {
    en: {
      dash: "Dashboard", appt: "Appointments", rev: "Reviews", blog: "Blogs",
      site: "Site Content", logout: "Logout",
      welcome: "Welcome back,", subtitle: "Manage your dental & skin care clinic.",
      recent: "Recent Schedule", viewAll: "View All", loading: "Loading Data...",
      noDate: "No Date", noTime: "No Time",
      table: { name: "Patient", info: "Service & Time", status: "Status", action: "Action" },
      deleteConfirm: "Are you sure you want to delete?",
      blogActions: { add: "Add New Blog", edit: "Edit Blog", save: "Save Blog", delete: "Delete" }
    },
    bn: {
      dash: "ড্যাশবোর্ড", appt: "অ্যাপয়েন্টমেন্ট", rev: "রিভিউ", blog: "ব্লগ",
      site: "সাইট কন্টেন্ট", logout: "লগআউট",
      welcome: "স্বাগতম,", subtitle: "ডেন্টাল এবং স্কিন কেয়ার ক্লিনিক পরিচালনা করুন।",
      recent: "সাম্প্রতিক শিডিউল", viewAll: "সব দেখুন", loading: "লোড হচ্ছে...",
      noDate: "তারিখ নেই", noTime: "সময় নেই",
      table: { name: "রোগী", info: "সেবা ও সময়", status: "অবস্থা", action: "অ্যাকশন" },
      deleteConfirm: "আপনি কি এটি ডিলিট করতে চান?",
      blogActions: { add: "নতুন ব্লগ লিখুন", edit: "এডিট করুন", save: "সেভ করুন", delete: "ডিলিট" }
    }
  }[lang];

  const handleDelete = async (id) => {
    if (window.confirm(t.deleteConfirm)) {
      try {
        await axios.delete(`${API_URL}/appointments/${id}`);
        fetchRecentData();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const navItems = [
    { id: 'dashboard',   label: t.dash, icon: LayoutDashboard },
    { id: 'appointments',label: t.appt, icon: Users },
    { id: 'reviews',     label: t.rev,  icon: MessageSquare },
    { id: 'blogs',       label: t.blog, icon: FileText },
    { id: 'sitecontent', label: t.site, icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#060e1e] text-white font-sans relative">

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-[60] flex gap-2">
        <button onClick={toggleLang}
          className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl border border-cyan-500/20 shadow-lg uppercase text-[10px] font-black">
          {lang === 'bn' ? 'EN' : 'BN'}
        </button>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-cyan-500 text-black rounded-xl shadow-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0a1628] border-r border-cyan-500/10 p-6 flex flex-col fixed h-full z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Logo */}
        <div className="mb-10 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <span className="text-cyan-400 font-black text-xs">ST</span>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tight text-white uppercase">
                S.T <span className="text-cyan-400">Laser</span>
              </h1>
              <p className="text-[8px] text-cyan-500/50 uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-white/40 hover:bg-cyan-500/10 hover:text-cyan-400'
              }`}
            >
              <item.icon size={17} /> {item.label}
            </button>
          ))}
        </nav>

        {/* Lang toggle */}
        <button onClick={toggleLang}
          className="mb-3 flex items-center gap-3 px-4 py-3 text-cyan-400 bg-cyan-500/5 rounded-xl font-bold transition-all border border-cyan-500/10 hover:border-cyan-500/30 uppercase text-[10px] tracking-widest">
          <Globe size={15} /> {lang === 'bn' ? 'English' : 'বাংলা'}
        </button>

        {/* Logout */}
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all text-sm">
          <LogOut size={17} /> {t.logout}
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-10 w-full overflow-hidden">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {t.welcome} <span className="text-cyan-400">{adminName.split(' ')[0]}</span>
            </h2>
            <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{adminName}</p>
              <p className="text-[10px] text-cyan-400 uppercase font-bold tracking-tighter">{adminRole}</p>
            </div>
            <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 font-black text-sm shadow-xl">
              {adminInitials}
            </div>
          </div>
        </header>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard'    && <Dashboard lang={lang} onNavigate={setActiveTab} />}
            {activeTab === 'appointments' && <ManageAppointments lang={lang} />}
            {activeTab === 'reviews'      && <ManageReviews lang={lang} />}
            {activeTab === 'blogs'        && <ManageBlogs lang={lang} t={t.blogActions} />}
            {activeTab === 'sitecontent'  && <ManageSiteContent lang={lang} />}
          </motion.div>
        </AnimatePresence>

        {/* Recent Schedule */}
        {activeTab === 'dashboard' && (
          <section className="mt-10 bg-[#0a1628] rounded-[28px] border border-cyan-500/10 overflow-hidden shadow-2xl">
            <div className="p-6 md:p-8 border-b border-cyan-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-lg font-black uppercase tracking-widest italic text-cyan-400">{t.recent}</h3>
              <button onClick={() => setActiveTab('appointments')}
                className="text-cyan-400 text-[10px] font-black uppercase tracking-widest border border-cyan-500/20 px-6 py-2 rounded-full hover:bg-cyan-500 hover:text-black transition-all">
                {t.viewAll}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-cyan-500/5 text-white/30 text-[10px] uppercase tracking-[2px] font-bold">
                  <tr>
                    <th className="p-6">{t.table.name}</th>
                    <th className="p-6">{t.table.info}</th>
                    <th className="p-6">{t.table.status}</th>
                    <th className="p-6 text-center">{t.table.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="4" className="p-10 text-center text-white/20 animate-pulse uppercase tracking-widest text-xs">{t.loading}</td></tr>
                  ) : recentAppointments.length > 0 ? recentAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-cyan-500/[0.03] transition-all">
                      <td className="p-6">
                        <p className="font-bold text-white/80">{appt.name}</p>
                        <p className="text-xs text-white/30">{appt.phone}</p>
                      </td>
                      <td className="p-6">
                        <span className="text-cyan-400 text-xs font-bold uppercase block">{appt.service || "General Treatment"}</span>
                        <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase font-medium mt-1">
                          <span className="flex items-center gap-1"><Calendar size={10} />{appt.appointmentDate || appt.date || t.noDate}</span>
                          <span className="flex items-center gap-1"><Clock size={10} />{appt.timeSlot || appt.time || t.noTime}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${
                          appt.status === 'Confirmed'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {appt.status || (lang === 'bn' ? 'পেন্ডিং' : 'Pending')}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center">
                          <button onClick={() => handleDelete(appt._id)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="4" className="p-10 text-center text-white/20 text-xs uppercase italic">{lang === 'bn' ? 'কোনো ডেটা নেই' : 'No data found'}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
