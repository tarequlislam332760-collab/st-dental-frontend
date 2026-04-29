import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Menu } from 'lucide-react';
import * as Lucide from 'lucide-react';

const API = 'https://st-dental-backend.vercel.app/api/site-content';

const sections = [
  { key: 'hero',        label: '🏠 Hero' },
  { key: 'services',    label: '⚙️ Services' },
  { key: 'dental',      label: '🦷 Dental' },
  { key: 'skincare',    label: '✨ Skin Care' },
  { key: 'about',       label: '👤 About' },
  { key: 'contactinfo', label: '📞 Contact' },
];

const ICON_GROUPS = [
  {
    group: '🦷 Dental',
    icons: ['Smile','Zap','ShieldCheck','Shield','Activity','Stethoscope','Syringe','Thermometer','Microscope','Scissors','Pill','Bone','Brain','Star','Award','CheckCircle','BadgeCheck'],
  },
  {
    group: '✨ Skin',
    icons: ['Sparkles','Sparkle','Sun','Moon','Droplets','Leaf','Flower','Flower2','Wind','Feather','Heart','Eye','UserCircle','UserCheck','Gem','Crown','Wand2','Palette'],
  },
  {
    group: '🏥 General',
    icons: ['Clock','Calendar','MapPin','Phone','Mail','Target','Users','User','Building','Home','Camera','Star','ThumbsUp','Lightbulb','Rocket','Globe','Lock','Key'],
  },
];

