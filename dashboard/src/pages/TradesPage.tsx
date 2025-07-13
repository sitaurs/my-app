import { motion } from 'framer-motion';

function TradesPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Trades</h2>
      <div className="grid gap-4" />
    </motion.div>
  );
}

export default TradesPage;
