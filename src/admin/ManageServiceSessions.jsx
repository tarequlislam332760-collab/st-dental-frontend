import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, Save, X, Calendar, User, FileText, CheckCircle2, Clock, XCircle } from 'lucide-react';

const API = 'https://st-dental-backend.vercel.app/api/service-sessions';
const CONTENT_API = 'https://st-dental-backend.vercel.app/api/site-content/services';

const STATUS_META = {
  pending:   { label: 'পেন্ডিং',   color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', icon: Clock },
  completed: { label: 'সম্পন্ন',   color: 'text-green-400 bg-green-500/10 border-green-500/30', icon: CheckCircle2 },
  cancelled: { label: 'বাতিল',    color: 'text-red-400 bg-red-500/10 border-red-500/30', icon: XCircle },
};

const emptyForm = { serviceName: '', category: 'dental', date: '', patientName: '', note: '', status: 'pending' };

const ManageServiceSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [servicesList, setServicesList] = useState({ dental: [], skin: [] });
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchSessions(); fetchServicesList(); }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setSessions(res.data);
    } catch {
      setError('সেশন লোড হয়নি।');
    }
    setLoading(false);
  };

  const fetchServicesList = async () => {
    try {
      const res = await axios.get(CONTENT_API);
      setServicesList({
        dental: (res.data.dentalServicesBn || []).map(s => s.name),
        skin: (res.data.skinServicesBn || []).map(s => s.name),
      });
    } catch {}
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (session) => {
    setForm({
      serviceName: session.serviceName,
      category: session.category,
      date: session.date ? session.date.slice(0, 10) : '',
      patientName: session.patientName || '',
      note: session.note || '',
      status: session.status,
    });
    setEditingId(session._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.serviceName || !form.date) {
      setError('সার্ভিস ও তারিখ আবশ্যক।');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form);
      } else {
        await axios.post(API, form);
      }
      setShowForm(false);
      fetchSessions();
    } catch {
      setError('সেভ করা যায়নি।');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('এই সেশন ডিলিট করতে চান?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      fetchSessions();
    } catch {
      setError('ডিলিট করা যায়নি।');
    }
  };

  const filteredSessions = filterCategory === 'all'
    ? sessions
    : sessions.filter(s => s.category === filterCategory);

  const currentServiceOptions = form.category === 'dental' ? servicesList.dental : servicesList.skin;

  return (
    <div className="w-full space-y-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-teal-400 font-black uppercase tracking-widest text-sm">সার্ভিস সেশন ম্যানেজমেন্ট</h2>
        <button onClick={openAddForm}
          className="flex items-center gap-2 bg-teal-500 text-black px-4 py-2 rounded-full text-[11px] font-black uppercase hover:bg-teal-400 transition-all">
          <Plus size={14} /> নতুন সেশন যোগ করুন
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['all', 'dental', 'skin'].map(cat => (
          <button key={cat} onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              filterCategory === cat ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-400 border border-white/10 hover:text-teal-400'
            }`}>
            {cat === 'all' ? 'সব' : cat === 'dental' ? 'ডেন্টাল' : 'স্কিন'}
          </button>
        ))}
      </div>

      {error && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-bold">⚠ {error}</div>
      )}

      {/* Sessions list */}
      <div className="bg-[#111111] rounded-3xl border border-white/5 p-5">
        {loading ? (
          <div className="text-gray-500 text-xs uppercase tracking-widest py-10 text-center animate-pulse">লোড হচ্ছে...</div>
        ) : filteredSessions.length === 0 ? (
          <p className="text-gray-600 text-xs text-center py-8 uppercase">কোনো সেশন নেই</p>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredSessions.map(s => {
              const meta = STATUS_META[s.status] || STATUS_META.pending;
              const StatusIcon = meta.icon;
              return (
                <div key={s._id} className="flex items-center justify-between gap-4 bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black ${s.category === 'dental' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-teal-500/10 text-teal-400'}`}>
                        {s.category === 'dental' ? 'ডেন্টাল' : 'স্কিন'}
                      </span>
                      <span className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full uppercase font-black border ${meta.color}`}>
                        <StatusIcon size={10} /> {meta.label}
                      </span>
                    </div>
                    <p className="text-white text-sm font-bold truncate">{s.serviceName}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-gray-400 text-[11px]">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(s.date).toLocaleDateString('bn-BD')}</span>
                      {s.patientName && <span className="flex items-center gap-1"><User size={11} /> {s.patientName}</span>}
                      {s.note && <span className="flex items-center gap-1"><FileText size={11} /> {s.note}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => openEditForm(s)} className="p-2 bg-white/5 text-gray-300 rounded-xl hover:bg-teal-500 hover:text-black transition-all"><Edit size={13} /></button>
                    <button onClick={() => handleDelete(s._id)} className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={13} /></button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-teal-400 font-black uppercase text-xs tracking-widest">{editingId ? 'সেশন এডিট করুন' : 'নতুন সেশন'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20"><X size={14} /></button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Category */}
              <div className="flex gap-2">
                {['dental', 'skin'].map(cat => (
                  <button key={cat} type="button"
                    onClick={() => setForm({ ...form, category: cat, serviceName: '' })}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                      form.category === cat ? 'bg-teal-500 text-black' : 'bg-white/5 text-gray-400 border border-white/10'
                    }`}>
                    {cat === 'dental' ? 'ডেন্টাল' : 'স্কিন'}
                  </button>
                ))}
              </div>

              {/* Service select */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-teal-400">সার্ভিস বেছে নিন</label>
                <select value={form.serviceName} onChange={e => setForm({ ...form, serviceName: e.target.value })}
                  className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-teal-400">
                  <option value="">-- সার্ভিস সিলেক্ট করুন --</option>
                  {currentServiceOptions.map((name, i) => <option key={i} value={name}>{name}</option>)}
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-teal-400">তারিখ</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-teal-400" />
              </div>

              {/* Patient name */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-teal-400">রোগীর নাম</label>
                <input type="text" value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })}
                  placeholder="রোগীর নাম লিখুন"
                  className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-teal-400" />
              </div>

              {/* Note */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-teal-400">নোট</label>
                <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={2}
                  placeholder="অতিরিক্ত মন্তব্য (ঐচ্ছিক)"
                  className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-teal-400 resize-none" />
              </div>

              {/* Status */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-black tracking-widest text-teal-400">Status</label>
                <div className="flex gap-2">
                  {Object.entries(STATUS_META).map(([key, meta]) => (
                    <button key={key} type="button" onClick={() => setForm({ ...form, status: key })}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all border ${
                        form.status === key ? meta.color + ' border-current' : 'bg-white/5 text-gray-500 border-white/10'
                      }`}>
                      {meta.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={handleSave} disabled={saving}
                className="flex items-center justify-center gap-2 bg-teal-500 text-black py-3 rounded-xl text-xs font-black uppercase hover:bg-teal-400 transition-all disabled:opacity-50 mt-2">
                <Save size={14} /> {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServiceSessions;
