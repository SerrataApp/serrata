import { useState, useContext, useEffect } from "react";
import ZoneDentree from "./ZoneDentree";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";
import ResultatsContext from "../store/resultats-context";
import urlApi from "../../utils/urlApi";
import LanguageContext from "../store/language-context";

export default function ZoneDeJeu(props) {
  const [drapeauActuel, setDrapeauActuel] = useState(props.drapeaux[Math.floor(Math.random() * props.drapeaux.length)]);
  const [drapeauxRestants, setDrapeauxRestants] = useState([...props.drapeaux]);

  const ctxDrapeauxUtilises = useContext(DrapeauxUtilisesContext);
  const ctxResultats = useContext(ResultatsContext);

  const lang = useContext(LanguageContext).lang;

  function nettoyerChaine(chaine) {
    const chaineSansAccents = chaine.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const chaineNettoyee = chaineSansAccents.replace(/[^a-zA-Z]/g, '');
    return chaineNettoyee;
  }

  function validationDrapeau(drapeauEntre) {
    if(ctxDrapeauxUtilises.drapeauxUtilises.length===0) {
      fetch(urlApi+"users/me/game", {
        method: "PUT",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
      })
    }
    let retour = false;
    const nbNoms = drapeauActuel.noms[lang].length;
    let i = 0;
    while(i<nbNoms && retour===false) {
      if(nettoyerChaine(drapeauEntre).toLowerCase()===nettoyerChaine(drapeauActuel.noms[lang][i]).toLowerCase()) {
        ctxDrapeauxUtilises.ajouterDrapeau(drapeauActuel.noms[lang][i]);
        setDrapeauxRestants(drapeauxRestants.filter(pays => {
          return pays.noms[lang][0] !== drapeauActuel.noms[lang][0];
        }));
        retour = true;
      }
      i++;
    }
    if(retour===false) {
      ctxResultats.ajouterErreur();
    }
    return retour;
  }

  function changerDrapeau() {
    if(drapeauxRestants.length!==0) {
      setDrapeauActuel(drapeauxRestants[Math.floor(Math.random() * drapeauxRestants.length)]);
    } else {
      ctxResultats.finir();
    }
  }

  function passer() {
    changerDrapeau();
  }

  useEffect(() => {
    changerDrapeau();
  }, [drapeauxRestants.length])

  useEffect(() => {
    setDrapeauxRestants([...props.drapeaux])
  }, [props.drapeaux])

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-10">
      <img src={drapeauActuel.img} alt="drapeau" className="border" style={{maxWidth: "250px"}}/>
      <ZoneDentree onEnvoi={validationDrapeau} onSkip={passer} nomDrapeau={drapeauActuel.noms[lang][0]}/>
    </div>
  );
}