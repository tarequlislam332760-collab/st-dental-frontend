import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, X, Upload, Link } from 'lucide-react';
import * as Lucide from 'lucide-react';

const API = 'https://st-dental-backend.vercel.app/api/site-content';
const CLOUD_NAME = 'dfe3wlx4u';
const UPLOAD_PRESET = 'st_dental';

const sections = [
  { key: 'hero',        label: 'Hero Section' },
  { key: 'services',    label: 'Services' },
  { key: 'dental',      label: 'Dental Care' },
  { key: 'skincare',    label: 'Skin Care' },
  { key: 'about',       label: 'About' },
  { key: 'contactinfo', label: 'Contact Info' },
];

const DENTAL_ICONS = [
  'Smile', 'SmilePlus', 'Stethoscope', 'Activity', 'ShieldCheck', 'Shield',
  'Zap', 'Star', 'Award', 'CheckCircle', 'Check', 'CircleCheck',
  'Pill', 'Syringe', 'Thermometer', 'Microscope', 'ClipboardPlus', 'Clipboard',
  'HeartPulse', 'Heart', 'Brain', 'Bone', 'Scissors', 'Wrench',
  'Sparkles', 'Sparkle', 'BadgeCheck', 'Medal', 'Trophy', 'Crown',
];

const SKIN_ICONS = [
  'Sun', 'Sunset', 'Sunrise', 'Moon', 'Droplets', 'Droplet',
  'Flower', 'Flower2', 'Leaf', 'Sprout', 'Gem', 'Diamond',
  'Sparkles', 'Sparkle', 'Star', 'Wand', 'Wand2', 'Palette',
  'UserCheck', 'UserCircle', 'Eye', 'EyeOff', 'Glasses', 'Hand',
  'Heart', 'HeartHandshake', 'Smile', 'SmilePlus', 'Baby', 'Crown',
];

const GENERAL_ICONS = [
  'Star', 'Heart', 'Smile', 'Zap', 'Shield', 'ShieldCheck',
  'Activity', 'Sparkles', 'Sun', 'Droplets', 'UserCircle', 'UserCheck',
  'Target', 'CheckCircle', 'Award', 'Stethoscope', 'Clock', 'Calendar',
  'MapPin', 'Phone', 'Mail', 'Camera', 'Leaf', 'Flower',
  'Crown', 'Trophy', 'Medal', 'BadgeCheck', 'Gem', 'HeartPulse',
];

