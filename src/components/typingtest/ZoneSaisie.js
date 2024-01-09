import { useContext, useEffect, useRef, useState } from "react";
import Mot from "./Mot";
import { drapeauxMonde } from "../../utils/ImportDrapeaux";
import LanguageContext from "../store/language-context";

export default function ZoneSaisie(props) {
  const [listeDrapeaux, setListeDrapeaux] = useState([]);
  const [indexDrapeau, setIndexDrapeau] = useState(0);
  const inputRef = useRef();

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    for (let i = drapeauxMonde.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [drapeauxMonde[i], drapeauxMonde[j]] = [drapeauxMonde[j], drapeauxMonde[i]];
    }
    setListeDrapeaux(drapeauxMonde);
  }, []);

  function onClickHandler() {
    inputRef.current.focus();
  }

  function motSuivant() {
    setIndexDrapeau(indexDrapeau+1);
  }

  let listeMots = listeDrapeaux.map(drapeau => <Mot inputRef={inputRef} mot={drapeau.noms[lang][0].normalize("NFD").replace(/[\u0300-\u036f]/g, "")} key={drapeau.noms[lang][0]} estBon={props.estBon} estFaux={props.estFaux} motSuivant={motSuivant}/>)

  return (
    <div className="w-10/12 md:w-8/12 border h-[300px] rounded p-2 border-gray-300" onClick={onClickHandler}>
        <div className="flex">
          <div className="flex select-none flex-wrap gap-[1.5px]">
            {listeMots[indexDrapeau]}
          </div>
        </div>
    </div>
  );
}