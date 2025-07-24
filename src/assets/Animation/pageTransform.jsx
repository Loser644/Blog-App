import {motion, AnimatePresence} from "framer-motion";
export default function PageTransition({children,location}) {
    return(
      <AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
initial={{ y: "100%", opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
exit={{ y: "-100%", opacity: 0 }}



    transition={{
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    }}
    style={{
      perspective: 1000,
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </motion.div>
</AnimatePresence>

    )
}