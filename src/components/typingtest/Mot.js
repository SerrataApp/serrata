import { useState, memo, useCallback } from "react";
import Lettre from "./Lettre";

const Mot =  memo(function Mot(props) {
  const [indexCurseur, setIndexCurseur] = useState(0);
  const [efface, setEfface] = useState(false);
  const [currentInput, setCurrentInput] = useState();
  const [estFini, setEstFini] = useState(false);
  const [estBon, setEstBon] = useState(true);

  const onInputHandler = useCallback((e) => {
    if(e.target.value===" ") {
      props.motSuivant();
      setEstFini(true);
    } else {
      setEfface(false);
      setIndexCurseur(indexCurseur+1);
      setCurrentInput(e.target.value);
      props.inputRef.current.value = "";
    }
  })

  const onKeyDownHandler = useCallback((e) => {
    if (e.key==="Backspace") {
      if(indexCurseur>0) {
        setIndexCurseur(indexCurseur-1);
        setEfface(true);
      } else {
        setEstFini(false);
        props.motPrecedent(0);
      }
    }
  })

  const listeLettres = props.mot.split('').map((lettre, i) => {
    if(props.actuel) {
      return (
        <Lettre
          lettre={lettre}
          index={i}
          key={i}
          efface={efface}
          input={currentInput}
          indexCurseur={indexCurseur}
          estBon={props.estBon}
          estFaux={props.estFaux}
          motActuel={props.actuel}
          motEstBon={setEstBon}
        />
      )
    } else {
      return (
        <Lettre
        lettre={lettre}
        index={i}
        key={i}
        motActuel={false}
        motEstBon={setEstBon}
      />
      )
    }
  });

  return(
    <div className="relative">
      {props.actuel && <input type="text" autoFocus={true} onBlur={props.onBlur} onFocus={props.onFocus} className="absolute opacity-0" ref={props.inputRef} onChange={onInputHandler} onKeyDown={onKeyDownHandler}/>}
      <div className={`flex gap-[2px] ${estFini && !props.actuel && (estBon ? "border-b-2 border-black" : "border-b-2 border-red-600")}`}>
        {listeLettres}
      </div>
    </div>
  );
})

export default Mot;