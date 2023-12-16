import { useRef, useEffect, useState, useContext } from "react";
import ResultatsContext from "../store/resultats-context";
import ConnexionContext from "../store/connexion-context";
import ModalConnexion from "../connexion/ModalConnexion";

export default function ZoneDentree(props) {
  const inputRef = useRef(null);
  const [texteIndice, setTexteIndice] = useState("");
  const [compteurIndice, setCompteurIndice] = useState(0);
  const [ctrlV, setCtrlV] = useState(false);
  const [aChange, setAChange] = useState(false);

  const ctxResultats = useContext(ResultatsContext);
  const ctxConnexion = useContext(ConnexionContext);

  function envoyerRep(event) {
    event.preventDefault();
    if(aChange) {
      const juste = props.onEnvoi(inputRef.current.value);
      if(juste) {
        inputRef.current.value = "";
        setTexteIndice("");
        setCompteurIndice(0);
      }
      setAChange(false);
    }
  }

  function passer(event) {
    event.preventDefault();
    inputRef.current.value = "";
    props.onSkip();
    inputRef.current.focus();
    setTexteIndice("");
    setCompteurIndice(0);
  }

  function indice(event) {
    event.preventDefault();
    let chaine = "";
    if(compteurIndice<=props.nomDrapeau.length-1) {
      let i;
      for(i=0; i<=compteurIndice; i++) {
        chaine += props.nomDrapeau[i];
      }
      for(i=i; i<=props.nomDrapeau.length-1; i++) {
        chaine += "*";
      }
      setCompteurIndice(compteurIndice+1);
      setTexteIndice(chaine);
      ctxResultats.ajouterIndice();
    }
    inputRef.current.focus();
  }

  function annuler() {
    window.location.href = "/";
  }

  function bloqueCtrlV(e) {
    e.preventDefault();
    setCtrlV(true);
  }
  
  function onChangeHandler() {
    if(ctrlV) {
      setCtrlV(false);
    }
    setAChange(true);
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      {!ctxConnexion.connecte && <ModalConnexion onCancel={annuler}/>}
      <form onSubmit={envoyerRep} className="flex flex-col gap-2">
        <input type="text" className={`border`} placeholder={`${ctrlV?"Pas de Ctrl+V !!":""}`} ref={inputRef} onChange={onChangeHandler} onPaste={bloqueCtrlV} disabled={ctxResultats.estFini||!ctxConnexion.connecte}/>
        <input type="submit" className="border" value="Envoyer" disabled={ctxResultats.estFini||!ctxConnexion.connecte}/>
        <div className="flex gap-2">
          <button className="border w-full" onClick={passer} disabled={ctxResultats.estFini||!ctxConnexion.connecte}>Passer</button>
          <button className="border w-full" onClick={indice} disabled={ctxResultats.estFini||!ctxConnexion.connecte}>Indice</button>
        </div>
        <span>{texteIndice}</span>
      </form>
    </>
  );
}