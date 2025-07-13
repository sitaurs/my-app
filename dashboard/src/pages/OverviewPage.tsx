import WaveHeader from '@/components/WaveHeader';
import { motion } from 'framer-motion';
import useApi from '@/hooks/useApi';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

function OverviewPage() {
  const { data } = useApi<{
    dxySentiment: string;
    isPaused: boolean;
    activeCount: number;
    pendingCount: number;
    consecutiveLosses: number;
    lastAnalysis: string;
  }>('/bot/status', 10000);

  const sendCmd = async (cmd: string) => {
    try {
      await api.post('/bot/command', { cmd });
      toast.success('Command sent');
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="p-4">
      <WaveHeader />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div whileHover={{ rotateX: -5, rotateY: 5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }} className="card glass p-4">
          <h3 className="font-bold">DXY Sentiment</h3>
          <p>{data?.dxySentiment || '-'}</p>
        </motion.div>
        <motion.div whileHover={{ rotateX: -5, rotateY: 5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }} className="card glass p-4">
          <h3 className="font-bold">Active / Pending</h3>
          <p>{data?.activeCount ?? 0} / {data?.pendingCount ?? 0}</p>
        </motion.div>
        <motion.div whileHover={{ rotateX: -5, rotateY: 5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }} className="card glass p-4">
          <h3 className="font-bold">Consecutive Losses</h3>
          <p>{data?.consecutiveLosses ?? 0}</p>
        </motion.div>
      </motion.div>
      <div className="mt-6 space-x-2">
        <button className="btn btn-sm" onClick={() => sendCmd('/status')}>/status</button>
        <button className="btn btn-sm" onClick={() => sendCmd('/analisis_semua')}>/analisis_semua</button>
        <button className="btn btn-sm" onClick={() => sendCmd('/dxy')}>/dxy</button>
      </div>
    </div>
  );
}

export default OverviewPage;
