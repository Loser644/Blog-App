import { AnimatePresence, motion } from 'framer-motion';

export default function SlideTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={children.key || 'form'} // helps AnimatePresence detect new children
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.4 }}
        style={{ width: '50%', overflow: 'hidden' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
