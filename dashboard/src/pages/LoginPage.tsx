import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/login', { username, password });
      toast.success('Login sukses');
      window.location.href = '/';
    } catch {
      toast.error('Login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="backdrop-blur-lg bg-white/30 rounded p-8 w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Dashboard Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="input input-bordered w-full" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
      </motion.div>
    </div>
  );
}

export default LoginPage;
