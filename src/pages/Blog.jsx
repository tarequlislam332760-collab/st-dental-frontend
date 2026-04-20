import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('ALL POSTS');
  const [search, setSearch] = useState('');

  // ব্যাকেন্ড থেকে ব্লগ ডাটা আনা
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://st-dental-backend.vercel.app/api/blogs');
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchPosts();
  }, []);

  const categories = ["ALL POSTS", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"];

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'ALL POSTS' || post.category.toUpperCase() === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* ক্যাটাগরি ও সার্চ বার */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
        <div className="flex gap-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-[11px] font-bold tracking-widest uppercase transition-all ${filter === cat ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search insights..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-6 text-sm focus:outline-none focus:border-[#D4AF37]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-4 top-3 text-gray-300" size={18} />
        </div>
      </div>

      {/* ব্লগ গ্রিড */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredPosts.map((post) => (
          <div key={post._id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[4/3]">
              <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">{post.title}</h3>
            <p className="text-gray-500 text-sm mb-8 line-clamp-2">{post.description}</p>
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-[10px] font-bold">ST</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{post.author || 'Admin'}</span>
              </div>
              <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                Details <ChevronRight size={14} className="text-[#D4AF37]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;