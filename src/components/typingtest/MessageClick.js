import { motion } from "framer-motion";

export default function MessageClick() {
  return(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute flex justify-center items-center w-full h-full backdrop-filter backdrop-blur-sm scale-110 text-xl select-none"
    >
      <p>Cliquez dans la zone pour jouer</p>
    </motion.div>
  );
}