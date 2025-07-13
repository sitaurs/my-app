import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

function PromptsPage() {
  const { data: files } = useApi<string[]>('/prompts');
  const [current, setCurrent] = useState('');
  const { data: content, mutate } = useApi<string>(current ? `/prompts/${current}` : null);
  const [text, setText] = useState('');

  useEffect(() => { setText(content || ''); }, [content]);

  const save = async (value: string) => {
    if (!current) return;
    try {
      await api.put(`/prompts/${current}`, { content: value });
      mutate(value);
      toast.success('Saved');
    } catch {
      toast.error('Error');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Prompts</h2>
      <div className="flex gap-4">
        <ul className="menu w-48">
          {files?.map((f) => (
            <li key={f}><button onClick={() => setCurrent(f)}>{f}</button></li>
          ))}
        </ul>
        {current && (
          <textarea
            className="textarea textarea-bordered flex-1 h-96"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => save(text)}
          />
        )}
      </div>
    </motion.div>
  );
}

export default PromptsPage;
