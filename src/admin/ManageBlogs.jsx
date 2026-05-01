import React, { useState, useEffect, useRef } from 'react';
import { Edit, Trash2, Plus, Save, X, Upload, Link } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const CLOUD_NAME = 'dfe3wlx4u';
const UPLOAD_PRESET = 'st_dental';

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

// Image field with upload + URL option
const ImageField = ({ value, onChange }) => {
  const [tab, setTab] = useState('upload');
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
      alert('Upload failed! Cloudinary preset Unsigned আছে কিনা check করুন।');
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Tab switcher */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit">
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
        <div onClick={() => !uploading && fileRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${uploading ? 'border-yellow-500/50 bg-yellow-500/5' : 'border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/5'}`}>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#D4AF37] text-xs font-bold">আপলোড হচ্ছে...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={22} className="text-gray-500" />
              <p className="text-gray-400 text-sm font-medium">ছবি বেছে নিন</p>
              <p className="text-gray-600 text-xs">JPG, PNG, WEBP</p>
            </div>
          )}
        </div>
      ) : (
        <input type="text" placeholder="https://example.com/image.jpg"
          value={value || ''} onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#D4AF37] outline-none" />
      )}

      {/* Preview */}
      {value && (
        <div className="relative">
          <img src={value} alt="preview" className="w-full h-32 object-cover rounded-xl border border-white/10"
            onError={e => e.target.style.display = 'none'} />
          <button type="button" onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
            <X size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

const ManageBlogs = ({ lang }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        author: 'Admin'
    });

    const API_URL = 'https://st-dental-backend.vercel.app/api/blogs';

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setBlogs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setLoading(false);
        }
    };

    useEffect(() => { fetchBlogs(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = {
            title: formData.title,
            description: formData.content,
            image: formData.image,
            author: formData.author
        };
        try {
            if (editingBlog) {
                await axios.put(`${API_URL}/${editingBlog._id}`, blogData);
            } else {
                await axios.post(API_URL, blogData);
            }
            setIsModalOpen(false);
            setEditingBlog(null);
            setFormData({ title: '', content: '', image: '', author: 'Admin' });
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert("Action failed!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchBlogs();
            } catch { alert("Delete failed!"); }
        }
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.description || blog.content,
            image: blog.image,
            author: blog.author || 'Admin'
        });
        setIsModalOpen(true);
    };

    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black uppercase tracking-widest text-[#D4AF37]">
                    {lang === 'bn' ? 'ব্লগ ম্যানেজমেন্ট' : 'Manage Blogs'}
                </h3>
                <button
                    onClick={() => { setEditingBlog(null); setFormData({ title: '', content: '', image: '', author: 'Admin' }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm">
                    <Plus size={18} /> {lang === 'bn' ? 'নতুন ব্লগ' : 'Add Blog'}
                </button>
            </div>

            <div className="bg-[#111111] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                    <thead className="bg-black/40 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                        <tr>
                            <th className="p-6">Blog Info</th>
                            <th className="p-6">Content Preview</th>
                            <th className="p-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan="3" className="p-10 text-center animate-pulse text-gray-500">Loading Blogs...</td></tr>
                        ) : blogs.map((blog) => (
                            <tr key={blog._id} className="hover:bg-white/[0.02] transition-all">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10" onError={e => e.target.style.display='none'} />
                                        <div>
                                            <p className="font-bold text-gray-200">{blog.title}</p>
                                            <p className="text-[10px] text-[#D4AF37] uppercase">{blog.author}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <p className="text-sm text-gray-500 truncate max-w-xs">{blog.description || blog.content}</p>
                                </td>
                                <td className="p-6">
                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => openEditModal(blog)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs.length === 0 && !loading && <p className="p-10 text-center text-gray-600 uppercase text-xs tracking-widest">No Blogs Found</p>}
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#0f0f0f] border border-[#D4AF37]/20 p-8 rounded-[40px] w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold text-white italic">
                                    {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                </h4>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Title</label>
                                    <input type="text" required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Image</label>
                                    <ImageField
                                        value={formData.image}
                                        onChange={url => setFormData({ ...formData, image: url })}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Content</label>
                                    <textarea required rows="5"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none resize-none"
                                        value={formData.content}
                                        onChange={e => setFormData({ ...formData, content: e.target.value })} />
                                </div>

                                <button type="submit"
                                    className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl shadow-xl hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                    <Save size={18} /> {editingBlog ? 'Update Blog' : 'Publish Blog'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageBlogs;