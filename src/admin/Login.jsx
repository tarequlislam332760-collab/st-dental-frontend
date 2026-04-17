import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // এখানে একটি কৃত্রিম দেরি (Delay) দেওয়া হয়েছে প্রফেশনাল ফিল পাওয়ার জন্য
    setTimeout(() => {
      // আপনার দেওয়া ডামি ডিটেইলস
      if (email === 'admin@stlesser.com' && password === 'admin123') {
        localStorage.setItem('adminToken', 'true');
        navigate('/st-admin-secure'); 
      } else {
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* লোগো সেকশন */}
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-[#D4AF37] rounded-2xl items-center justify-center text-black font-black text-2xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            ST
          </div>
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter italic">
            Admin <span className="text-[#D4AF37]">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Authorized Access Only</p>
        </div>

        {/* লগইন কার্ড */}
        <div className="bg-[#111111] p-8 rounded-[32px] border border-[#D4AF37]/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* এরর মেসেজ */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm font-bold"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {/* ইমেইল ইনপুট */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="admin@stlesser.com"
                  className="w-full bg-[#0a0a0a] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* পাসওয়ার্ড ইনপুট */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-all"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* লগইন বাটন */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#b8972f] transition-all shadow-[0_10px_20px_rgba(212,175,55,0.1)] active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verifying...
                </>
              ) : 'Access Dashboard'}
            </button>

          </form>
        </div>

        {/* ফুটার লিঙ্ক */}
        <p className="text-center mt-8 text-gray-600 text-[10px] font-bold uppercase tracking-[4px]">
          &copy; 2026 S T Lesser . Secure System
        </p>
      </motion.div>
    </div>
  );
};

export default Login;