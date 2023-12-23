import { useReducer } from "react";

import LanguageContext from "./language-context";

const languageParDefaut = {
  lang: localStorage.getItem("lang")
}

function LanguageReducer(state, action) {
  if(action.type==="SETLANGUE") {
    localStorage.setItem("lang", action.lang);
    return {
      ...state,
      lang: action.lang
    }
  }
}

export default function LanguageProvider(props) {
  const [languageState, dispatchLanguage] = useReducer(LanguageReducer, languageParDefaut);

  function setLangue(lang) {
    dispatchLanguage({type: "SETLANGUE", lang: lang});
  }

  const connexionContext = {
    lang: languageState.lang,
    setLangue
  }

  return (
    <LanguageContext.Provider value={connexionContext}>
      {props.children}
    </LanguageContext.Provider>
  );
}