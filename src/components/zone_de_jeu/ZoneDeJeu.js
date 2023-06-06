import { useState, useContext, useEffect } from "react";
import { drapeaux } from "../../utils/ImportDrapeaux";
import ZoneDentree from "./ZoneDentree";
import DrapeauxUtilisesContext from "../store/drapeaux-utilises-context";

export default function ZoneDeJeu() {
  const [drapeauActuel, setDrapeauActuel] = useState(drapeaux[Math.floor(Math.random() * drapeaux.length)]);
  const [drapeauxRestants, setDrapeauxRestants] = useState([...drapeaux]);

  const ctx = useContext(DrapeauxUtilisesContext);

  function nettoyerChaine(chaine) {
    const chaineNettoyee = chaine.replace(/[^a-zA-Z]/g, '');
    return chaineNettoyee;
  }

  function validationDrapeau(drapeauEntre) {
    console.log(nettoyerChaine(drapeauEntre));
    let retour = false;
    if(nettoyerChaine(drapeauEntre).toLowerCase()===drapeauActuel.nom) {
      ctx.ajouterDrapeau(drapeauActuel);
      setDrapeauxRestants(drapeauxRestants.filter(pays => {
        return pays.nom !== drapeauActuel.nom;
      }));
      retour = true;
    }
    return retour;
  }

  useEffect(() => {
    setDrapeauActuel(drapeauxRestants[Math.floor(Math.random() * drapeauxRestants.length)])
  }, [drapeauxRestants])

  return (
    <div className="flex gap-2">
      <img src={drapeauActuel.img}/>
      <ZoneDentree onEnvoi={validationDrapeau}/>
    </div>
  );
}