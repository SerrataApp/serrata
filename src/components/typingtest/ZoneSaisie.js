import { useContext, useEffect, useRef, useState } from "react";
import Mot from "./Mot";
import { drapeauxMonde } from "../../utils/ImportDrapeaux";
import LanguageContext from "../store/language-context";
import MessageClick from "./MessageClick";

export default function ZoneSaisie(props) {
  const [listeDrapeaux, setListeDrapeaux] = useState([]);
  const [indexDrapeau, setIndexDrapeau] = useState(0);
  const [isFocus, setIsFocus] = useState(true);
  const inputRef = useRef();

  const lang = useContext(LanguageContext).lang;

  useEffect(() => {
    const nomsSansAccents = [];
    for (let i = 0; i < drapeauxMonde.length; i++) {
        const nomSansAccents = drapeauxMonde[i].noms[lang][0].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        nomsSansAccents.push(nomSansAccents);
    }
    for (let i = nomsSansAccents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nomsSansAccents[i], nomsSansAccents[j]] = [nomsSansAccents[j], nomsSansAccents[i]];
    }
    setListeDrapeaux(nomsSansAccents);
  }, []);

  function onClickHandler() {
    inputRef.current.focus();
  }

  function motSuivant() {
    setIndexDrapeau(indexDrapeau+1);
  }

  function motPrecedent() {
    if(indexDrapeau>0) {
      setIndexDrapeau(indexDrapeau-1);
    }
  }

  function onFocusHandler() {
    setIsFocus(true);
  }

  function onBlurHandler() {
    setIsFocus(false);
  }

  const listeMots = listeDrapeaux.map(drapeau => <Mot inputRef={inputRef} onFocus={onFocusHandler} onBlur={onBlurHandler} mot={drapeau} key={drapeau} estBon={props.estBon} estFaux={props.estFaux} motSuivant={motSuivant} motPrecedent={motPrecedent}/>);

  return (
    <div className="w-10/12 md:w-8/12 border h-[300px] rounded p-2 border-gray-300 relative" onClick={onClickHandler}>
      {!isFocus && <MessageClick/>}
      <div className="flex">
        <div className="flex select-none flex-wrap gap-[1.5px]">
          {listeMots[indexDrapeau]}
        </div>
      </div>
    </div>
  );
}