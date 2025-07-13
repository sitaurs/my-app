import WaveHeader from '@/components/WaveHeader';
import { motion } from 'framer-motion';

function OverviewPage() {
  return (
    <div className="p-4">
      <WaveHeader />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card bg-base-100 shadow-xl"/>
        <div className="card bg-base-100 shadow-xl"/>
        <div className="card bg-base-100 shadow-xl"/>
      </motion.div>
    </div>
  );
}

export default OverviewPage;
