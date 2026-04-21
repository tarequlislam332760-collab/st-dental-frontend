import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, ChevronRight } from 'lucide-react';

const Blog = ({ lang }) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

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

  const t = {
    bn: {
      categories: ["সব পোস্ট", "ডেন্টাল কেয়ার", "স্কিন কেয়ার", "সার্জারি", "ওয়েলনেস"],
      categoryKeys: ["ALL", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"],
      search: "অনুসন্ধান করুন...",
      details: "বিস্তারিত",
      admin: "অ্যাডমিন",
      noPost: "কোনো পোস্ট পাওয়া যায়নি",
    },
    en: {
      categories: ["ALL POSTS", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"],
      categoryKeys: ["ALL", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"],
      search: "Search insights...",
      details: "Details",
      admin: "Admin",
      noPost: "No posts found",
    }
  }[lang] || {
    categories: ["ALL POSTS", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"],
    categoryKeys: ["ALL", "DENTAL CARE", "SKIN CARE", "SURGERY", "WELLNESS"],
    search: "Search insights...",
    details: "Details",
    admin: "Admin",
    noPost: "No posts found",
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'ALL' || post.category?.toUpperCase() === filter;
    const matchesSearch = post.title?.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Category & Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-10 border-b border-gray-100 flex flex-wrap items-center justify-between gap-6">
        <div className="flex gap-8 overflow-x-auto pb-2">
          {t.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setFilter(t.categoryKeys[i])}
              className={`text-[11px] font-bold tracking-widest uppercase transition-all whitespace-nowrap ${
                filter === t.categoryKeys[i]
                  ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder={t.search}
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 px-6 text-sm focus:outline-none focus:border-[#D4AF37]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute right-4 top-3 text-gray-300" size={18} />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredPosts.length > 0 ? filteredPosts.map((post) => (
          <div key={post._id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[4/3]">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-[#D4AF37] transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm mb-8 line-clamp-2">{post.description}</p>
            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-[10px] font-bold">ST</div>
                <span className="text-[10px] font-black uppercase tracking-widest">{post.author || t.admin}</span>
              </div>
              <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                {t.details} <ChevronRight size={14} className="text-[#D4AF37]" />
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-3 text-center text-gray-400 py-20 text-sm">{t.noPost}</div>
        )}
      </div>
    </div>
  );
};

export default Blog;