const SafeIcon = ({ name, size = 18, className = "" }) => {
  const IconComponent = Lucide[name] || Lucide.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const IconPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-black/50 border border-white/10 text-white text-xs rounded-xl px-2 py-2 w-full hover:border-[#D4AF37]/50 transition-all"
      >
        <SafeIcon name={value || 'Star'} size={14} className="text-[#D4AF37] shrink-0" />
        <span className="flex-1 text-left truncate text-[10px]">{value || 'Star'}</span>
        <ChevronDown size={12} className="text-gray-500 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-[100] top-full left-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          style={{ width: 'min(260px, 90vw)' }}>
          {/* Group Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto">
            {ICON_GROUPS.map((g, i) => (
              <button key={i} type="button" onClick={() => setActiveGroup(i)}
                className={`flex-shrink-0 px-2 py-2 text-[9px] font-black uppercase transition-all whitespace-nowrap ${
                  activeGroup === i ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'
                }`}>
                {g.group}
              </button>
            ))}
          </div>
          {/* Icons Grid */}
          <div className="p-2 grid grid-cols-6 gap-1 max-h-40 overflow-y-auto">
            {ICON_GROUPS[activeGroup].icons.map(icon => (
              <button key={icon} type="button"
                onClick={() => { onChange(icon); setOpen(false); }}
                title={icon}
                className={`flex items-center justify-center p-2 rounded-lg hover:bg-[#D4AF37]/20 transition-all ${
                  value === icon ? 'bg-[#D4AF37]/30 border border-[#D4AF37]/50' : ''
                }`}>
                <SafeIcon name={icon} size={16} className={value === icon ? 'text-[#D4AF37]' : 'text-gray-400'} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, textarea = false, placeholder = '' }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    {textarea ? (
      <textarea value={value || ''} onChange={onChange} rows={3} placeholder={placeholder}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37] resize-none w-full" />
    ) : (
      <input type="text" value={value || ''} onChange={onChange} placeholder={placeholder}
        className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37] w-full" />
    )}
  </div>
);

const ImageField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    <input type="text" placeholder="Image URL paste করুন" value={value || ''} onChange={onChange}
      className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37] w-full" />
    {value && (
      <img src={value} alt="preview" className="w-full max-h-36 object-cover rounded-xl border border-white/10" />
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[9px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
        <button onClick={add}
          className="flex items-center gap-1 text-[9px] uppercase font-black text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-1 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all">
          <Plus size={9} /> Add
        </button>
      </div>
      {items.length === 0 && (
        <p className="text-gray-600 text-[10px] italic text-center py-2">Add বাটনে click করুন</p>
      )}
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 bg-white/[0.03] p-2 rounded-xl border border-white/5">
          <input type="text" placeholder="Service নাম লিখুন" value={item.name || ''}
            onChange={(e) => update(i, 'name', e.target.value)}
            className="w-full bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <IconPicker value={item.icon} onChange={(val) => update(i, 'icon', val)} />
            </div>
            <button onClick={() => remove(i)}
              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shrink-0">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---- Section Editors ----

const HeroEditor = ({ data, set }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="Title (বাংলা)" value={data.heroTitleBn} onChange={e => set({ ...data, heroTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.heroTitleEn} onChange={e => set({ ...data, heroTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.heroDescBn} onChange={e => set({ ...data, heroDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.heroDescEn} onChange={e => set({ ...data, heroDescEn: e.target.value })} textarea />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageField label="Hero Image 1" value={data.heroImage1} onChange={e => set({ ...data, heroImage1: e.target.value })} />
      <ImageField label="Hero Image 2" value={data.heroImage2} onChange={e => set({ ...data, heroImage2: e.target.value })} />
    </div>
  </div>
);

const ServicesEditor = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageField label="Dental Image" value={data.servicesImage1} onChange={e => set({ ...data, servicesImage1: e.target.value })} />
      <ImageField label="Skin Care Image" value={data.servicesImage2} onChange={e => set({ ...data, servicesImage2: e.target.value })} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <ListEditor label="🦷 Dental Services (বাংলা)" items={data.dentalServicesBn || []} onChange={v => set({ ...data, dentalServicesBn: v })} />
      <ListEditor label="🦷 Dental Services (English)" items={data.dentalServicesEn || []} onChange={v => set({ ...data, dentalServicesEn: v })} />
      <ListEditor label="✨ Skin Services (বাংলা)" items={data.skinServicesBn || []} onChange={v => set({ ...data, skinServicesBn: v })} />
      <ListEditor label="✨ Skin Services (English)" items={data.skinServicesEn || []} onChange={v => set({ ...data, skinServicesEn: v })} />
    </div>
  </div>
);

const DentalEditor = ({ data, set }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="Title (বাংলা)" value={data.dentalTitleBn} onChange={e => set({ ...data, dentalTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.dentalTitleEn} onChange={e => set({ ...data, dentalTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.dentalDescBn} onChange={e => set({ ...data, dentalDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.dentalDescEn} onChange={e => set({ ...data, dentalDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Dental Image" value={data.dentalImage} onChange={e => set({ ...data, dentalImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <ListEditor label="🦷 Features (বাংলা)" items={data.dentalFeaturesBn || []} onChange={v => set({ ...data, dentalFeaturesBn: v })} />
      <ListEditor label="🦷 Features (English)" items={data.dentalFeaturesEn || []} onChange={v => set({ ...data, dentalFeaturesEn: v })} />
    </div>
  </div>
);

const SkinEditor = ({ data, set }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="Title (বাংলা)" value={data.skinTitleBn} onChange={e => set({ ...data, skinTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.skinTitleEn} onChange={e => set({ ...data, skinTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.skinDescBn} onChange={e => set({ ...data, skinDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.skinDescEn} onChange={e => set({ ...data, skinDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Skin Care Image" value={data.skinImage} onChange={e => set({ ...data, skinImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <ListEditor label="✨ Features (বাংলা)" items={data.skinFeaturesBn || []} onChange={v => set({ ...data, skinFeaturesBn: v })} />
      <ListEditor label="✨ Features (English)" items={data.skinFeaturesEn || []} onChange={v => set({ ...data, skinFeaturesEn: v })} />
    </div>
  </div>
);

const AboutEditor = ({ data, set }) => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField label="Description (বাংলা)" value={data.aboutDescBn} onChange={e => set({ ...data, aboutDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.aboutDescEn} onChange={e => set({ ...data, aboutDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="About Image" value={data.aboutImage} onChange={e => set({ ...data, aboutImage: e.target.value })} />
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[1, 2, 3].map(n => (
        <div key={n} className="flex flex-col gap-2 bg-white/5 p-3 rounded-2xl">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase text-center">Stat {n}</p>
          <InputField label="Label" value={data[`aboutStat${n}Label`]} onChange={e => set({ ...data, [`aboutStat${n}Label`]: e.target.value })} placeholder="যেমন: Specialists" />
          <InputField label="Value" value={data[`aboutStat${n}Value`]} onChange={e => set({ ...data, [`aboutStat${n}Value`]: e.target.value })} placeholder="যেমন: 10+" />
        </div>
      ))}
    </div>
  </div>
);

const ContactInfoEditor = ({ data, set }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <InputField label="Phone" value={data.phone} onChange={e => set({ ...data, phone: e.target.value })} placeholder="01XXXXXXXXX" />
    <InputField label="WhatsApp Number" value={data.whatsapp} onChange={e => set({ ...data, whatsapp: e.target.value })} placeholder="880XXXXXXXXXX" />
    <InputField label="Address" value={data.address} onChange={e => set({ ...data, address: e.target.value })} placeholder="Moulvibazar, Sylhet" />
    <InputField label="Google Map Link" value={data.mapLink} onChange={e => set({ ...data, mapLink: e.target.value })} placeholder="https://maps.google.com/..." />
  </div>
);

// ---- Main Component ----

const ManageSiteContent = ({ lang }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [showSectionMenu, setShowSectionMenu] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetchSection(activeSection); }, [activeSection]);

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
    if (loading) return (
      <div className="text-gray-500 text-xs uppercase tracking-widest py-10 text-center animate-pulse">লোড হচ্ছে...</div>
    );
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

  const currentSection = sections.find(s => s.key === activeSection);

  return (
    <div className="w-full space-y-4 pb-10">

      {/* Mobile: Dropdown Section Selector */}
      <div className="block sm:hidden relative">
        <button
          onClick={() => setShowSectionMenu(!showSectionMenu)}
          className="w-full flex items-center justify-between bg-[#111111] border border-[#D4AF37]/20 px-4 py-3 rounded-2xl text-[#D4AF37] font-black text-sm"
        >
          <span>{currentSection?.label}</span>
          {showSectionMenu ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showSectionMenu && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {sections.map(s => (
              <button key={s.key}
                onClick={() => { setActiveSection(s.key); setShowSectionMenu(false); }}
                className={`w-full text-left px-4 py-3 text-sm font-bold transition-all ${
                  activeSection === s.key ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:bg-white/5 hover:text-[#D4AF37]'
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop/Tablet: Tab Buttons */}
      <div className="hidden sm:flex flex-wrap gap-2">
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            className={`px-3 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
              activeSection === s.key
                ? 'bg-[#D4AF37] text-black'
                : 'bg-white/5 text-gray-400 hover:text-[#D4AF37] border border-white/10'
            }`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor Card */}
      <div className="bg-[#111111] rounded-[20px] sm:rounded-[28px] border border-white/5 p-4 sm:p-6 md:p-8">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-5 gap-3">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-wider text-xs sm:text-sm italic">
            {currentSection?.label}
          </h3>
          <button onClick={handleSave} disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all shrink-0 ${
              saved ? 'bg-green-500 text-white' : 'bg-[#D4AF37] text-black hover:bg-white'
            }`}>
            <Save size={12} />
            <span className="hidden xs:inline">
              {saving ? 'সেভ হচ্ছে...' : saved ? '✓ সেভ হয়েছে!' : 'সেভ করুন'}
            </span>
            <span className="xs:hidden">
              {saving ? '...' : saved ? '✓' : 'সেভ'}
            </span>
          </button>
        </div>

        {renderEditor()}
      </div>
    </div>
  );
};

export default ManageSiteContent;