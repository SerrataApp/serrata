import { motion } from "framer-motion";
import { useContext } from "react";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function MessageClick() {
  const lang = useContext(LanguageContext).lang;

  return(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute flex justify-center items-center w-full h-full backdrop-filter backdrop-blur-sm scale-110 text-xl select-none z-10"
    >
      <p>{langpack["typ_focus"][lang]}</p>
    </motion.div>
  );
}