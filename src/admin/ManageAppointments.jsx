import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle, Edit, Save, X } from 'lucide-react';
import axios from 'axios';

const ManageAppointments = ({ lang }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // এডিট স্টেট
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', service: '' });

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
    if (window.confirm(lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure?")) {
      try {
        await axios.delete(`https://st-dental-backend.vercel.app/api/appointments/${id}`);
        fetchAppointments(); 
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  // এডিট মোড শুরু করা
  const startEdit = (appt) => {
    setEditingId(appt._id);
    setEditData({ name: appt.name, service: appt.service });
  };

  // এডিট সেভ করা
  const handleSave = async (id) => {
    try {
      await axios.put(`https://st-dental-backend.vercel.app/api/appointments/${id}`, editData);
      setEditingId(null);
      fetchAppointments();
      alert(lang === 'bn' ? "সফলভাবে আপডেট করা হয়েছে" : "Updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  const t = {
    en: { title: "Appointments", h1: "Name", h2: "Service", h3: "Action" },
    bn: { title: "অ্যাপয়েন্টমেন্ট", h1: "নাম", h2: "সেবা", h3: "অ্যাকশন" }
  }[lang];

  return (
    <div className="w-full overflow-hidden">
      <h3 className="text-xl md:text-2xl font-black text-[#D4AF37] uppercase mb-6 md:mb-8 tracking-tighter italic">{t.title}</h3>
      <div className="bg-[#111111] rounded-[24px] md:rounded-3xl overflow-hidden border border-[#D4AF37]/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[450px]">
            <thead className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs uppercase tracking-widest">
              <tr>
                <th className="p-4 md:p-5">{t.h1}</th>
                <th className="p-4 md:p-5">{t.h2}</th>
                <th className="p-4 md:p-5 text-center">{t.h3}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointments.length === 0 && !loading ? (
                <tr><td colSpan="3" className="p-10 text-center text-gray-500">No appointments found.</td></tr>
              ) : appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 md:p-5 text-sm md:text-base">
                    {editingId === appt._id ? (
                      <input 
                        className="bg-black/50 border border-[#D4AF37]/30 text-white p-1 rounded w-full outline-none focus:border-[#D4AF37]" 
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                      />
                    ) : (
                      <span className="font-bold text-white">{appt.name}</span>
                    )}
                  </td>
                  <td className="p-4 md:p-5 text-sm md:text-base">
                    {editingId === appt._id ? (
                      <select 
                        className="bg-black/50 border border-[#D4AF37]/30 text-white p-1 rounded w-full outline-none focus:border-[#D4AF37]"
                        value={editData.service}
                        onChange={(e) => setEditData({...editData, service: e.target.value})}
                      >
                        <option value="Dental Care">Dental Care</option>
                        <option value="Skin Care">Skin Care</option>
                      </select>
                    ) : (
                      <span className="text-gray-400">{appt.service}</span>
                    )}
                  </td>
                  <td className="p-4 md:p-5">
                    <div className="flex justify-center gap-3 md:gap-4">
                      {editingId === appt._id ? (
                        <>
                          <button onClick={() => handleSave(appt._id)} className="text-blue-500 hover:scale-110 transition-transform"><Save size={18}/></button>
                          <button onClick={() => setEditingId(null)} className="text-gray-500 hover:scale-110 transition-transform"><X size={18}/></button>
                        </>
                      ) : (
                        <>
                          <button className="text-green-500 hover:scale-110 transition-transform"><CheckCircle size={18}/></button>
                          <button onClick={() => startEdit(appt)} className="text-yellow-500 hover:scale-110 transition-transform"><Edit size={18}/></button>
                          <button onClick={() => handleDelete(appt._id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={18}/></button>
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