import { createContext } from "react";

const LanguageContext = createContext({
  lang: localStorage.getItem("lang"),
  setLangue: lang => {}
})

export default LanguageContext;