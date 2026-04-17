import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ManageAppointments = ({ lang }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      // লিঙ্ক আপডেট করা হয়েছে
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
        // ডিলিট লিঙ্ক আপডেট করা হয়েছে
        await axios.delete(`https://st-dental-backend.vercel.app/api/appointments/${id}`);
        fetchAppointments(); 
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  const t = {
    en: { title: "Appointments", h1: "Name", h2: "Service", h3: "Action" },
    bn: { title: "অ্যাপয়েন্টমেন্ট", h1: "নাম", h2: "সেবা", h3: "অ্যাকশন" }
  }[lang];

  return (
    <div>
      <h3 className="text-2xl font-black text-[#D4AF37] uppercase mb-8">{t.title}</h3>
      <div className="bg-[#111111] rounded-3xl overflow-hidden border border-[#D4AF37]/10">
        <table className="w-full text-left">
          <thead className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs uppercase tracking-widest">
            <tr>
              <th className="p-5">{t.h1}</th>
              <th className="p-5">{t.h2}</th>
              <th className="p-5 text-center">{t.h3}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {appointments.length === 0 && !loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-500">No appointments found.</td></tr>
            ) : appointments.map((appt) => (
              <tr key={appt._id}>
                <td className="p-5 font-bold text-white">{appt.name}</td>
                <td className="p-5 text-gray-400">{appt.service}</td>
                <td className="p-5 flex justify-center gap-4">
                  <button className="text-green-500 hover:scale-110 transition-transform"><CheckCircle size={20}/></button>
                  <button onClick={() => handleDelete(appt._id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;