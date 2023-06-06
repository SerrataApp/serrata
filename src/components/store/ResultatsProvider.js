import { useReducer } from "react";

import ResultatsContext from "./resultats-context";

const resultatsParDefaut = {
  erreurs: 0,
  temps: 0,
  estFini: false
}

function ResultatsReducer(state, action) {
  if(action.type==="AJOUTER_ERREUR") {
    return {
      ...state,
      erreurs: state.erreurs + 1
    }
  }
  if(action.type==="DEFINIR_TEMPS") {
    return {
      ...state,
      temps: action.temps
    }
  }
  if(action.type==="FINIR") {
    return {
      ...state,
      estFini: true
    }
  }
}

export default function ResultatsProvider(props) {
  const [resultatsState, dispatchResultats] = useReducer(ResultatsReducer, resultatsParDefaut);

  function ajouterErreur() {
    dispatchResultats({type: "AJOUTER_ERREUR"});
  }

  function definirTemps(temps) {
    dispatchResultats({type: "DEFINIR_TEMPS", temps: temps});
  }

  function finir() {
    dispatchResultats({type: "FINIR"});
  }

  const resultatsContext = {
    erreurs: resultatsState.erreurs,
    temps: resultatsState.temps,
    estFini: resultatsState.estFini,
    ajouterErreur,
    definirTemps,
    finir
  }

  return (
    <ResultatsContext.Provider value={resultatsContext}>
      {props.children}
    </ResultatsContext.Provider>
  )
}