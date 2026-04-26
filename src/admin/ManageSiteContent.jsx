import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const API = 'https://st-dental-backend.vercel.app/api/site-content';

const sections = [
  { key: 'hero',        label: 'Hero Section' },
  { key: 'services',    label: 'Services' },
  { key: 'dental',      label: 'Dental Care' },
  { key: 'skincare',    label: 'Skin Care' },
  { key: 'about',       label: 'About' },
  { key: 'contactinfo', label: 'Contact Info' },
];

const InputField = ({ label, value, onChange, textarea = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    {textarea ? (
      <textarea
        value={value || ''}
        onChange={onChange}
        rows={3}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37] resize-none"
      />
    ) : (
      <input
        type="text"
        value={value || ''}
        onChange={onChange}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
      />
    )}
  </div>
);

const ImageField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    <input
      type="text"
      placeholder="Image URL paste করুন"
      value={value || ''}
      onChange={onChange}
      className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
    />
    {value && (
      <img src={value} alt="preview" className="w-full max-h-40 object-cover rounded-xl border border-white/10 mt-1" />
    )}
  </div>
);

const ListEditor = ({ label, items = [], onChange }) => {
  const add = () => onChange([...items, { name: '', icon: 'Star' }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, field, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: val };
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
        <button onClick={add} className="flex items-center gap-1 text-[9px] uppercase font-black text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
          <Plus size={10} /> Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Name"
            value={item.name || ''}
            onChange={(e) => update(i, 'name', e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          />
          <input
            type="text"
            placeholder="Icon (e.g. Star)"
            value={item.icon || ''}
            onChange={(e) => update(i, 'icon', e.target.value)}
            className="w-28 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]"
          />
          <button onClick={() => remove(i)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
            <Trash2 size={13} />
          </button>
        </div>
      ))}
    </div>
  );
};

// ---- Section Editors ----

const HeroEditor = ({ data, set }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <InputField label="Title (বাংলা)" value={data.heroTitleBn} onChange={e => set({ ...data, heroTitleBn: e.target.value })} />
    <InputField label="Title (English)" value={data.heroTitleEn} onChange={e => set({ ...data, heroTitleEn: e.target.value })} />
    <InputField label="Description (বাংলা)" value={data.heroDescBn} onChange={e => set({ ...data, heroDescBn: e.target.value })} textarea />
    <InputField label="Description (English)" value={data.heroDescEn} onChange={e => set({ ...data, heroDescEn: e.target.value })} textarea />
    <ImageField label="Hero Image 1" value={data.heroImage1} onChange={e => set({ ...data, heroImage1: e.target.value })} />
    <ImageField label="Hero Image 2" value={data.heroImage2} onChange={e => set({ ...data, heroImage2: e.target.value })} />
  </div>
);

const ServicesEditor = ({ data, set }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <ImageField label="Dental Image" value={data.servicesImage1} onChange={e => set({ ...data, servicesImage1: e.target.value })} />
      <ImageField label="Skin Care Image" value={data.servicesImage2} onChange={e => set({ ...data, servicesImage2: e.target.value })} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ListEditor label="Dental Services (বাংলা)" items={data.dentalServicesBn} onChange={v => set({ ...data, dentalServicesBn: v })} />
      <ListEditor label="Dental Services (English)" items={data.dentalServicesEn} onChange={v => set({ ...data, dentalServicesEn: v })} />
      <ListEditor label="Skin Services (বাংলা)" items={data.skinServicesBn} onChange={v => set({ ...data, skinServicesBn: v })} />
      <ListEditor label="Skin Services (English)" items={data.skinServicesEn} onChange={v => set({ ...data, skinServicesEn: v })} />
    </div>
  </div>
);

const DentalEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.dentalTitleBn} onChange={e => set({ ...data, dentalTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.dentalTitleEn} onChange={e => set({ ...data, dentalTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.dentalDescBn} onChange={e => set({ ...data, dentalDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.dentalDescEn} onChange={e => set({ ...data, dentalDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Dental Image" value={data.dentalImage} onChange={e => set({ ...data, dentalImage: e.target.value })} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ListEditor label="Features (বাংলা)" items={data.dentalFeaturesBn} onChange={v => set({ ...data, dentalFeaturesBn: v })} />
      <ListEditor label="Features (English)" items={data.dentalFeaturesEn} onChange={v => set({ ...data, dentalFeaturesEn: v })} />
    </div>
  </div>
);

const SkinEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.skinTitleBn} onChange={e => set({ ...data, skinTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.skinTitleEn} onChange={e => set({ ...data, skinTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.skinDescBn} onChange={e => set({ ...data, skinDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.skinDescEn} onChange={e => set({ ...data, skinDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Skin Care Image" value={data.skinImage} onChange={e => set({ ...data, skinImage: e.target.value })} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ListEditor label="Features (বাংলা)" items={data.skinFeaturesBn} onChange={v => set({ ...data, skinFeaturesBn: v })} />
      <ListEditor label="Features (English)" items={data.skinFeaturesEn} onChange={v => set({ ...data, skinFeaturesEn: v })} />
    </div>
  </div>
);

const AboutEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.aboutTitleBn} onChange={e => set({ ...data, aboutTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.aboutTitleEn} onChange={e => set({ ...data, aboutTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.aboutDescBn} onChange={e => set({ ...data, aboutDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.aboutDescEn} onChange={e => set({ ...data, aboutDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="About Image" value={data.aboutImage} onChange={e => set({ ...data, aboutImage: e.target.value })} />
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3].map(n => (
        <div key={n} className="flex flex-col gap-2 bg-white/5 p-4 rounded-2xl">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase">Stat {n}</p>
          <InputField label="Label" value={data[`aboutStat${n}Label`]} onChange={e => set({ ...data, [`aboutStat${n}Label`]: e.target.value })} />
          <InputField label="Value" value={data[`aboutStat${n}Value`]} onChange={e => set({ ...data, [`aboutStat${n}Value`]: e.target.value })} />
        </div>
      ))}
    </div>
  </div>
);

const ContactInfoEditor = ({ data, set }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <InputField label="Phone" value={data.phone} onChange={e => set({ ...data, phone: e.target.value })} />
    <InputField label="WhatsApp" value={data.whatsapp} onChange={e => set({ ...data, whatsapp: e.target.value })} />
    <InputField label="Address" value={data.address} onChange={e => set({ ...data, address: e.target.value })} />
    <InputField label="Google Map Link" value={data.mapLink} onChange={e => set({ ...data, mapLink: e.target.value })} />
  </div>
);

// ---- Main Component ----

const ManageSiteContent = ({ lang }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSection(activeSection);
  }, [activeSection]);

  const fetchSection = async (sec) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/${sec}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/${activeSection}`, data);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert('Save failed!');
    }
    setSaving(false);
  };

  const renderEditor = () => {
    if (loading) return <div className="text-gray-500 text-xs uppercase tracking-widest py-10 text-center">লোড হচ্ছে...</div>;
    switch (activeSection) {
      case 'hero':        return <HeroEditor data={data} set={setData} />;
      case 'services':    return <ServicesEditor data={data} set={setData} />;
      case 'dental':      return <DentalEditor data={data} set={setData} />;
      case 'skincare':    return <SkinEditor data={data} set={setData} />;
      case 'about':       return <AboutEditor data={data} set={setData} />;
      case 'contactinfo': return <ContactInfoEditor data={data} set={setData} />;
      default: return null;
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <div className="flex flex-wrap gap-2">
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSection === s.key
                ? 'bg-[#D4AF37] text-black'
                : 'bg-white/5 text-gray-400 hover:text-[#D4AF37] border border-white/10'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111111] rounded-[28px] border border-white/5 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-sm italic">
            {sections.find(s => s.key === activeSection)?.label}
          </h3>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
              saved ? 'bg-green-500 text-white' : 'bg-[#D4AF37] text-black hover:bg-white'
            }`}
          >
            <Save size={13} />
            {saving ? 'সেভ হচ্ছে...' : saved ? '✓ সেভ হয়েছে!' : 'সেভ করুন'}
          </button>
        </div>
        {renderEditor()}
      </div>
    </div>
  );
};

export default ManageSiteContent; 