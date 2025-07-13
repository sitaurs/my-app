import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface Trade {
  symbol: string;
  type: string;
  price: number;
  sl: number;
  tp: number;
}

function TradesPage() {
  const active = useApi<Trade[]>('/trades/active', 10000);
  const pending = useApi<Trade[]>('/trades/pending', 10000);

  const close = async (pair: string) => {
    try {
      await api.post(`/trades/${pair}/close`);
      confetti({ spread: 70, origin: { y: 0.3 } });
      toast.success('Success');
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Trades</h2>
      <div role="tablist" className="tabs tabs-bordered mb-4">
        <input type="radio" name="tabs" role="tab" className="tab" aria-label="Active" defaultChecked />
        <div role="tabpanel" className="tab-content p-4">
          <div className="grid gap-4">
            {active.data?.map((t) => (
              <div key={t.symbol} className="card glass p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{t.symbol}</h3>
                  <p>{t.type} @ {t.price}</p>
                </div>
                <button className="btn btn-error btn-sm" onClick={() => close(t.symbol)}>Close</button>
              </div>
            ))}
          </div>
        </div>
        <input type="radio" name="tabs" role="tab" className="tab" aria-label="Pending" />
        <div role="tabpanel" className="tab-content p-4">
          <div className="grid gap-4">
            {pending.data?.map((t) => (
              <div key={t.symbol} className="card glass p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{t.symbol}</h3>
                  <p>{t.type} @ {t.price}</p>
                </div>
                <button className="btn btn-error btn-sm" onClick={() => close(t.symbol)}>Cancel</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TradesPage;
