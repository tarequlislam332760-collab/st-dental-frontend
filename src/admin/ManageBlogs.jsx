import React, { useState, useEffect } from 'react';
import { Save, Image as ImageIcon, Type, Layout, Trash2, Edit, X, Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

const ManageBlogs = ({ lang }) => {
  // ব্যাকএন্ড লিঙ্ক
  const API_URL = "https://st-dental-backend.vercel.app/api/blogs";
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState({ title: '', category: 'Dental Care', image: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // ইমেজ আপলোডিং স্টেট
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // ১. সব ব্লগ ডাটাবেজ থেকে নিয়ে আসা
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ইমেজ আপলোড হ্যান্ডলার (Cloudinary)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // আপনার Cloudinary upload_preset এখানে দিন

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // আপনার Cloudinary Cloud Name এখানে দিন
        formData
      );
      setBlogData({ ...blogData, image: res.data.secure_url });
    } catch (err) {
      alert("Image upload failed!");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // ২. ব্লগ সেভ বা আপডেট করা
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
    } catch (err) {
      alert("Action failed!");
    } finally {
      setLoading(false);
    }
  };

  // ৩. ডিলিট করা
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

  // ৪. এডিট মোড অন করা
  const startEdit = (blog) => {
    setIsEditing(true);
    setEditId(blog._id);
    setBlogData({
      title: blog.title,
      category: blog.category,
      image: blog.image,
      content: blog.content
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-10">
      {/* Form Section */}
      <div className="bg-[#111111] p-6 md:p-10 rounded-[35px] border border-white/5 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black text-[#D4AF37] uppercase italic">
            {isEditing 
              ? (lang === 'bn' ? "ব্লগ এডিট করুন" : "Edit Blog") 
              : (lang === 'bn' ? "নতুন ব্লগ আপলোড করুন" : "Upload New Blog")}
          </h3>
          {isEditing && (
            <button onClick={() => {setIsEditing(false); setBlogData({title:'', category:'Dental Care', image:'', content:''})}} className="text-red-500 flex items-center gap-2 text-xs font-bold uppercase">
              <X size={14}/> Cancel
            </button>
          )}
        </div>
        
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
            <label className="text-[10px] uppercase font-bold text-gray-500 flex items-center gap-2"><ImageIcon size={12}/> Image Selection</label>
            <div className="bg-black/30 p-6 rounded-3xl border border-white/5 space-y-4">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* File Upload Button */}
                <label className="w-full md:w-auto flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-[#D4AF37]/50 p-6 rounded-2xl cursor-pointer transition-all bg-black/20 group">
                  {uploading ? (
                    <Loader2 className="animate-spin text-[#D4AF37]" size={24} />
                  ) : (
                    <>
                      <Upload className="text-gray-500 group-hover:text-[#D4AF37]" size={20} />
                      <span className="text-[10px] font-bold uppercase mt-2 text-gray-400">পিসি থেকে ছবি নিন</span>
                    </>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={uploading} />
                </label>

                {/* Manual URL Input */}
                <div className="w-full flex-[2] flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase text-gray-600">বা সরাসরি ছবির লিঙ্ক দিন</span>
                  <input required type="text" value={blogData.image} onChange={(e)=>setBlogData({...blogData, image: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-xl outline-none focus:border-[#D4AF37] text-white text-sm" placeholder="https://image-link.com/photo.jpg" />
                </div>

                {/* Preview Thumbnail */}
                {blogData.image && (
                    <div className="relative group">
                      <img 
                          src={blogData.image} 
                          alt="Preview" 
                          className="w-24 h-24 object-cover rounded-xl border border-[#D4AF37]/30 shadow-lg"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                      />
                      <button onClick={() => setBlogData({...blogData, image: ''})} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all">
                        <X size={12}/>
                      </button>
                    </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold text-gray-500">Content Description</label>
            <textarea required rows="5" value={blogData.content} onChange={(e)=>setBlogData({...blogData, content: e.target.value})} className="bg-black/50 border border-white/5 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white" placeholder="Write blog content here..."></textarea>
          </div>

          <button disabled={loading || uploading} type="submit" className={`bg-[#D4AF37] text-black font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${loading || uploading ? 'opacity-50' : 'hover:bg-white'}`}>
            <Save size={18}/> {loading ? "Processing..." : (isEditing ? (lang === 'bn' ? "আপডেট করুন" : "Update Blog") : (lang === 'bn' ? "পাবলিশ করুন" : "Publish Blog"))}
          </button>
        </form>
      </div>

      {/* Blog List Table Section */}
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
                    <img 
                        src={blog.image || 'https://via.placeholder.com/400'} 
                        alt={blog.title} 
                        className="w-16 h-10 object-cover rounded-lg border border-white/10"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400'; }}
                    />
                  </td>
                  <td className="p-6 font-bold text-gray-200 min-w-[200px]">{blog.title}</td>
                  <td className="p-6">
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase border border-[#D4AF37]/20 px-3 py-1 rounded-full whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => startEdit(blog)} className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={14} />
                      </button>
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