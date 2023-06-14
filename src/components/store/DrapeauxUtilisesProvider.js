import { useReducer } from "react";

import DrapeauxUtilisesContext from "./drapeaux-utilises-context";

const drapeauxUtilisesParDefaut = {
  drapeauxUtilises: [],
}

function DrapeauxUtilisesReducer(state, action) {
  if(action.type==="AJOUTER_DRAPEAU") {
    const updatedDrapeauxUtilises = [...state.drapeauxUtilises, action.drapeau.noms[0]];
    return {
      ...state,
      drapeauxUtilises: updatedDrapeauxUtilises
    }
  }
  if(action.type==="RESET_DRAPEAUX_UTILISES") {
    const updatedDrapeauxUtilises = [];
    return {
      ...state,
      drapeauxUtilises: updatedDrapeauxUtilises
    }
  }
}

export default function DrapeauxUtilisesProvider(props) {
  const [drapeauxUtilisesState, dispatchDrapeauxUtilises] = useReducer(DrapeauxUtilisesReducer, drapeauxUtilisesParDefaut);

  function ajouterDrapeau(drapeau) {
    console.log(drapeau);
    dispatchDrapeauxUtilises({type: "AJOUTER_DRAPEAU", drapeau: drapeau});
  }

  function resetDrapeauxUtilises() {
    dispatchDrapeauxUtilises({type: "RESET_DRAPEAUX_UTILISES"});
  }

  const drapeauxUtilisesContext = {
    drapeauxUtilises: drapeauxUtilisesState.drapeauxUtilises,
    ajouterDrapeau,
    resetDrapeauxUtilises
  }

  return (
    <DrapeauxUtilisesContext.Provider value={drapeauxUtilisesContext}>
      {props.children}
    </DrapeauxUtilisesContext.Provider>
  );
}