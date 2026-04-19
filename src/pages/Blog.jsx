import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, User, ArrowRight, Search, Clock, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ব্যাকএন্ড থেকে ব্লগ ডাটা নিয়ে আসা (ভবিষ্যতে অ্যাডমিন প্যানেল থেকে পোস্ট করলে এখানে দেখাবে)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // আপনার ব্যাকএন্ড এপিআই লিঙ্ক এখানে বসাবেন
        // const res = await axios.get('https://your-backend.vercel.app/api/blogs');
        // setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ডামি ডাটা (যতক্ষণ না ব্যাকএন্ড রেডি হচ্ছে)
  const featuredBlogs = [
    {
      id: 1,
      title: "The Future of Smile: Digital Dentistry Explained",
      category: "Innovation",
      date: "20 April, 2026",
      author: "Admin",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Explore how AI and 3D printing are revolutionizing the way we treat dental patients today..."
    },
    {
      id: 2,
      title: "Luxury Skin Care: Why Aesthetic Medicine is Growing",
      category: "Aesthetic",
      date: "18 April, 2026",
      author: "Dr. Sarah",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
      excerpt: "Understanding the science behind premium skin treatments and why professional care matters more than ever..."
    },
    {
      id: 3,
      title: "Oral Health and Its Impact on Your Overall Wellness",
      category: "Health",
      date: "15 April, 2026",
      author: "Tareq Islam",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop",
      excerpt: "New studies show a direct link between gum health and heart disease. Here's what you need to know..."
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-[#fafafa] min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-black mb-20">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1445510491599-c391e8046a68?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Blog Hero"/>
        </div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-[#D4AF37] font-black uppercase tracking-[6px] text-xs mb-4">The Journal</h2>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
            Refining Your <span className="text-[#D4AF37]">Lifestyle</span>
          </h1>
          <p className="text-gray-300 mt-6 max-w-xl mx-auto text-sm md:text-base font-medium">
             Stay updated with the latest trends in dental surgery and premium aesthetic skin care.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Search & Category Filter (Premium Look) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 border-b border-gray-200 pb-10">
           <div className="flex gap-8 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
              {['All Posts', 'Dental Care', 'Skin Care', 'Surgery', 'Wellness'].map((cat, index) => (
                <button key={index} className={`whitespace-nowrap text-[11px] font-black uppercase tracking-widest transition-all ${index === 0 ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-400 hover:text-black'}`}>
                  {cat}
                </button>
              ))}
           </div>
           <div className="relative w-full md:w-80">
              <input type="text" placeholder="Search insights..." className="w-full bg-white border border-gray-100 px-6 py-3 rounded-full text-xs font-bold focus:outline-none focus:border-[#D4AF37] shadow-sm transition-all"/>
              <Search size={16} className="absolute right-6 top-3 text-gray-300"/>
           </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featuredBlogs.map((blog) => (
            <article key={blog.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] mb-8 shadow-2xl">
                <img 
                  src={blog.image} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt={blog.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute top-8 left-8">
                  <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-widest border border-white/20">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                   <div className="flex items-center gap-4 text-white/70 text-[9px] font-black uppercase tracking-widest mb-3">
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#D4AF37]"/> {blog.readTime}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#D4AF37]"/> {blog.date}</span>
                   </div>
                   <h3 className="text-2xl font-black text-white leading-tight group-hover:text-[#D4AF37] transition-colors">
                     {blog.title}
                   </h3>
                </div>
              </div>
              
              <div className="px-2">
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {blog.excerpt}
                </p>
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center font-black text-[10px]">ST</div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gray-800">{blog.author}</span>
                   </div>
                   <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] group-hover:gap-4 transition-all">
                      Details <ChevronRight size={14} className="text-[#D4AF37]"/>
                   </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter (Premium Addition) */}
        <div className="mt-32 bg-black rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] blur-[150px] opacity-20"></div>
           <h2 className="text-[#D4AF37] font-black uppercase tracking-[4px] text-xs mb-6">Subscription</h2>
           <h3 className="text-3xl md:text-5xl font-black text-white mb-10 uppercase tracking-tighter">Join the elite <br/> health circle</h3>
           <form className="max-w-md mx-auto flex gap-4 border-b border-white/20 pb-4">
              <input type="email" placeholder="Your Email Address" className="bg-transparent text-white w-full focus:outline-none text-sm font-bold placeholder:text-gray-600"/>
              <button className="text-[#D4AF37] font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">Submit</button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;