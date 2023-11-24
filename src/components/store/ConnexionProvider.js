import { useReducer } from "react";

import ConnexionContext from "./connexion-context";

const connexionParDefaut = {
  connecte: false,
}

function ConnexionReducer(state, action) {
  if(action.type==="CONNECTER") {
    return {
      ...state,
      connecte: true
    }
  }
  if(action.type==="DECONNECTER") {
    window.localStorage.removeItem("token");
    return {
      ...state,
      connecte: false
    }
  }
}

export default function ConnexionProvider(props) {
  const [connexionState, dispatchConnexion] = useReducer(ConnexionReducer, connexionParDefaut);

  function connecter() {
    dispatchConnexion({type: "CONNECTER"});
  }

  function deconnecter() {
    dispatchConnexion({type: "DECONNECTER"});
  }

  const connexionContext = {
    connecte: connexionState.connecte,
    connecter,
    deconnecter
  }

  return (
    <ConnexionContext.Provider value={connexionContext}>
      {props.children}
    </ConnexionContext.Provider>
  );
}