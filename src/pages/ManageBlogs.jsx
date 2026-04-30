import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Save, X, Image as ImageIcon, FileText } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

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

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ব্যাকএন্ডের blogController-এর সাথে মিল রেখে ডেটা অবজেক্ট তৈরি
        const blogData = {
            title: formData.title,
            description: formData.content, // কন্ট্রোলারের description ফিল্ডে পাঠানো হচ্ছে
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
            alert("Action failed! Check Console.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(lang === 'bn' ? "আপনি কি এটি ডিলিট করতে চান?" : "Are you sure?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchBlogs();
            } catch (err) {
                alert("Delete failed!");
            }
        }
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        setFormData({ 
            title: blog.title, 
            content: blog.description || blog.content, // description সাপোর্ট করা হলো
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
                    className="flex items-center gap-2 bg-[#D4AF37] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg text-sm"
                >
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
                                        <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
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
                                        <button onClick={() => openEditModal(blog)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#0f0f0f] border border-[#D4AF37]/20 p-8 rounded-[40px] w-full max-w-2xl shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-xl font-bold text-white italic">
                                    {editingBlog ? 'Edit Blog' : 'Create New Blog'}
                                </h4>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Title</label>
                                    <input 
                                        type="text" required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Image URL</label>
                                    <input 
                                        type="text" required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none"
                                        value={formData.image}
                                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase text-gray-500 font-bold mb-2 block">Content</label>
                                    <textarea 
                                        required rows="5"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none resize-none"
                                        value={formData.content}
                                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-xl shadow-xl hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-2">
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