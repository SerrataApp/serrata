import { useContext, useState } from "react";
// import france from "../../img/drapeaux/france.png";
// import royaumeuni from "../../img/drapeaux/royaumeuni.png";
import LanguageContext from "../store/language-context";
import SelectionLangue from "./SelectionLangue";

export default function SwitchLanguage() {
  const [showListeLangue, setShowListeLangue] = useState(false);

  const france = require("../../img/drapeaux/france.png");
  const royaumeuni = require("../../img/drapeaux/royaumeuni.png");
  const ctxLanguage = useContext(LanguageContext);
  const drapeaux = {
    fr: france,
    en: royaumeuni
  };

  let image;
  switch(ctxLanguage.lang) {
    case "fr": image = drapeaux["fr"]; break;
    case "en": image = drapeaux["en"]; break;
  }

  function toggleListeLangues() {
    setShowListeLangue(!showListeLangue);
  }

  return (
    <div className="relative z-30">
      <div className="flex gap-1 hover:cursor-pointer" onClick={toggleListeLangues}>
        <img src={image} className="h-4" alt="language"/>
        <i className={`fa fa-chevron-up transition-all duration-150 ${!showListeLangue?"fa-flip-vertical":""}`}></i>
      </div>
      {showListeLangue && <SelectionLangue drapeaux={drapeaux} closeDiv={toggleListeLangues}/>}
    </div>
  );
}