import { useState, memo, useEffect } from "react";
import Lettre from "./Lettre";

const Mot =  memo(function Mot(props) {
  const [indexCurseur, setIndexCurseur] = useState(0);
  const [currentInput, setCurrentInput] = useState();
  const [estFini, setEstFini] = useState(false);
  const [estBon, setEstBon] = useState(true);
  const [lettres, setLettres] = useState([]);

    useEffect(() => {
        if(props.actuel) {
            if(estFini && estBon) {
                props.retirerMot();
            }
        }
    }, [props.actuel]);

    function lettresSontBonnes() {
        for(let lettre of lettres) {
            if(!lettre) {
                return false;
            }
        }
        return true;
    }

    function ajouterAuTab(estBon) {
        setLettres([...lettres, estBon]);
    }

    function retirerDuTab() {
        const nouveauTableau = lettres.slice(0, -1);
        setLettres(nouveauTableau);
    }

  function onInputHandler(e) {
    if(props.estPremier) {
      props.demarrer();
    }
    if(e.target.value===" ") {
        if(lettresSontBonnes() && indexCurseur===props.mot.length) {
          props.ajouterMot();
        }
        props.motSuivant();
      setEstFini(true);
    } else {
      if(indexCurseur<props.mot.length) {
        setIndexCurseur(indexCurseur+1);
        setCurrentInput(e.target.value);
      }
      props.inputRef.current.value = "";
    }
    props.setEfface(false);
  }

  function onKeyDownHandler(e) {
    if (e.key==="Backspace") {
      if(indexCurseur>0) {
        setIndexCurseur(indexCurseur-1);
        props.setEfface(true);
        retirerDuTab();
      } else {
        setEstFini(false);
        props.motPrecedent(0);
      }
    }
  }

  const listeLettres = props.mot.split('').map((lettre, i) => {
    if(props.actuel) {
      return (
        <Lettre
          lettre={lettre}
          index={i}
          key={i}
          efface={props.efface}
          input={currentInput}
          indexCurseur={indexCurseur}
          estBon={props.estBon}
          estFaux={props.estFaux}
          motActuel={props.actuel}
          motEstBon={setEstBon}
          ajouterAuTab={ajouterAuTab}
          retirerDuTab={retirerDuTab}
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
        ajouterAuTab={ajouterAuTab}
        retirerDuTab={retirerDuTab}
      />
      )
    }
  });

  return(
    <div className="relative">
      {props.actuel && <input type="text" autoFocus={true} onBlur={props.onBlur} onFocus={props.onFocus} className="absolute opacity-0" ref={props.inputRef} onChange={onInputHandler} onKeyDown={onKeyDownHandler} disabled={props.disabled}/>}
      <div className={`flex gap-[2px] ${estFini && !props.actuel && (estBon ? "border-b-2 border-black" : "border-b-2 border-red-600")}`}>
        {listeLettres}
      </div>
    </div>
  );
})

export default Mot;