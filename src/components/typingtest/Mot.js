import { useState } from "react";
import Lettre from "./Lettre";

export default function Mot(props) {
  const [indexCurseur, setIndexCurseur] = useState(0);
  const [efface, setEfface] = useState(false);
  const [currentInput, setCurrentInput] = useState();

  function onInputHandler(e) {
    if(e.target.value===" ") {
      props.motSuivant();
    } else {
      setEfface(false);
      setIndexCurseur(indexCurseur+1);
      setCurrentInput(e.target.value);
      props.inputRef.current.value = "";
    }
  }

  function onKeyDownHandler(e) {
    if (e.key==="Backspace" && indexCurseur>0) {
      setIndexCurseur(indexCurseur-1);
      setEfface(true);
    }
  }

  let listeLettres = "";
  for(let i=0; i<props.mot.length; i++) {
    listeLettres = [...listeLettres, <Lettre lettre={props.mot[i]} index={i} key={i} efface={efface} input={currentInput} indexCurseur={indexCurseur} {...props}/>]
  }

  return(
    <>
      <input type="text" autoFocus={true} className="fixed opacity-0" ref={props.inputRef} onChange={onInputHandler} onKeyDown={onKeyDownHandler}/>
      <div className="flex gap-[1.5px]">
        {listeLettres}
      </div>
    </>
  );
}