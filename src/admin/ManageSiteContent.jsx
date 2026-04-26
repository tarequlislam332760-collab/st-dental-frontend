import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, Edit3, X } from 'lucide-react';

const API = 'https://st-dental-backend.vercel.app/api/site-content';

const sections = [
  { key: 'hero',        label: 'Hero Section' },
  { key: 'services',    label: 'Services' },
  { key: 'dental',      label: 'Dental Care' },
  { key: 'skincare',    label: 'Skin Care' },
  { key: 'about',       label: 'About' },
  { key: 'contactinfo', label: 'Contact Info' },
];

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

const ImageField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase font-black tracking-widest text-[#D4AF37]">{label}</label>
    <input type="text" placeholder="Image URL paste করুন" value={value || ''} onChange={onChange}
      className="bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
    {value && <img src={value} alt="preview" className="w-full max-h-40 object-cover rounded-xl border border-white/10 mt-1" onError={e => e.target.style.display='none'} />}
  </div>
);

const ServiceListEditor = ({ label, items = [], onChange }) => {
  const add = () => onChange([...items, { name: '', icon: 'Star' }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, field, val) => { const u = [...items]; u[i] = { ...u[i], [field]: val }; onChange(u); };
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
          <input type="text" placeholder="Name" value={item.name || ''} onChange={e => update(i, 'name', e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <input type="text" placeholder="Icon" value={item.icon || ''} onChange={e => update(i, 'icon', e.target.value)}
            className="w-24 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <button onClick={() => remove(i)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={13} /></button>
        </div>
      ))}
    </div>
  );
};

const FeatureListEditor = ({ label, items = [], onChange }) => {
  const add = () => onChange([...items, { icon: 'Star', text: '' }]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, field, val) => { const u = [...items]; u[i] = { ...u[i], [field]: val }; onChange(u); };
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
          <input type="text" placeholder="Icon" value={item.icon || ''} onChange={e => update(i, 'icon', e.target.value)}
            className="w-24 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <input type="text" placeholder="Text" value={item.text || ''} onChange={e => update(i, 'text', e.target.value)}
            className="flex-1 bg-black/50 border border-white/10 text-white text-sm rounded-xl px-3 py-2 outline-none focus:border-[#D4AF37]" />
          <button onClick={() => remove(i)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={13} /></button>
        </div>
      ))}
    </div>
  );
};

