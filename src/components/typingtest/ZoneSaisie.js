import { useCallback, useContext, useEffect, useRef, useState } from "react";
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
        const nomSansAccents = drapeauxMonde[i].noms[lang][0].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        nomsSansAccents.push(nomSansAccents);
    }
    
    const nomsSansEspace = nomsSansAccents.filter(nom => !nom.includes(' '));

    for (let i = nomsSansEspace.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nomsSansEspace[i], nomsSansEspace[j]] = [nomsSansEspace[j], nomsSansEspace[i]];
    }

    setListeDrapeaux(nomsSansEspace);
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

  const listeMots = listeDrapeaux.map((drapeau, index) => (
    <Mot
      inputRef={inputRef}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      mot={drapeau}
      key={drapeau}
      estBon={props.estBon}
      estFaux={props.estFaux}
      motSuivant={motSuivant}
      motPrecedent={motPrecedent}
      actuel={indexDrapeau === index}
    />
  ));

  return (
    <div className="w-10/12 md:w-8/12 border h-[300px] rounded p-2 border-gray-300 relative" onClick={onClickHandler}>
      {!isFocus && <MessageClick/>}
      <div className="h-full flex flex-wrap overflow-y-auto overflow-x-hidden whitespace-break-spaces gap-[10px] z-0">
        {listeMots}
      </div>
    </div>
  );
}