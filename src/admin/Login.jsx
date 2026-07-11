import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';

const VALID_CREDENTIALS = [
  { email: 'admin@stlesser.com', password: 'admin123', role: 'Super Admin' },
];

const Login = () => {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!name.trim()) {
      setError('দয়া করে আপনার নাম লিখুন।');
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const admin = VALID_CREDENTIALS.find(
        a => a.email === email && a.password === password
      );

      if (admin) {
        const initials = name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        localStorage.setItem('adminToken',    'true');
        localStorage.setItem('adminName',     name.trim());
        localStorage.setItem('adminInitials', initials);
        localStorage.setItem('adminRole',     admin.role);
        navigate('/st-admin-secure');
      } else {
        setError('ভুল ইমেইল অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060e1e] px-4 font-sans">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl items-center justify-center text-cyan-400 font-black text-2xl mb-4 bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            ST
          </div>
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter italic">
            Admin <span className="text-cyan-400">Portal</span>
          </h1>
          <p className="text-white/20 text-sm mt-2 uppercase tracking-widest font-bold">S.T Laser Dental & Skin Care</p>
        </div>

        <div className="bg-[#0a1628] p-8 rounded-[32px] border border-cyan-500/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 text-sm font-bold"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-1">Your Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input type="text" required placeholder="আপনার নাম লিখুন" value={name}
                  className="w-full bg-[#060e1e] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                  onChange={e => setName(e.target.value)} />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input type="email" required placeholder="admin@stlesser.com"
                  className="w-full bg-[#060e1e] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                  onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-white/30 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={18} />
                <input type="password" required placeholder="••••••••"
                  className="w-full bg-[#060e1e] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-cyan-500/50 transition-all"
                  onChange={e => setPassword(e.target.value)} />
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2">
              {isLoading ? (
                <><Loader2 className="animate-spin" size={18} /> Verifying...</>
              ) : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-white/10 text-[10px] font-bold uppercase tracking-[4px]">
          © 2026 S.T Laser Dental & Skin Care
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
