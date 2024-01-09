import { motion } from "framer-motion";

export default function MessageClick() {
  return(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute flex justify-center items-center z-20 w-full h-full backdrop-filter backdrop-blur-sm scale-110"
    >
      <p>Cliquez dans la zone pour jouer</p>
    </motion.div>
  );
}