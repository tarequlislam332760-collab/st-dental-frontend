import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, User, AlertCircle, Loader2 } from 'lucide-react';

// ✅ শুধু email ও password চেক হবে — নাম user নিজে দেবে
const VALID_CREDENTIALS = [
  { email: 'admin@stlesser.com', password: 'admin123', role: 'Super Admin' },
  // নতুন admin যোগ করতে এখানে লাইন যোগ করুন:
  // { email: 'doctor@stlesser.com', password: 'doctor123', role: 'Doctor' },
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
        // নাম user এর দেওয়া নাম থেকে নেওয়া হচ্ছে
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
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-[#D4AF37] rounded-2xl items-center justify-center text-black font-black text-2xl mb-4 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            ST
          </div>
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter italic">
            Admin <span className="text-[#D4AF37]">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Authorized Access Only</p>
        </div>

        <div className="bg-[#111111] p-8 rounded-[32px] border border-[#D4AF37]/20 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl flex items-center gap-3 text-red-500 text-sm font-bold"
              >
                <AlertCircle size={18} /> {error}
              </motion.div>
            )}

            {/* নাম */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Your Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                <input
                  type="text"
                  required
                  placeholder="আপনার নাম লিখুন"
                  value={name}
                  className="w-full bg-[#0a0a0a] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-all"
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                <input
                  type="email"
                  required
                  placeholder="admin@stlesser.com"
                  className="w-full bg-[#0a0a0a] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-all"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#D4AF37] transition-colors" size={20} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0a] border border-white/5 p-4 pl-12 rounded-xl text-white outline-none focus:border-[#D4AF37] transition-all"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#b8972f] transition-all shadow-[0_10px_20px_rgba(212,175,55,0.1)] active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin" size={20} /> Verifying...</>
              ) : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-gray-600 text-[10px] font-bold uppercase tracking-[4px]">
          &copy; 2026 S T Lesser . Secure System
        </p>
      </motion.div>
    </div>
  );
};

export default Login;