import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function EnvPage() {
  const { data } = useApi<Record<string, string>>('/env');
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => { if (data) setValues(data); }, [data]);

  const save = async () => {
    try {
      await api.put('/env', values);
      toast.success('Saved');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Env Manager</h2>
      <div className="space-y-2">
        {Object.entries(values).map(([k, v]) => (
          <input key={k} className="input input-bordered w-full" value={v} onChange={(e) => setValues({ ...values, [k]: e.target.value })} />
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={save}>Save</button>
    </motion.div>
  );
}

export default EnvPage;
