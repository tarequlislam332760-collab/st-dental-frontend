import React, { useState, useEffect, useRef } from 'react';
import { Save, Image as ImageIcon, Type, Layout, Trash2, Edit, X, Upload, Link } from 'lucide-react';
import axios from 'axios';

const API_URL = "https://st-dental-backend.vercel.app/api/blogs";
const CLOUD_NAME = 'dfe3wlx4u';
const UPLOAD_PRESET = 'st_dental';

const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST', body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.secure_url;
};

// ✅ Image field with URL + Cloudinary Upload
const ImageInputField = ({ value, onChange }) => {
  const [mode, setMode] = useState('url');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch {
      alert('ছবি আপলোড হয়নি। আবার চেষ্টা করুন।');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Mode Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-white/10 w-fit">
        <button type="button" onClick={() => setMode('url')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase transition-all ${mode === 'url' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
          <Link size={11} /> URL
        </button>
        <button type="button" onClick={() => setMode('upload')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase transition-all ${mode === 'upload' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}>
          <Upload size={11} /> আপলোড
        </button>
      </div>

      {mode === 'url' && (
        <div className="flex gap-3 items-start">
          <input type="text" value={value || ''} onChange={e => onChange(e.target.value)}
            placeholder="https://image-link.com/photo.jpg"
            className="flex-1 bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" />
          {value && (
            <img src={value} alt="Preview" className="w-20 h-16 object-cover rounded-xl border border-[#D4AF37]/30 shrink-0"
              onError={e => e.target.src = 'https://via.placeholder.com/400'} />
          )}
        </div>
      )}

      {mode === 'upload' && (
        <>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
            className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#D4AF37]/30 rounded-2xl py-5 text-[#D4AF37] text-xs font-black uppercase hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all">
            <Upload size={18} />
            {uploading ? 'Cloudinary তে আপলোড হচ্ছে...' : 'ছবি বেছে নিন'}
          </button>
          {value && (
            <div className="relative group">
              <img src={value} alt="Preview" className="w-full max-h-40 object-cover rounded-xl border border-[#D4AF37]/30"
                onError={e => e.target.src = 'https://via.placeholder.com/400'} />
              <button type="button" onClick={() => onChange('')}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                <X size={12} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ManageBlogs = ({ lang }) => {
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({ title: '', category: 'Dental Care', image: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch { console.error("Failed to fetch blogs"); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, blogData);
        alert(lang === 'bn' ? "ব্লগ আপডেট হয়েছে!" : "Blog updated successfully!");
      } else {
        await axios.post(API_URL, blogData);
        alert(lang === 'bn' ? "ব্লগ সফলভাবে পাবলিশ হয়েছে!" : "Blog published successfully!");
      }
      setBlogData({ title: '', category: 'Dental Care', image: '', content: '' });
      setIsEditing(false);
      fetchBlogs();
    } catch { alert("Action failed!"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (window.confirm(lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure?")) {
      try { await axios.delete(`${API_URL}/${id}`); fetchBlogs(); }
      catch { alert("Delete failed!"); }
    }
  };

  const startEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);
    setBlogData({ title: blog.title, category: blog.category, image: blog.image, content: blog.content });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      {/* Form */}
      <div className="bg-[#111111] p-6 md:p-10 rounded-[35px] border border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black text-[#D4AF37] uppercase italic">
            {isEditing ? (lang === 'bn' ? "ব্লগ এডিট করুন" : "Edit Blog") : (lang === 'bn' ? "নতুন ব্লগ আপলোড করুন" : "Upload New Blog")}
          </h3>
          {isEditing && (
            <button onClick={() => { setIsEditing(false); setBlogData({ title: '', category: 'Dental Care', image: '', content: '' }); }}
              className="text-red-500 flex items-center gap-2 text-xs font-bold uppercase">
              <X size={14} /> Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Type size={12} /> Title</label>
              <input required type="text" value={blogData.title} onChange={e => setBlogData({ ...blogData, title: e.target.value })}
                className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="Blog Title..." />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Layout size={12} /> Category</label>
              <select value={blogData.category} onChange={e => setBlogData({ ...blogData, category: e.target.value })}
                className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white">
                <option value="Dental Care">Dental Care</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Surgery">Surgery</option>
                <option value="Wellness">Wellness</option>
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><ImageIcon size={12} /> Blog Image</label>
            <ImageInputField value={blogData.image} onChange={v => setBlogData({ ...blogData, image: v })} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-gray-500">Content Description</label>
            <textarea required rows="5" value={blogData.content} onChange={e => setBlogData({ ...blogData, content: e.target.value })}
              className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="Write blog content here..."></textarea>
          </div>

          <button disabled={loading} type="submit"
            className="bg-[#D4AF37] text-black font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all">
            <Save size={18} />
            {loading ? "Processing..." : (isEditing ? (lang === 'bn' ? "আপডেট করুন" : "Update Blog") : (lang === 'bn' ? "পাবলিশ করুন" : "Publish Blog"))}
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="bg-[#111111] rounded-[35px] border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-[#D4AF37] font-black uppercase tracking-widest text-sm italic">
            {lang === 'bn' ? "ব্লগ লিস্ট" : "Blog List"}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/30 text-gray-500 text-[10px] uppercase font-bold">
              <tr>
                <th className="p-6">Image</th>
                <th className="p-6">Title</th>
                <th className="p-6">Category</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-white/[0.02] transition-all">
                  <td className="p-6">
                    <img src={blog.image || 'https://via.placeholder.com/400'} alt={blog.title}
                      className="w-16 h-10 object-cover rounded-lg border border-white/10"
                      onError={e => e.target.src = 'https://via.placeholder.com/400'} />
                  </td>
                  <td className="p-6 font-bold text-gray-200 min-w-[200px]">{blog.title}</td>
                  <td className="p-6">
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase border border-[#D4AF37]/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => startEdit(blog)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 && <p className="p-10 text-center text-gray-600 uppercase text-xs tracking-widest">No Blogs Found</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;