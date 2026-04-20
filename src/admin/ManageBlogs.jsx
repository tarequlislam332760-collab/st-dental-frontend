import React, { useState } from 'react';
import { Save, Image as ImageIcon, Type, Layout } from 'lucide-react';
import axios from 'axios';

const ManageBlogs = ({ lang }) => {
  const [blogData, setBlogData] = useState({ title: '', category: 'Dental Care', image: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://st-dental-backend.vercel.app/api/blogs', blogData);
      alert(lang === 'bn' ? "ব্লগ সফলভাবে পাবলিশ হয়েছে!" : "Blog published successfully!");
      setBlogData({ title: '', category: 'Dental Care', image: '', description: '' });
    } catch (err) {
      alert("Failed to upload blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] p-6 md:p-10 rounded-[35px] border border-white/5 shadow-2xl">
      <h3 className="text-xl font-black text-[#D4AF37] uppercase italic mb-8">
        {lang === 'bn' ? "নতুন ব্লগ আপলোড করুন" : "Upload New Blog"}
      </h3>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Type size={12}/> Title</label>
            <input required type="text" value={blogData.title} onChange={(e)=>setBlogData({...blogData, title: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="Blog Title..." />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><Layout size={12}/> Category</label>
            <select value={blogData.category} onChange={(e)=>setBlogData({...blogData, category: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white">
              <option value="Dental Care">Dental Care</option>
              <option value="Skin Care">Skin Care</option>
              <option value="Surgery">Surgery</option>
              <option value="Wellness">Wellness</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><ImageIcon size={12}/> Image URL</label>
          <input required type="text" value={blogData.image} onChange={(e)=>setBlogData({...blogData, image: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="https://image-link.com/photo.jpg" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase font-bold text-gray-500">Content Description</label>
          <textarea required rows="5" value={blogData.description} onChange={(e)=>setBlogData({...blogData, description: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="Write blog content here..."></textarea>
        </div>

        <button disabled={loading} type="submit" className="bg-[#D4AF37] text-black font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white transition-all">
          <Save size={18}/> {loading ? "Uploading..." : (lang === 'bn' ? "পাবলিশ করুন" : "Publish Blog")}
        </button>
      </form>
    </div>
  );
};

export default ManageBlogs;