import { useEffect, useState, useContext } from "react";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function InfosTyping(props) {
  const [pourcent, setPourcent] = useState(100);
  
  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    if(props.nbBons+props.nbFaux!==0) {
      setPourcent(Math.round(props.nbBons/(props.nbBons+props.nbFaux)*100));
    }
  }, [props.nbBons, props.nbFaux])

  return (
    <div className="flex justify-center gap-6">
      <span>{props.chrono} {props.chrono <= 1  ? langpack["typ_sec_sing"][lang] : langpack["typ_sec_plu"][lang]}</span>
      <span>{props.nbMots} {props.nbMots <= 1  ? langpack["typ_mot_sing"][lang] : langpack["typ_mot_plu"][lang]}</span>
      <span>{pourcent}%</span>
    </div>
  );
}