const SafeIcon = ({ name, size = 18, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

// ---- Cloudinary Upload ----
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
};

// ---- ImageField with Upload + URL ----
const ImageField = ({ label, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState('upload'); // 'upload' | 'url'
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange({ target: { value: url } });
    } catch {
      alert('Upload failed! Preset Unsigned আছে কিনা check করুন।');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>

      {/* Tab switcher */}
      <div className="flex gap-1 bg-black/30 p-1 rounded-xl w-fit">
        <button type="button" onClick={() => setTab('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${tab === 'upload' ? 'bg-[#D4AF37] text-black' : 'text-gray-500 hover:text-white'}`}>
          <Upload size={11} /> আপলোড
        </button>
        <button type="button" onClick={() => setTab('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${tab === 'url' ? 'bg-[#D4AF37] text-black' : 'text-gray-500 hover:text-white'}`}>
          <Link size={11} /> URL
        </button>
      </div>

      {tab === 'upload' ? (
        <div
          onClick={() => !uploading && fileRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${uploading ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'}`}
        >
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#D4AF37] text-xs font-bold">আপলোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={20} className="text-gray-500" />
              <p className="text-gray-500 text-xs">ছবি বেছে নিন বা এখানে ড্র্যাগ করুন</p>
              <p className="text-[10px] text-gray-600">JPG, PNG, WEBP</p>
            </div>
          )}
        </div>
      ) : (
        <input type="text" placeholder="https://example.com/image.jpg" value={value || ''} onChange={onChange}
          className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
      )}

      {/* Preview */}
      {value && (
        <div className="relative">
          <img src={value} alt="preview" className="w-full max-h-32 object-cover rounded-xl border border-white/10"
            onError={e => e.target.style.display = 'none'} />
          <button type="button" onClick={() => onChange({ target: { value: '' } })}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

const IconPicker = ({ value, onChange, iconSet = GENERAL_ICONS }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 w-full hover:border-[#D4AF37]/50 transition-all">
        <SafeIcon name={value || 'Star'} size={15} className="text-[#D4AF37] shrink-0" />
        <span className="flex-1 text-left text-xs truncate">{value || 'Star'}</span>
        <Lucide.ChevronDown size={13} className="text-gray-500 shrink-0" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center p-4"
            onClick={() => setOpen(false)}>
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-4 w-full max-w-sm shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[#D4AF37] uppercase font-black tracking-widest">Icon বেছে নিন</span>
                <button onClick={() => setOpen(false)} className="p-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"><X size={14} /></button>
              </div>
              <div className="flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl px-4 py-3 mb-4">
                <SafeIcon name={value || 'Star'} size={22} className="text-[#D4AF37]" />
                <span className="text-white font-bold text-sm">{value || 'Star'}</span>
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
                {iconSet.map(icon => (
                  <button key={icon} type="button" onClick={() => { onChange(icon); setOpen(false); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all gap-1.5 ${value === icon ? 'bg-[#D4AF37] border-2 border-[#D4AF37]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                    <SafeIcon name={icon} size={22} className={value === icon ? 'text-black' : 'text-gray-300'} />
                    <span className={`text-[9px] truncate w-full text-center leading-none font-bold ${value === icon ? 'text-black' : 'text-gray-500'}`}>{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const InputField = ({ label, value, onChange, textarea = false, placeholder = '' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    {textarea ? (
      <textarea value={value || ''} onChange={onChange} rows={3} placeholder={placeholder}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37] resize-none" />
    ) : (
      <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
    )}
  </div>
);

const ServiceListEditor = ({ label, items = [], onChange, iconSet = GENERAL_ICONS }) => {
  const add = () => onChange([...items, { name: '', icon: iconSet[0] }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, field, val) => { const u = [...items]; u[i] = { ...u[i], [field]: val }; onChange(u); };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
        <button onClick={add} className="flex items-center gap-1 text-[9px] uppercase font-black text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
          <Plus size={10} /> Add
        </button>
      </div>
      {items.length === 0 && <p className="text-gray-600 text-[10px] text-center py-3 border border-dashed border-white/10 rounded-xl uppercase">ADD বাটনে click করুন</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" placeholder="নাম লিখুন" value={item.name || ''} onChange={e => update(i, 'name', e.target.value)}
            className="flex-1 min-w-0 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <div className="w-28 shrink-0"><IconPicker value={item.icon} onChange={val => update(i, 'icon', val)} iconSet={iconSet} /></div>
          <button onClick={() => remove(i)} className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shrink-0"><Trash2 size={13} /></button>
        </div>
      ))}
    </div>
  );
};

const FeatureListEditor = ({ label, items = [], onChange, iconSet = GENERAL_ICONS }) => {
  const add = () => onChange([...items, { icon: iconSet[0], text: '' }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, field, val) => { const u = [...items]; u[i] = { ...u[i], [field]: val }; onChange(u); };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
        <button onClick={add} className="flex items-center gap-1 text-[9px] uppercase font-black text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
          <Plus size={10} /> Add
        </button>
      </div>
      {items.length === 0 && <p className="text-gray-600 text-[10px] text-center py-3 border border-dashed border-white/10 rounded-xl uppercase">ADD বাটনে click করুন</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-28 shrink-0"><IconPicker value={item.icon} onChange={val => update(i, 'icon', val)} iconSet={iconSet} /></div>
          <input type="text" placeholder="Text লিখুন" value={item.text || ''} onChange={e => update(i, 'text', e.target.value)}
            className="flex-1 min-w-0 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <button onClick={() => remove(i)} className="p-2 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shrink-0"><Trash2 size={13} /></button>
        </div>
      ))}
    </div>
  );
};

// ---- Editors (same as before, just ImageField updated) ----
const HeroEditor = ({ data, set }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <InputField label="Title (বাংলা)" value={data.heroTitleBn} onChange={e => set({ ...data, heroTitleBn: e.target.value })} />
    <InputField label="Title (English)" value={data.heroTitleEn} onChange={e => set({ ...data, heroTitleEn: e.target.value })} />
    <InputField label="Sub Title (বাংলা)" value={data.heroSubBn} onChange={e => set({ ...data, heroSubBn: e.target.value })} />
    <InputField label="Sub Title (English)" value={data.heroSubEn} onChange={e => set({ ...data, heroSubEn: e.target.value })} />
    <InputField label="Description (বাংলা)" value={data.heroDescBn} onChange={e => set({ ...data, heroDescBn: e.target.value })} textarea />
    <InputField label="Description (English)" value={data.heroDescEn} onChange={e => set({ ...data, heroDescEn: e.target.value })} textarea />
    <ImageField label="Hero Image 1 (Dental)" value={data.heroImage1} onChange={e => set({ ...data, heroImage1: e.target.value })} />
    <ImageField label="Hero Image 2 (Skin)" value={data.heroImage2} onChange={e => set({ ...data, heroImage2: e.target.value })} />
  </div>
);

const ServicesEditor = ({ data, set }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <ImageField label="Dental Image" value={data.servicesImage1} onChange={e => set({ ...data, servicesImage1: e.target.value })} />
      <ImageField label="Skin Care Image" value={data.servicesImage2} onChange={e => set({ ...data, servicesImage2: e.target.value })} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <ServiceListEditor label="Dental Services (বাংলা)" items={data.dentalServicesBn} onChange={v => set({ ...data, dentalServicesBn: v })} iconSet={DENTAL_ICONS} />
      <ServiceListEditor label="Dental Services (English)" items={data.dentalServicesEn} onChange={v => set({ ...data, dentalServicesEn: v })} iconSet={DENTAL_ICONS} />
      <ServiceListEditor label="Skin Services (বাংলা)" items={data.skinServicesBn} onChange={v => set({ ...data, skinServicesBn: v })} iconSet={SKIN_ICONS} />
      <ServiceListEditor label="Skin Services (English)" items={data.skinServicesEn} onChange={v => set({ ...data, skinServicesEn: v })} iconSet={SKIN_ICONS} />
    </div>
  </div>
);

const DentalEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.dentalTitleBn} onChange={e => set({ ...data, dentalTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.dentalTitleEn} onChange={e => set({ ...data, dentalTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.dentalDescBn} onChange={e => set({ ...data, dentalDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.dentalDescEn} onChange={e => set({ ...data, dentalDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Dental Image" value={data.dentalImage} onChange={e => set({ ...data, dentalImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <FeatureListEditor label="Features (বাংলা)" items={data.dentalFeaturesBn} onChange={v => set({ ...data, dentalFeaturesBn: v })} iconSet={DENTAL_ICONS} />
      <FeatureListEditor label="Features (English)" items={data.dentalFeaturesEn} onChange={v => set({ ...data, dentalFeaturesEn: v })} iconSet={DENTAL_ICONS} />
    </div>
  </div>
);

const SkinEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.skinTitleBn} onChange={e => set({ ...data, skinTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.skinTitleEn} onChange={e => set({ ...data, skinTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.skinDescBn} onChange={e => set({ ...data, skinDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.skinDescEn} onChange={e => set({ ...data, skinDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Skin Care Image" value={data.skinImage} onChange={e => set({ ...data, skinImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <FeatureListEditor label="Features (বাংলা)" items={data.skinFeaturesBn} onChange={v => set({ ...data, skinFeaturesBn: v })} iconSet={SKIN_ICONS} />
      <FeatureListEditor label="Features (English)" items={data.skinFeaturesEn} onChange={v => set({ ...data, skinFeaturesEn: v })} iconSet={SKIN_ICONS} />
    </div>
  </div>
);

const AboutEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.aboutTitleBn} onChange={e => set({ ...data, aboutTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.aboutTitleEn} onChange={e => set({ ...data, aboutTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.aboutDescBn} onChange={e => set({ ...data, aboutDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.aboutDescEn} onChange={e => set({ ...data, aboutDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="About Image" value={data.aboutImage} onChange={e => set({ ...data, aboutImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[1,2,3].map(n => (
        <div key={n} className="bg-white/5 p-4 rounded-2xl flex flex-col gap-2">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase">Stat {n}</p>
          <InputField label="Label" value={data[`aboutStat${n}Label`]} onChange={e => set({ ...data, [`aboutStat${n}Label`]: e.target.value })} placeholder="যেমন: Specialists" />
          <InputField label="Value" value={data[`aboutStat${n}Value`]} onChange={e => set({ ...data, [`aboutStat${n}Value`]: e.target.value })} placeholder="যেমন: 10+" />
        </div>
      ))}
    </div>
  </div>
);

const ContactInfoEditor = ({ data, set }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
    <InputField label="Phone" value={data.phone} onChange={e => set({ ...data, phone: e.target.value })} placeholder="01700-000000" />
    <InputField label="WhatsApp" value={data.whatsapp} onChange={e => set({ ...data, whatsapp: e.target.value })} placeholder="8801700000000" />
    <InputField label="Address" value={data.address} onChange={e => set({ ...data, address: e.target.value })} placeholder="Moulvibazar, Sylhet" />
    <InputField label="Google Map Link" value={data.mapLink} onChange={e => set({ ...data, mapLink: e.target.value })} placeholder="https://maps.google.com/..." />
  </div>
);

// ---- Main ----
const ManageSiteContent = ({ lang }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchSection(activeSection); }, [activeSection]);

  const fetchSection = async (sec) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API}/${sec}`);
      setData(res.data);
    } catch { setError('ডেটা লোড হয়নি।'); }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const { _id, __v, createdAt, updatedAt, section, ...cleanData } = data;
      const res = await axios.put(`${API}/${activeSection}`, cleanData);
      if (res.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        fetchSection(activeSection);
      } else { setError('সেভ হয়নি।'); }
    } catch { setError('সেভ failed!'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('এই section এর সব data delete করবেন?')) return;
    try {
      await axios.put(`${API}/${activeSection}`, {
        heroTitleBn:'', heroTitleEn:'', heroSubBn:'', heroSubEn:'',
        heroDescBn:'', heroDescEn:'', heroImage1:'', heroImage2:'',
        servicesImage1:'', servicesImage2:'',
        dentalServicesBn:[], dentalServicesEn:[],
        skinServicesBn:[], skinServicesEn:[],
        dentalTitleBn:'', dentalTitleEn:'', dentalDescBn:'', dentalDescEn:'', dentalImage:'',
        dentalFeaturesBn:[], dentalFeaturesEn:[],
        skinTitleBn:'', skinTitleEn:'', skinDescBn:'', skinDescEn:'', skinImage:'',
        skinFeaturesBn:[], skinFeaturesEn:[],
        aboutTitleBn:'', aboutTitleEn:'', aboutDescBn:'', aboutDescEn:'', aboutImage:'',
        aboutStat1Label:'', aboutStat1Value:'',
        aboutStat2Label:'', aboutStat2Value:'',
        aboutStat3Label:'', aboutStat3Value:'',
        phone:'', whatsapp:'', address:'', mapLink:'',
      });
      fetchSection(activeSection);
    } catch { setError('Delete failed!'); }
  };

  const renderEditor = () => {
    if (loading) return <div className="text-gray-500 text-xs uppercase tracking-widest py-10 text-center animate-pulse">লোড হচ্ছে...</div>;
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
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            className={`px-3 sm:px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
              activeSection === s.key ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400 hover:text-[#D4AF37] border border-white/10'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111111] rounded-[24px] sm:rounded-[28px] border border-white/5 p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6 gap-2">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-xs sm:text-sm italic truncate">
            {sections.find(s => s.key === activeSection)?.label}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-[10px] font-black uppercase bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">
              <Trash2 size={12} />
              <span className="hidden sm:inline">ডিলিট</span>
            </button>
            <button onClick={handleSave} disabled={saving}
              className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
                saved ? 'bg-green-500 text-white' : saving ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-[#D4AF37] text-black hover:bg-white'
              }`}>
              <Save size={12} />
              <span>{saving ? 'সেভ...' : saved ? '✓ সেভ!' : 'সেভ করুন'}</span>
            </button>
          </div>
        </div>
        {error && <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-bold uppercase tracking-widest">⚠ {error}</div>}
        {renderEditor()}
      </div>
    </div>
  );
};

export default ManageSiteContent;