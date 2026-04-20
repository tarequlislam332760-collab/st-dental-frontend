import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MessageSquare, LogOut, Edit, Trash2, CheckCircle, Menu, X, Save, Clock, Calendar, FileText, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// সাব-কম্পোনেন্টগুলো
import Dashboard from './Dashboard';
import ManageAppointments from './ManageAppointments';
import ManageReviews from './ManageReviews';
import ManageBlogs from './ManageBlogs'; 

const AdminPanel = ({ lang: initialLang = 'bn' }) => {
  // ১. ল্যাঙ্গুয়েজকে স্টেটে রাখা হয়েছে যাতে চেঞ্জ করলে সব জায়গায় আপডেট হয়
  const [lang, setLang] = useState(initialLang);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', service: '', timeSlot: '', appointmentDate: '' });

  const fetchRecentData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setRecentAppointments(res.data.slice(0, 8)); 
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/st-admin-secure/login';
  };

  const toggleLang = () => {
    setLang(prev => prev === 'bn' ? 'en' : 'bn');
  };

  const t = {
    en: {
      dash: "Dashboard", appt: "Appointments", rev: "Reviews", blog: "Blogs", logout: "Logout",
      welcome: "Welcome back,", subtitle: "Manage your dental & facial clinic.",
      recent: "Recent Schedule", viewAll: "View All",
      table: { name: "Patient", info: "Service & Time", status: "Status", action: "Action" },
      deleteConfirm: "Are you sure you want to delete?"
    },
    bn: {
      dash: "ড্যাশবোর্ড", appt: "অ্যাপয়েন্টমেন্ট", rev: "রিভিউ", blog: "ব্লগ", logout: "লগআউট",
      welcome: "স্বাগতম,", subtitle: "ডেন্টাল এবং ফেসিয়াল ক্লিনিক পরিচালনা করুন।",
      recent: "সাম্প্রতিক শিডিউল", viewAll: "সব দেখুন",
      table: { name: "রোগী", info: "সেবা ও সময়", status: "অবস্থা", action: "অ্যাকশন" },
      deleteConfirm: "আপনি কি এটি ডিলিট করতে চান?"
    }
  }[lang];

  const handleDelete = async (id) => {
    if(window.confirm(t.deleteConfirm)) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/appointments/${id}`);
        fetchRecentData();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* Mobile Toggle & Lang Toggle */}
      <div className="md:hidden fixed top-4 right-4 z-[60] flex gap-2">
        <button onClick={toggleLang} className="p-3 bg-white/5 text-[#D4AF37] rounded-xl border border-white/10 shadow-lg uppercase text-[10px] font-black">
          {lang === 'bn' ? 'EN' : 'BN'}
        </button>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-[#D4AF37] text-black rounded-xl shadow-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0a0a0a] border-r border-[#D4AF37]/10 p-6 flex flex-col fixed h-full z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-10 px-2">
          <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
            ST <span className="text-[#D4AF37]">HOSPITAL</span>
          </h1>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: t.dash, icon: LayoutDashboard },
            { id: 'appointments', label: t.appt, icon: Users },
            { id: 'reviews', label: t.rev, icon: MessageSquare },
            { id: 'blogs', label: t.blog, icon: FileText },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-[#D4AF37] text-black font-bold shadow-lg' 
                : 'hover:bg-white/5 text-gray-500 hover:text-[#D4AF37]'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        {/* Language Switcher in Sidebar (Desktop) */}
        <button onClick={toggleLang} className="mb-4 flex items-center gap-4 px-4 py-3 text-[#D4AF37] bg-white/5 rounded-xl font-bold transition-all border border-white/5 hover:border-[#D4AF37]/30 uppercase text-xs tracking-widest">
           <Globe size={18} /> {lang === 'bn' ? 'English Language' : 'বাংলা ভাষা'}
        </button>

        <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl font-bold transition-all">
          <LogOut size={18} /> {t.logout}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-10 w-full overflow-hidden">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {t.welcome} <span className="text-[#D4AF37]">Tareq</span>
            </h2>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">Tareq Islam</p>
                  <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-tighter">Super Admin</p>
              </div>
              <div className="w-12 h-12 bg-[#111111] border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#D4AF37] font-black text-xl shadow-xl">TI</div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab + lang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {activeTab === 'dashboard' && <Dashboard lang={lang} />}
            {activeTab === 'appointments' && <ManageAppointments lang={lang} />}
            {activeTab === 'reviews' && <ManageReviews lang={lang} />}
            {activeTab === 'blogs' && <ManageBlogs lang={lang} />} 
          </motion.div>
        </AnimatePresence>

        {activeTab === 'dashboard' && (
          <section className="mt-10 bg-[#111111] rounded-[35px] border border-white/5 overflow-hidden shadow-2xl">
            {/* Table Header */}
            <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-lg font-black uppercase tracking-widest italic text-[#D4AF37]">{t.recent}</h3>
              <button onClick={() => setActiveTab('appointments')} className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest border border-[#D4AF37]/20 px-6 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
                {t.viewAll}
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-black/30 text-gray-500 text-[10px] uppercase tracking-[2px] font-bold">
                  <tr>
                    <th className="p-6">{t.table.name}</th>
                    <th className="p-6">{t.table.info}</th>
                    <th className="p-6">{t.table.status}</th>
                    <th className="p-6 text-center">{t.table.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="4" className="p-10 text-center text-gray-600 animate-pulse uppercase tracking-widest text-xs">Loading Data...</td></tr>
                  ) : recentAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-white/[0.01] transition-all">
                      <td className="p-6">
                        <p className="font-bold text-gray-200">{appt.name}</p>
                        <p className="text-xs text-gray-500">{appt.phone}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                          <span className="text-[#D4AF37] text-xs font-bold uppercase">
                            {appt.service || "General Treatment"}
                          </span>
                          <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} /> 
                              {appt.appointmentDate || appt.date || 'No Date'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} /> 
                              {appt.timeSlot || appt.time || 'No Time'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${appt.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                          {appt.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleDelete(appt._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
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