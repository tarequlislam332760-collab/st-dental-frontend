import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, MessageSquare, LogOut, Edit, Trash2, CheckCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// সাব-কম্পোনেন্টগুলো
import Dashboard from './Dashboard';
import ManageAppointments from './ManageAppointments';
import ManageReviews from './ManageReviews';

const AdminPanel = ({ lang = 'bn' }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // মোবাইল মেনুর জন্য

  const fetchRecentData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setRecentAppointments(res.data.slice(0, 5)); 
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

  const handleDelete = async (id) => {
    if(window.confirm(lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure you want to delete?")) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/appointments/${id}`);
        fetchRecentData();
      } catch (err) {
        alert("Delete failed!");
      }
    }
  };

  const t = {
    en: {
      dash: "Dashboard", appt: "Appointments", rev: "Reviews", logout: "Logout",
      welcome: "Welcome back,", subtitle: "Manage your clinic activities today.",
      recent: "Recent Appointments", viewAll: "View All",
      table: { name: "Patient Name", service: "Service", status: "Status", action: "Action" }
    },
    bn: {
      dash: "ড্যাশবোর্ড", appt: "অ্যাপয়েন্টমেন্ট", rev: "রিভিউ", logout: "লগআউট",
      welcome: "স্বাগতম,", subtitle: "আপনার ক্লিনিকের কার্যক্রম আজই পরিচালনা করুন।",
      recent: "সাম্প্রতিক অ্যাপয়েন্টমেন্ট", viewAll: "সব দেখুন",
      table: { name: "রোগীর নাম", service: "সেবা", status: "অবস্থা", action: "অ্যাকশন" }
    }
  }[lang];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#D4AF37] selection:text-black relative">
      
      {/* মোবাইল মেনু বাটন */}
      <div className="md:hidden fixed top-4 right-4 z-[60]">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-[#D4AF37] text-black rounded-xl shadow-lg"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* সাইডবার - মোবাইলের জন্য রেসপনসিভ লজিক */}
      <aside className={`w-64 bg-[#111111] border-r border-[#D4AF37]/20 p-6 flex flex-col fixed h-full z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
            S T <span className="text-[#D4AF37]">ADMIN</span>
          </h1>
        </div>
        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: t.dash, icon: LayoutDashboard },
            { id: 'appointments', label: t.appt, icon: Users },
            { id: 'reviews', label: t.rev, icon: MessageSquare },
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === item.id 
                ? 'bg-[#D4AF37] text-black font-bold shadow-[0_10px_20px_rgba(212,175,55,0.2)]' 
                : 'hover:bg-white/5 text-gray-400 hover:text-[#D4AF37]'
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl mt-auto transition-all duration-300 font-bold">
          <LogOut size={20} /> {t.logout}
        </button>
      </aside>

      {/* মোবাইল ওভারলে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              {t.welcome} <span className="text-[#D4AF37]">Tareq</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
          </motion.div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold">Tarikul Islam Tareq</p>
                 <p className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Super Admin</p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black font-black text-xl shadow-lg border-2 border-white/10">TI</div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {activeTab === 'dashboard' && <Dashboard lang={lang} />}
            {activeTab === 'appointments' && <ManageAppointments lang={lang} />}
            {activeTab === 'reviews' && <ManageReviews lang={lang} />}
          </motion.div>
        </AnimatePresence>

        {activeTab === 'dashboard' && (
          <section className="mt-12 bg-[#111111] rounded-[30px] md:rounded-[40px] border border-[#D4AF37]/10 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-[#D4AF37]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter italic">{t.recent}</h3>
              <button onClick={() => setActiveTab('appointments')} className="w-full sm:w-auto text-[#D4AF37] text-xs font-black uppercase tracking-widest border border-[#D4AF37]/30 px-6 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
                {t.viewAll}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-[2px] font-bold">
                  <tr>
                    <th className="p-6">{t.table.name}</th>
                    <th className="p-6">{t.table.service}</th>
                    <th className="p-6">{t.table.status}</th>
                    <th className="p-6 text-center">{t.table.action}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan="4" className="p-10 text-center text-gray-500">Loading appointments...</td></tr>
                  ) : recentAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-6 font-bold text-gray-200">{appt.name}</td>
                      <td className="p-6 text-gray-400">{appt.service}</td>
                      <td className="p-6">
                        <span className="bg-yellow-500/10 text-yellow-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {appt.status || 'Pending'}
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-center gap-3">
                          <button className="w-10 h-10 flex items-center justify-center bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all"><CheckCircle size={18} /></button>
                          <button onClick={() => handleDelete(appt._id)} className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
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