import { useEffect, useRef, useState } from "react";
import Lettre from "./Lettre";
import { drapeauxEurope } from "../../utils/ImportDrapeaux";

export default function ZoneSaisie(props) {
  const [indexCurseur, setIndexCurseur] = useState(0);
  const [currentInput, setCurrentInput] = useState();
  const [efface, setEfface] = useState(false);
  const [listeLettres, setListeLettres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  function onInputHandler(e) {
    setEfface(false);
    setIndexCurseur(indexCurseur+1);
    setCurrentInput(e.target.value);
    inputRef.current.value = "";
  }

  function onClickHandler() {
    inputRef.current.focus();
  }

  function onKeyDownHandler(e) {
    if (e.key==="Backspace" && indexCurseur>0) {
      setIndexCurseur(indexCurseur-1);
      setEfface(true);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    let chaine = "";
    for(let drapeau of drapeauxEurope) {
      chaine += drapeau.noms["fr"][0] + " ";
    }
    let tmpListeLettres = [];
    for(let i=0; i<chaine.length; i++) {
      tmpListeLettres = [...tmpListeLettres, <Lettre lettre={chaine[i]} indexCurseur={indexCurseur} index={i} input={currentInput} key={i} estBon={props.estBon} estFaux={props.estFaux} efface={efface}/>];
    }
    setListeLettres(tmpListeLettres);
    setIsLoading(false);
  }, []);

  return (
    <div className="w-10/12 md:w-8/12 border h-[300px] rounded p-2 border-gray-300" onClick={onClickHandler}>
      {!isLoading &&
        <>
          <input type="text" autoFocus={true} className="fixed opacity-0" ref={inputRef} onChange={onInputHandler} onKeyDown={onKeyDownHandler}/>
          <div className="flex">
            <div className="flex select-none flex-wrap gap-[1.5px]">
              {listeLettres}
            </div>
          </div>
        </>
      }
    </div>
  );
}