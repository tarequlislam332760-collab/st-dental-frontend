import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Edit, Save, X, Calendar, Clock } from 'lucide-react';
import axios from 'axios';

const ManageAppointments = ({ lang }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // এডিট স্টেট
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', service: '', appointmentDate: '', timeSlot: '' });

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('https://st-dental-backend.vercel.app/api/appointments');
      setAppointments(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    const confirmMsg = lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure you want to delete?";
    if (window.confirm(confirmMsg)) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/appointments/${id}`);
        fetchAppointments(); 
      } catch (err) {
        alert(lang === 'bn' ? "ডিলিট করতে ব্যর্থ হয়েছে" : "Failed to delete");
      }
    }
  };

  const startEdit = (appt) => {
    setEditingId(appt._id);
    setEditData({ 
      name: appt.name, 
      service: appt.service,
      appointmentDate: appt.appointmentDate || appt.date || '',
      timeSlot: appt.timeSlot || appt.time || ''
    });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`https://st-dental-backend.vercel.app/api/appointments/${id}`, editData);
      setEditingId(null);
      fetchAppointments();
      alert(lang === 'bn' ? "সফলভাবে আপডেট করা হয়েছে" : "Updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  // ল্যাঙ্গুয়েজ টেক্সট অবজেক্ট
  const t = {
    en: { 
      title: "Appointment Management", 
      h1: "Patient Details", 
      h2: "Schedule Info", 
      h3: "Action",
      noData: "No appointments found.",
      loading: "Loading appointments..."
    },
    bn: { 
      title: "অ্যাপয়েন্টমেন্ট ম্যানেজমেন্ট", 
      h1: "রোগীর বিবরণ", 
      h2: "শিডিউল তথ্য", 
      h3: "অ্যাকশন",
      noData: "কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি।",
      loading: "অ্যাপয়েন্টমেন্ট লোড হচ্ছে..."
    }
  }[lang];

  return (
    <div className="w-full overflow-hidden">
      <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase mb-6 md:mb-8 tracking-tighter italic">
        {t.title}
      </h3>
      
      <div className="bg-[#111111] rounded-[24px] md:rounded-3xl overflow-hidden border border-[#D4AF37]/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[550px]">
            <thead className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="p-4 md:p-6">{t.h1}</th>
                <th className="p-4 md:p-6">{t.h2}</th>
                <th className="p-4 md:p-6 text-center">{t.h3}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="3" className="p-10 text-center text-gray-500 animate-pulse">{t.loading}</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan="3" className="p-10 text-center text-gray-500">{t.noData}</td></tr>
              ) : appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Patient Info */}
                  <td className="p-4 md:p-6">
                    {editingId === appt._id ? (
                      <input 
                        className="bg-black/50 border border-[#D4AF37]/30 text-white text-sm p-2 rounded w-full outline-none focus:border-[#D4AF37]" 
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-200">{appt.name}</span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest">{appt.phone || 'No Phone'}</span>
                      </div>
                    )}
                  </td>

                  {/* Schedule Info */}
                  <td className="p-4 md:p-6">
                    <div className="flex flex-col gap-1">
                      {editingId === appt._id ? (
                        <div className="flex flex-col gap-2">
                           <select 
                            className="bg-black/50 border border-[#D4AF37]/30 text-white text-xs p-1 rounded outline-none"
                            value={editData.service}
                            onChange={(e) => setEditData({...editData, service: e.target.value})}
                          >
                            <option value="Dental Care">Dental Care</option>
                            <option value="Skin Care">Skin Care</option>
                            <option value="Facial">Facial</option>
                          </select>
                          <input 
                            type="text"
                            className="bg-black/50 border border-[#D4AF37]/30 text-white text-xs p-1 rounded outline-none"
                            value={editData.appointmentDate}
                            onChange={(e) => setEditData({...editData, appointmentDate: e.target.value})}
                            placeholder="Date"
                          />
                        </div>
                      ) : (
                        <>
                          <span className="text-[#D4AF37] text-xs font-bold uppercase">{appt.service}</span>
                          <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase font-medium">
                            <span className="flex items-center gap-1"><Calendar size={10}/> {appt.appointmentDate || appt.date || 'N/A'}</span>
                            <span className="flex items-center gap-1"><Clock size={10}/> {appt.timeSlot || appt.time || 'N/A'}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="p-4 md:p-6">
                    <div className="flex justify-center gap-3">
                      {editingId === appt._id ? (
                        <>
                          <button onClick={() => handleSave(appt._id)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Save size={16}/></button>
                          <button onClick={() => setEditingId(null)} className="p-2 bg-gray-500/10 text-gray-500 rounded-lg hover:bg-gray-500 hover:text-white transition-all"><X size={16}/></button>
                        </>
                      ) : (
                        <>
                          <button className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all"><CheckCircle size={16}/></button>
                          <button onClick={() => startEdit(appt)} className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"><Edit size={16}/></button>
                          <button onClick={() => handleDelete(appt._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageAppointments;