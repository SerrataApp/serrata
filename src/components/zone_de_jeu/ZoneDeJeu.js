import { useState } from "react";
import { drapeaux } from "../../utils/ImportDrapeaux";
import ZoneDentree from "./ZoneDentree";

export default function ZoneDeJeu() {
  const [drapeauActuel, setDrapeauActuel] = useState(drapeaux[10]);
  const [drapeauxUtilises, setDrapeauxUtilises] = useState([]);

  function nettoyerChaine(chaine) {
    const chaineNettoyee = chaine.replace(/[^a-zA-Z]/g, '');
    return chaineNettoyee;
  }

  function changementDrapeau(drapeauEntre) {
    console.log(nettoyerChaine(drapeauEntre));
    let retour = false;
    if(nettoyerChaine(drapeauEntre).toLowerCase()===drapeauActuel.nom) {
      setDrapeauActuel(drapeaux[11]);
      retour = true;
    }
    return retour;
  }

  return (
    <div className="flex gap-2">
      <img src={drapeauActuel.img}/>
      <ZoneDentree onEnvoi={changementDrapeau}/>
    </div>
  );
}