// ---- Forms ----
const HeroForm = ({ data, set }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

const ServicesForm = ({ data, set }) => (
  <div className="flex flex-col gap-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <ImageField label="Dental Image" value={data.servicesImage1} onChange={e => set({ ...data, servicesImage1: e.target.value })} />
      <ImageField label="Skin Care Image" value={data.servicesImage2} onChange={e => set({ ...data, servicesImage2: e.target.value })} />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ServiceListEditor label="Dental Services (বাংলা)" items={data.dentalServicesBn} onChange={v => set({ ...data, dentalServicesBn: v })} />
      <ServiceListEditor label="Dental Services (English)" items={data.dentalServicesEn} onChange={v => set({ ...data, dentalServicesEn: v })} />
      <ServiceListEditor label="Skin Services (বাংলা)" items={data.skinServicesBn} onChange={v => set({ ...data, skinServicesBn: v })} />
      <ServiceListEditor label="Skin Services (English)" items={data.skinServicesEn} onChange={v => set({ ...data, skinServicesEn: v })} />
    </div>
  </div>
);

const DentalForm = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.dentalTitleBn} onChange={e => set({ ...data, dentalTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.dentalTitleEn} onChange={e => set({ ...data, dentalTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.dentalDescBn} onChange={e => set({ ...data, dentalDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.dentalDescEn} onChange={e => set({ ...data, dentalDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Dental Image" value={data.dentalImage} onChange={e => set({ ...data, dentalImage: e.target.value })} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureListEditor label="Features (বাংলা)" items={data.dentalFeaturesBn} onChange={v => set({ ...data, dentalFeaturesBn: v })} />
      <FeatureListEditor label="Features (English)" items={data.dentalFeaturesEn} onChange={v => set({ ...data, dentalFeaturesEn: v })} />
    </div>
  </div>
);

const SkinForm = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.skinTitleBn} onChange={e => set({ ...data, skinTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.skinTitleEn} onChange={e => set({ ...data, skinTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.skinDescBn} onChange={e => set({ ...data, skinDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.skinDescEn} onChange={e => set({ ...data, skinDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="Skin Care Image" value={data.skinImage} onChange={e => set({ ...data, skinImage: e.target.value })} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FeatureListEditor label="Features (বাংলা)" items={data.skinFeaturesBn} onChange={v => set({ ...data, skinFeaturesBn: v })} />
      <FeatureListEditor label="Features (English)" items={data.skinFeaturesEn} onChange={v => set({ ...data, skinFeaturesEn: v })} />
    </div>
  </div>
);

const AboutForm = ({ data, set }) => (
  <div className="flex flex-col gap-5">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <InputField label="Title (বাংলা)" value={data.aboutTitleBn} onChange={e => set({ ...data, aboutTitleBn: e.target.value })} />
      <InputField label="Title (English)" value={data.aboutTitleEn} onChange={e => set({ ...data, aboutTitleEn: e.target.value })} />
      <InputField label="Description (বাংলা)" value={data.aboutDescBn} onChange={e => set({ ...data, aboutDescBn: e.target.value })} textarea />
      <InputField label="Description (English)" value={data.aboutDescEn} onChange={e => set({ ...data, aboutDescEn: e.target.value })} textarea />
    </div>
    <ImageField label="About Image" value={data.aboutImage} onChange={e => set({ ...data, aboutImage: e.target.value })} />
    <div className="grid grid-cols-3 gap-4">
      {[1,2,3].map(n => (
        <div key={n} className="bg-white/5 p-4 rounded-2xl flex flex-col gap-2">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase">Stat {n}</p>
          <InputField label="Label" value={data[`aboutStat${n}Label`]} onChange={e => set({ ...data, [`aboutStat${n}Label`]: e.target.value })} />
          <InputField label="Value" value={data[`aboutStat${n}Value`]} onChange={e => set({ ...data, [`aboutStat${n}Value`]: e.target.value })} />
        </div>
      ))}
    </div>
  </div>
);

const ContactForm = ({ data, set }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <InputField label="Phone" value={data.phone} onChange={e => set({ ...data, phone: e.target.value })} placeholder="01700-000000" />
    <InputField label="WhatsApp" value={data.whatsapp} onChange={e => set({ ...data, whatsapp: e.target.value })} placeholder="8801700000000" />
    <InputField label="Address" value={data.address} onChange={e => set({ ...data, address: e.target.value })} placeholder="Moulvibazar, Sylhet" />
    <InputField label="Google Map Link" value={data.mapLink} onChange={e => set({ ...data, mapLink: e.target.value })} placeholder="https://maps.google.com/..." />
  </div>
);

// ---- Saved Data Preview ----
const DataPreview = ({ secKey, d, onEdit, onDelete }) => {
  const hasData = d && Object.keys(d).some(k => !['_id','__v','section','createdAt','updatedAt'].includes(k) && d[k] && (Array.isArray(d[k]) ? d[k].length > 0 : true));

  if (!hasData) return (
    <div className="text-center py-10">
      <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">কোনো data save হয়নি</p>
      <button onClick={onEdit} className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase bg-[#D4AF37] text-black hover:bg-white transition-all mx-auto">
        <Plus size={13} /> এখন যোগ করুন
      </button>
    </div>
  );

  const Row = ({ label, val }) => val ? (
    <div className="flex flex-col gap-1">
      <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
      <p className="text-white text-sm font-medium">{val}</p>
    </div>
  ) : null;

  const ImgRow = ({ label, src }) => src ? (
    <div className="flex flex-col gap-2">
      <p className="text-[9px] text-gray-500 uppercase tracking-widest">{label}</p>
      <img src={src} className="h-28 w-full object-cover rounded-xl border border-white/10" alt="" onError={e => e.target.style.display='none'} />
    </div>
  ) : null;

  const ListRow = ({ label, items }) => items?.length > 0 ? (
    <div>
      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      {items.map((s,i) => <p key={i} className="text-white text-xs py-1 border-b border-white/5">• {s.name || s.text} {s.icon ? `(${s.icon})` : ''}</p>)}
    </div>
  ) : null;

  const renderContent = () => {
    switch(secKey) {
      case 'hero': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Title BN" val={d.heroTitleBn} />
          <Row label="Title EN" val={d.heroTitleEn} />
          <Row label="Sub BN" val={d.heroSubBn} />
          <Row label="Sub EN" val={d.heroSubEn} />
          <Row label="Desc BN" val={d.heroDescBn} />
          <Row label="Desc EN" val={d.heroDescEn} />
          <ImgRow label="Image 1" src={d.heroImage1} />
          <ImgRow label="Image 2" src={d.heroImage2} />
        </div>
      );
      case 'services': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ImgRow label="Dental Image" src={d.servicesImage1} />
          <ImgRow label="Skin Image" src={d.servicesImage2} />
          <ListRow label="Dental Services BN" items={d.dentalServicesBn} />
          <ListRow label="Dental Services EN" items={d.dentalServicesEn} />
          <ListRow label="Skin Services BN" items={d.skinServicesBn} />
          <ListRow label="Skin Services EN" items={d.skinServicesEn} />
        </div>
      );
      case 'dental': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Title BN" val={d.dentalTitleBn} />
          <Row label="Title EN" val={d.dentalTitleEn} />
          <Row label="Desc BN" val={d.dentalDescBn} />
          <Row label="Desc EN" val={d.dentalDescEn} />
          <ImgRow label="Image" src={d.dentalImage} />
          <ListRow label="Features BN" items={d.dentalFeaturesBn} />
          <ListRow label="Features EN" items={d.dentalFeaturesEn} />
        </div>
      );
      case 'skincare': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Title BN" val={d.skinTitleBn} />
          <Row label="Title EN" val={d.skinTitleEn} />
          <Row label="Desc BN" val={d.skinDescBn} />
          <Row label="Desc EN" val={d.skinDescEn} />
          <ImgRow label="Image" src={d.skinImage} />
          <ListRow label="Features BN" items={d.skinFeaturesBn} />
          <ListRow label="Features EN" items={d.skinFeaturesEn} />
        </div>
      );
      case 'about': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Title BN" val={d.aboutTitleBn} />
          <Row label="Title EN" val={d.aboutTitleEn} />
          <Row label="Desc BN" val={d.aboutDescBn} />
          <Row label="Desc EN" val={d.aboutDescEn} />
          <ImgRow label="Image" src={d.aboutImage} />
          <div className="md:col-span-2">
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-2">Stats</p>
            <div className="flex gap-4">
              {[1,2,3].map(n => d[`aboutStat${n}Value`] && (
                <div key={n} className="bg-white/5 p-3 rounded-xl flex-1 text-center">
                  <p className="text-[#D4AF37] font-black text-lg">{d[`aboutStat${n}Value`]}</p>
                  <p className="text-gray-400 text-[9px] uppercase">{d[`aboutStat${n}Label`]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case 'contactinfo': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Row label="Phone" val={d.phone} />
          <Row label="WhatsApp" val={d.whatsapp} />
          <Row label="Address" val={d.address} />
          {d.mapLink && <div><p className="text-[9px] text-gray-500 uppercase mb-1">Map Link</p><p className="text-[#D4AF37] text-xs truncate">{d.mapLink}</p></div>}
        </div>
      );
      default: return null;
    }
  };

  return (
    <div>
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 mb-4">
        {renderContent()}
      </div>
      <div className="flex gap-3">
        <button onClick={onEdit}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-xl text-[10px] font-black uppercase hover:bg-[#D4AF37] hover:text-black transition-all">
          <Edit3 size={13} /> এডিট করুন
        </button>
        <button onClick={onDelete}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition-all">
          <Trash2 size={13} /> ডিলিট করুন
        </button>
      </div>
    </div>
  );
};

// ---- Main ----
const ManageSiteContent = ({ lang }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [savedData, setSavedData] = useState({});
  const [formData, setFormData] = useState({});
  const [mode, setMode] = useState('view');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSection(activeSection);
    setMode('view');
  }, [activeSection]);

  const fetchSection = async (sec) => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API}/${sec}`);
      setSavedData(res.data);
      setFormData(res.data);
    } catch { setError('ডেটা লোড হয়নি।'); }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const { _id, __v, createdAt, updatedAt, section, ...cleanData } = formData;
      const res = await axios.put(`${API}/${activeSection}`, cleanData);
      if (res.data?.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
        await fetchSection(activeSection);
        setMode('view');
      } else { setError('সেভ হয়নি।'); }
    } catch { setError('সেভ failed!'); }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('এই section এর সব data delete করবেন?')) return;
    try {
      await axios.put(`${API}/${activeSection}`, {
        heroTitleBn:'', heroTitleEn:'', heroSubBn:'', heroSubEn:'', heroDescBn:'', heroDescEn:'', heroImage1:'', heroImage2:'',
        servicesImage1:'', servicesImage2:'',
        dentalServicesBn:[], dentalServicesEn:[], skinServicesBn:[], skinServicesEn:[],
        dentalTitleBn:'', dentalTitleEn:'', dentalDescBn:'', dentalDescEn:'', dentalImage:'',
        dentalFeaturesBn:[], dentalFeaturesEn:[],
        skinTitleBn:'', skinTitleEn:'', skinDescBn:'', skinDescEn:'', skinImage:'',
        skinFeaturesBn:[], skinFeaturesEn:[],
        aboutTitleBn:'', aboutTitleEn:'', aboutDescBn:'', aboutDescEn:'', aboutImage:'',
        aboutStat1Label:'', aboutStat1Value:'', aboutStat2Label:'', aboutStat2Value:'', aboutStat3Label:'', aboutStat3Value:'',
        phone:'', whatsapp:'', address:'', mapLink:'',
      });
      await fetchSection(activeSection);
      setMode('view');
    } catch { setError('Delete failed!'); }
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'hero':        return <HeroForm data={formData} set={setFormData} />;
      case 'services':    return <ServicesForm data={formData} set={setFormData} />;
      case 'dental':      return <DentalForm data={formData} set={setFormData} />;
      case 'skincare':    return <SkinForm data={formData} set={setFormData} />;
      case 'about':       return <AboutForm data={formData} set={setFormData} />;
      case 'contactinfo': return <ContactForm data={formData} set={setFormData} />;
      default: return null;
    }
  };

  return (
    <div className="w-full space-y-6 pb-10">
      <div className="flex flex-wrap gap-2">
        {sections.map(s => (
          <button key={s.key} onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeSection === s.key ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400 hover:text-[#D4AF37] border border-white/10'
            }`}>{s.label}</button>
        ))}
      </div>

      <div className="bg-[#111111] rounded-[28px] border border-white/5 p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-sm italic">
            {sections.find(s => s.key === activeSection)?.label}
          </h3>
          <div className="flex gap-2">
            {mode === 'view' ? (
              <button onClick={() => { setFormData(savedData); setMode('edit'); }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase bg-[#D4AF37] text-black hover:bg-white transition-all">
                <Plus size={13} /> যোগ / এডিট
              </button>
            ) : (
              <>
                <button onClick={() => { setMode('view'); setFormData(savedData); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all">
                  <X size={13} /> বাতিল
                </button>
                <button onClick={handleSave} disabled={saving}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase transition-all ${
                    saved ? 'bg-green-500 text-white' : saving ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-[#D4AF37] text-black hover:bg-white'
                  }`}>
                  <Save size={13} />
                  {saving ? 'সেভ হচ্ছে...' : saved ? '✓ সেভ হয়েছে!' : 'সেভ করুন'}
                </button>
              </>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl font-bold uppercase tracking-widest">⚠ {error}</div>
        )}

        {loading ? (
          <div className="text-gray-500 text-xs uppercase tracking-widest py-10 text-center animate-pulse">লোড হচ্ছে...</div>
        ) : mode === 'view' ? (
          <DataPreview
            secKey={activeSection}
            d={savedData}
            onEdit={() => { setFormData(savedData); setMode('edit'); }}
            onDelete={handleDelete}
          />
        ) : renderForm()}
      </div>
    </div>
  );
};

export default ManageSiteContent;