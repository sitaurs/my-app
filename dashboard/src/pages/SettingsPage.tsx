import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function SettingsPage() {
  const { data } = useApi<{ username: string }[]>('/users');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  useEffect(() => { if (data && data[0]) setUser(data[0].username); }, [data]);

  const save = async () => {
    try {
      await api.put('/users', { username: user, password: pass });
      toast.success('Updated');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <input className="input input-bordered mb-2" value={user} onChange={(e) => setUser(e.target.value)} />
      <input className="input input-bordered mb-2" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
      <button className="btn btn-primary" onClick={save}>Save</button>
    </motion.div>
  );
}

export default SettingsPage;
