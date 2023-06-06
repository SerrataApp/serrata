import { useReducer } from "react";

import ResultatsContext from "./resultats-context";

const resultatsParDefaut = {
  pourcentage: 100,
  temps: 0,
  estFini: false
}

function ResultatsReducer(state, action) {
  if(action.type==="ENLEVER_POURCENTS") {
    return {
      ...state,
      pourcentage: state.pourcentage - action.pourcents
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

  function enleverPourcents(pourcents) {
    dispatchResultats({type: "ENLEVER_POURCENTS", pourcents: pourcents});
  }

  function definirTemps(temps) {
    dispatchResultats({type: "DEFINIR_TEMPS", temps: temps});
  }

  function finir() {
    dispatchResultats({type: "FINIR"});
  }

  const resultatsContext = {
    pourcentage: resultatsState.pourcentage,
    temps: resultatsState.temps,
    estFini: resultatsState.estFini,
    enleverPourcents,
    definirTemps,
    finir
  }

  return (
    <ResultatsContext.Provider value={resultatsContext}>
      {props.children}
    </ResultatsContext.Provider>
  )
}