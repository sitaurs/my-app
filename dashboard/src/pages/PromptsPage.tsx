import { motion } from 'framer-motion';

function PromptsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-bold mb-4">Prompts</h2>
      <div>Editor here</div>
    </motion.div>
  );
}

export default PromptsPage;
