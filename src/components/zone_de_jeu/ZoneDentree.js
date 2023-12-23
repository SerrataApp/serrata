import { useRef, useEffect, useState, useContext } from "react";
import { urlStats } from "../../utils/urlApi";
import ResultatsContext from "../store/resultats-context";
import ConnexionContext from "../store/connexion-context";
import ModalConnexion from "../connexion/ModalConnexion";
import langpack from "../../lang/langpack.json";
import LanguageContext from "../store/language-context";

export default function ZoneDentree(props) {
  const inputRef = useRef(null);
  const [texteIndice, setTexteIndice] = useState("");
  const [compteurIndice, setCompteurIndice] = useState(0);
  const [ctrlV, setCtrlV] = useState(false);
  const [aChange, setAChange] = useState(false);

  const ctxResultats = useContext(ResultatsContext);
  const ctxConnexion = useContext(ConnexionContext);

  const lang = useContext(LanguageContext).lang;

  function envoyerRep(event) {
    event.preventDefault();
    if(aChange) {
      const juste = props.onEnvoi(inputRef.current.value);
      if(juste) {
        inputRef.current.value = "";
        setTexteIndice("");
        setCompteurIndice(0);
      }  else {
        let data = {
          "event":{
            type: "erreur", 
            user_id: ctxConnexion.id,
            data: {
              username: ctxConnexion.username,
              drapeau: props.nomDrapeau,
              temps_actuel: ctxResultats.temps,
            }
          }
        }
        fetch(urlStats, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },  
          body: JSON.stringify(data)
        })
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
    let data = {"event":{ 
      type: "passer", 
      user_id: ctxConnexion.id,
      data: {
        username: ctxConnexion.username,
        drapeau: props.nomDrapeau,
        temps_actuel: ctxResultats.temps,
      }
    }}
    fetch(urlStats, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },  
      body: JSON.stringify(data)
    })
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
    let data = {
      event:{ 
        type: "indice", 
        user_id: ctxConnexion.id, 
        data: {
          username: ctxConnexion.username,
          nom: props.nomDrapeau,
          temps_actuel: ctxResultats.temps,
        }
      }
    }
    // Envoi de l'indice à l'API avec des stats
    fetch(urlStats, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },  
      body: JSON.stringify(data)
    })
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
        <input type="text" className={`border`} placeholder={`${ctrlV?langpack["jou_ctrlv"][lang]:""}`} ref={inputRef} onChange={onChangeHandler} onPaste={bloqueCtrlV} disabled={ctxResultats.estFini||!ctxConnexion.connecte}/>
        <input type="submit" className="border" value={langpack["jou_env"][lang]} disabled={ctxResultats.estFini||!ctxConnexion.connecte}/>
        <div className="flex gap-2">
          <button className="border w-full" onClick={passer} disabled={ctxResultats.estFini||!ctxConnexion.connecte}>{langpack["jou_pas"][lang]}</button>
          <button className="border w-full" onClick={indice} disabled={ctxResultats.estFini||!ctxConnexion.connecte}>{langpack["sco_indsing"][lang]}</button>
        </div>
        <span>{texteIndice}</span>
      </form>
    </>
  );
}